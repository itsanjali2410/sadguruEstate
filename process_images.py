"""
Process scraped images and Paradise folder:
1. Filter out small/duplicate/noise images
2. Convert useful ones to optimized WebP
3. Organize into public/properties/gallery/{property-id}/
4. Convert Paradise logos
5. Clean up scraped_output
"""

import os
import hashlib
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).parent
SCRAPED_DIR = BASE_DIR / "scraped_output"
GALLERY_DIR = BASE_DIR / "public" / "properties" / "gallery"
PARADISE_DIR = BASE_DIR / "public" / "paradise"
PROPERTIES_DIR = BASE_DIR / "public" / "properties"

# Minimum dimensions to consider an image useful (not an icon/logo fragment)
MIN_WIDTH = 300
MIN_HEIGHT = 200
MIN_AREA = 100_000  # 300x333 roughly
WEBP_QUALITY = 80
MAX_DIMENSION = 1600  # Resize large images to max 1600px on longest side


def get_file_hash(path: str) -> str:
    """Get MD5 hash of file content for dedup."""
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def is_useful_image(img: Image.Image, file_size: int) -> bool:
    """Check if image is a useful property image (not an icon/background/pattern)."""
    w, h = img.size

    # Too small - likely icon or decorative element
    if w < MIN_WIDTH or h < MIN_HEIGHT:
        return False
    if w * h < MIN_AREA:
        return False

    # Very narrow/tall strips - likely decorative bars
    aspect = max(w, h) / max(min(w, h), 1)
    if aspect > 5:
        return False

    # Very small file size relative to dimensions = mostly blank/solid
    pixels = w * h
    if file_size < pixels * 0.05 and file_size < 15000:
        return False

    return True


def optimize_and_save_webp(img: Image.Image, output_path: Path) -> bool:
    """Resize if needed and save as optimized WebP."""
    try:
        w, h = img.size

        # Resize if too large
        if max(w, h) > MAX_DIMENSION:
            ratio = MAX_DIMENSION / max(w, h)
            new_size = (int(w * ratio), int(h * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        # Convert to RGB if necessary
        if img.mode in ("RGBA", "P", "LA", "PA"):
            # For RGBA, paste onto white background
            if img.mode == "RGBA" or img.mode == "PA" or img.mode == "LA":
                background = Image.new("RGB", img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            else:
                img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")

        output_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(str(output_path), "WEBP", quality=WEBP_QUALITY, method=4)
        return True
    except Exception as e:
        print(f"  [ERROR] Failed to save {output_path}: {e}")
        return False


def process_scraped_images():
    """Process all scraped images, keep only useful ones."""
    print("=" * 60)
    print("PROCESSING SCRAPED IMAGES")
    print("=" * 60)

    if not SCRAPED_DIR.exists():
        print("No scraped_output directory found.")
        return

    # Group files by property
    property_files: dict[str, list[Path]] = {}
    image_extensions = {".jpeg", ".jpg", ".png", ".webp"}

    for f in sorted(SCRAPED_DIR.iterdir()):
        if f.suffix.lower() not in image_extensions:
            continue
        # Extract property ID from filename (e.g., "continental-world-1_p3_img1.jpeg")
        parts = f.stem.split("_p")
        if len(parts) >= 2:
            prop_id = parts[0]
        else:
            prop_id = "unknown"

        if prop_id not in property_files:
            property_files[prop_id] = []
        property_files[prop_id].append(f)

    total_kept = 0
    total_removed = 0

    for prop_id, files in sorted(property_files.items()):
        print(f"\n--- {prop_id} ({len(files)} raw images) ---")

        seen_hashes: set[str] = set()
        kept_images: list[tuple[Path, Image.Image]] = []

        for f in files:
            try:
                file_size = f.stat().st_size
                img = Image.open(str(f))

                # Check if useful
                if not is_useful_image(img, file_size):
                    print(f"  SKIP (too small/narrow): {f.name} ({img.size[0]}x{img.size[1]}, {file_size//1024}KB)")
                    total_removed += 1
                    continue

                # Dedup by hash
                file_hash = get_file_hash(str(f))
                if file_hash in seen_hashes:
                    print(f"  SKIP (duplicate): {f.name}")
                    total_removed += 1
                    continue
                seen_hashes.add(file_hash)

                kept_images.append((f, img))
            except Exception as e:
                print(f"  [ERROR] {f.name}: {e}")
                total_removed += 1

        # Sort by file size (larger = better quality, likely main renders)
        kept_images.sort(key=lambda x: x[0].stat().st_size, reverse=True)

        # Limit to best 6 images per property for gallery
        if len(kept_images) > 6:
            for f, _ in kept_images[6:]:
                print(f"  SKIP (excess, keeping top 6): {f.name}")
                total_removed += 1
            kept_images = kept_images[:6]

        # Save kept images as optimized WebP
        gallery_path = GALLERY_DIR / prop_id
        for idx, (f, img) in enumerate(kept_images, 1):
            out_name = f"{idx}.webp"
            out_path = gallery_path / out_name
            orig_size = f.stat().st_size

            if optimize_and_save_webp(img, out_path):
                new_size = out_path.stat().st_size
                print(f"  KEEP: {f.name} -> gallery/{prop_id}/{out_name} "
                      f"({orig_size//1024}KB -> {new_size//1024}KB)")
                total_kept += 1
            else:
                total_removed += 1

    print(f"\n  Total: {total_kept} kept, {total_removed} removed")


def process_paradise_logos():
    """Convert Paradise logos to optimized WebP."""
    print("\n" + "=" * 60)
    print("PROCESSING PARADISE LOGOS")
    print("=" * 60)

    if not PARADISE_DIR.exists():
        print("No paradise directory found.")
        return

    image_extensions = {".png", ".jpg", ".jpeg"}
    for f in sorted(PARADISE_DIR.iterdir()):
        if f.suffix.lower() not in image_extensions:
            print(f"  SKIP (non-image): {f.name}")
            continue

        try:
            img = Image.open(str(f))
            out_name = f.stem.replace(" ", "-").lower() + ".webp"
            out_path = PROPERTIES_DIR / out_name

            # For logos, keep original size but optimize
            if img.mode in ("RGBA", "P", "LA", "PA"):
                # Keep transparency for logos - save as WebP with alpha
                if img.mode != "RGBA":
                    img = img.convert("RGBA")
                out_path.parent.mkdir(parents=True, exist_ok=True)
                img.save(str(out_path), "WEBP", quality=WEBP_QUALITY, method=4)
            else:
                optimize_and_save_webp(img, out_path)

            orig_size = f.stat().st_size
            new_size = out_path.stat().st_size
            print(f"  {f.name} -> {out_name} ({orig_size//1024}KB -> {new_size//1024}KB)")
        except Exception as e:
            print(f"  [ERROR] {f.name}: {e}")


def cleanup_scraped_output():
    """Delete everything in scraped_output."""
    print("\n" + "=" * 60)
    print("CLEANING UP SCRAPED OUTPUT")
    print("=" * 60)

    if not SCRAPED_DIR.exists():
        return

    count = 0
    total_size = 0
    for f in SCRAPED_DIR.iterdir():
        if f.is_file():
            total_size += f.stat().st_size
            f.unlink()
            count += 1

    # Remove the directory itself
    try:
        SCRAPED_DIR.rmdir()
        print(f"  Deleted {count} files ({total_size // (1024*1024)}MB)")
        print(f"  Removed scraped_output/ directory")
    except OSError:
        print(f"  Deleted {count} files ({total_size // (1024*1024)}MB)")
        print(f"  Directory not empty, keeping scraped_output/")


def generate_gallery_manifest():
    """Print gallery file listing for use in properties.ts."""
    print("\n" + "=" * 60)
    print("GALLERY MANIFEST (for properties.ts)")
    print("=" * 60)

    if not GALLERY_DIR.exists():
        print("No gallery directory.")
        return

    for prop_dir in sorted(GALLERY_DIR.iterdir()):
        if not prop_dir.is_dir():
            continue
        images = sorted(prop_dir.glob("*.webp"))
        if images:
            paths = [f"/properties/gallery/{prop_dir.name}/{img.name}" for img in images]
            print(f'\n  "{prop_dir.name}": {paths}')


if __name__ == "__main__":
    process_scraped_images()
    process_paradise_logos()
    generate_gallery_manifest()
    cleanup_scraped_output()

    print("\n" + "=" * 60)
    print("DONE")
    print("=" * 60)
