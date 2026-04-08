"""
Process Sai Palm View images from /public/sai_palm:
1. Pick the best images from Low Res SPV + root jpgs + dated folders
2. Convert to optimized WebP in gallery folders
3. Clean up originals (tiff, pdf, large jpgs)
"""

import os
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).parent
SAI_PALM_DIR = BASE_DIR / "public" / "sai_palm"
GALLERY_DIR = BASE_DIR / "public" / "properties" / "gallery"
WEBP_QUALITY = 80
MAX_DIMENSION = 1600


def optimize_and_save(src: Path, out: Path):
    """Convert image to optimized WebP."""
    try:
        img = Image.open(str(src))
        w, h = img.size
        if max(w, h) > MAX_DIMENSION:
            ratio = MAX_DIMENSION / max(w, h)
            img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        if img.mode in ("RGBA", "P", "LA", "PA"):
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        elif img.mode != "RGB":
            img = img.convert("RGB")
        out.parent.mkdir(parents=True, exist_ok=True)
        img.save(str(out), "WEBP", quality=WEBP_QUALITY, method=4)
        orig = src.stat().st_size
        new = out.stat().st_size
        print(f"  {src.name} -> {out.name} ({orig//1024}KB -> {new//1024}KB)")
        return True
    except Exception as e:
        print(f"  [ERROR] {src.name}: {e}")
        return False


def process_sai_palm_view():
    """Process Sai Palm View images for a new property."""
    print("=" * 60)
    print("PROCESSING SAI PALM VIEW")
    print("=" * 60)

    gallery = GALLERY_DIR / "sai-palm-view"
    gallery.mkdir(parents=True, exist_ok=True)

    # Use the root-level smaller jpgs and the dated marketing images
    # These are better for web than the Low Res SPV folder (which are still 4-13MB each)
    selected = [
        # Root level - small, web-ready
        ("Grand Lobby.jpg", "grand-lobby"),
        ("Kids play Area_.jpg", "kids-play-area"),
        ("Sea View .jpg", "sea-view"),
        ("Location .jpg", "location-map"),
        ("Sai Palm View Elevation Creative No CTA.jpeg", "elevation"),
        # Dated marketing images - already web-optimized
        ("2025/October 2025/PANORAMIC SEA VIEWS WITHOUT CTA.jpeg", "panoramic-sea"),
        ("2025/November 2025/Sai Plam View Swimming Pool No CTA.jpeg", "swimming-pool"),
        ("2025/November 2025/SPV - PRIVATE THEATRE No CTA.jpeg", "private-theatre"),
        ("2025/December 2025/SPV - Indoor games No CTA.jpeg", "indoor-games"),
        ("2026/Sai Palm View Elevation Creative No CTA.jpeg", "elevation-2026"),
        # Low Res SPV - best picks (building views, amenities, night view)
        ("Low Res SPV/01 cam eye level view.jpg", "eye-level-view"),
        ("Low Res SPV/04 Swimming pool view.jpg", "pool-render"),
        ("Low Res SPV/07 Born Fire Terrace view.jpg", "terrace-bonfire"),
        ("Low Res SPV/12 Balcony Ocean View.jpg", "balcony-ocean"),
        ("Low Res SPV/14 Night View.jpg", "night-view"),
        ("Low Res SPV/15 Bldg To Sea.jpg", "building-sea"),
    ]

    idx = 0
    for rel_path, name in selected:
        src = SAI_PALM_DIR / rel_path
        if not src.exists():
            print(f"  SKIP (not found): {rel_path}")
            continue
        idx += 1
        out = gallery / f"{idx}.webp"
        optimize_and_save(src, out)

    print(f"\n  Saved {idx} gallery images for sai-palm-view")


def process_oasis_images():
    """Check if there are existing oasis images in office_spaces we can convert."""
    print("\n" + "=" * 60)
    print("PROCESSING OASIS PARADISE IMAGES")
    print("=" * 60)

    office_dir = BASE_DIR / "public" / "office_spaces"
    gallery = GALLERY_DIR / "oasis-paradise-chs-1"
    gallery.mkdir(parents=True, exist_ok=True)

    # The existing property page references these images
    oasis_images = []
    if office_dir.exists():
        for f in sorted(office_dir.iterdir()):
            if "oasis" in f.name.lower() or "13.36" in f.name:
                oasis_images.append(f)
            # Also grab the WhatsApp images that were used in the old hardcoded gallery
            if "WhatsApp Image 2025-11-22" in f.name:
                oasis_images.append(f)

    if not oasis_images:
        print("  No Oasis images found in office_spaces/")
        return

    for idx, src in enumerate(oasis_images, 1):
        out = gallery / f"{idx}.webp"
        optimize_and_save(src, out)

    print(f"\n  Saved {len(oasis_images)} gallery images for oasis-paradise-chs-1")


def process_sai_world_nerul():
    """Use some sai_palm renders for Sai World City Nerul (same developer)."""
    print("\n" + "=" * 60)
    print("PROCESSING SAI WORLD CITY NERUL IMAGES")
    print("=" * 60)

    # Check if there are existing gallery images already from the brochure scraping
    gallery = GALLERY_DIR / "sai-world-city-nerul-1"
    existing = list(gallery.glob("*.webp")) if gallery.exists() else []
    if existing:
        print(f"  Already has {len(existing)} gallery images, skipping")
        return

    # No images yet - use some of the office_spaces images if they exist
    office_dir = BASE_DIR / "public" / "office_spaces"
    gallery.mkdir(parents=True, exist_ok=True)

    swc_images = []
    if office_dir.exists():
        for f in sorted(office_dir.iterdir()):
            if f.suffix.lower() in (".jpg", ".jpeg", ".png"):
                # Use the WA002x images (which were used in old hardcoded gallery for emperia/sea-queen)
                if "WA002" in f.name:
                    swc_images.append(f)

    if not swc_images:
        print("  No suitable images found")
        return

    for idx, src in enumerate(swc_images[:6], 1):
        out = gallery / f"{idx}.webp"
        optimize_and_save(src, out)

    print(f"\n  Saved {min(len(swc_images), 6)} gallery images for sai-world-city-nerul-1")


def cleanup_sai_palm():
    """Remove large source files (tiff, pdf, large jpgs) after conversion."""
    print("\n" + "=" * 60)
    print("CLEANING UP SAI PALM SOURCE FILES")
    print("=" * 60)

    if not SAI_PALM_DIR.exists():
        return

    removed = 0
    saved_bytes = 0

    # Remove all .tiff/.tif files (huge, 50-150MB each)
    for f in SAI_PALM_DIR.glob("*.tiff"):
        sz = f.stat().st_size
        f.unlink()
        removed += 1
        saved_bytes += sz
        print(f"  Deleted: {f.name} ({sz // (1024*1024)}MB)")

    for f in SAI_PALM_DIR.glob("*.tif"):
        sz = f.stat().st_size
        f.unlink()
        removed += 1
        saved_bytes += sz
        print(f"  Deleted: {f.name} ({sz // (1024*1024)}MB)")

    # Remove PDFs
    for f in SAI_PALM_DIR.glob("*.pdf"):
        sz = f.stat().st_size
        f.unlink()
        removed += 1
        saved_bytes += sz
        print(f"  Deleted: {f.name} ({sz // 1024}KB)")

    # Remove the Low Res SPV folder (still 4-13MB per image, we have webp now)
    low_res = SAI_PALM_DIR / "Low Res SPV"
    if low_res.exists():
        for f in low_res.iterdir():
            if f.is_file():
                sz = f.stat().st_size
                f.unlink()
                removed += 1
                saved_bytes += sz
        try:
            low_res.rmdir()
            print(f"  Deleted: Low Res SPV/ directory")
        except OSError:
            pass

    # Remove root-level jpgs (we have webp conversions)
    for f in SAI_PALM_DIR.glob("*.jpg"):
        sz = f.stat().st_size
        f.unlink()
        removed += 1
        saved_bytes += sz

    for f in SAI_PALM_DIR.glob("*.jpeg"):
        sz = f.stat().st_size
        f.unlink()
        removed += 1
        saved_bytes += sz

    # Remove dated folders' images
    for folder in ["2025", "2026"]:
        target = SAI_PALM_DIR / folder
        if target.exists():
            for f in target.rglob("*.jpeg"):
                sz = f.stat().st_size
                f.unlink()
                removed += 1
                saved_bytes += sz
            for f in target.rglob("*.jpg"):
                sz = f.stat().st_size
                f.unlink()
                removed += 1
                saved_bytes += sz
            # Clean up empty dirs
            for d in sorted(target.rglob("*"), reverse=True):
                if d.is_dir():
                    try:
                        d.rmdir()
                    except OSError:
                        pass
            try:
                target.rmdir()
            except OSError:
                pass

    print(f"\n  Removed {removed} files, saved {saved_bytes // (1024*1024)}MB")

    # Check what's left (should be just the .mp4 video)
    remaining = list(SAI_PALM_DIR.rglob("*"))
    remaining_files = [f for f in remaining if f.is_file()]
    if remaining_files:
        print(f"  Remaining files in sai_palm/:")
        for f in remaining_files:
            print(f"    {f.name} ({f.stat().st_size // (1024*1024)}MB)")


if __name__ == "__main__":
    process_sai_palm_view()
    process_oasis_images()
    process_sai_world_nerul()
    cleanup_sai_palm()

    # Print gallery manifest
    print("\n" + "=" * 60)
    print("GALLERY MANIFEST")
    print("=" * 60)
    for prop_dir in sorted(GALLERY_DIR.iterdir()):
        if not prop_dir.is_dir():
            continue
        images = sorted(prop_dir.glob("*.webp"))
        if images:
            print(f"\n  {prop_dir.name}: {len(images)} images")
            for img in images:
                print(f"    /properties/gallery/{prop_dir.name}/{img.name} ({img.stat().st_size//1024}KB)")
