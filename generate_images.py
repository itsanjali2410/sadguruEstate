"""
Vietnam Travel Banner Image Generator
Uses Google Gemini to generate wide promotional travel banners for Vietnam cities.

Setup:
  1. pip install google-genai Pillow
  2. Get API key from https://aistudio.google.com/apikey
  3. Paste your API key on line 18
  4. Run: python generate_images.py
"""

import time
import base64
from pathlib import Path

from PIL import Image as PILImage
from google import genai
from google.genai import types

# ── CONFIG ──────────────────────────────────────────────
# Paste your Gemini API key below (get it from https://aistudio.google.com/apikey)
API_KEY = "AIzaSyBCdQyFF5F2BUceHWzH80Ck1zaYPm9lpTo"
OUTPUT_DIR = Path(__file__).parent / "public" / "banners" / "vietnam"

BANNER_WIDTH = 1920
BANNER_HEIGHT = 600

# ── SHARED PROMPT SUFFIX ────────────────────────────────
PROMPT_SUFFIX = (
    "Wide panoramic banner format (3.2:1 aspect ratio, 1920x600px), "
    "no text, no typography, no words, no watermarks, no logos. "
    "Professional travel photography, editorial quality, cinematic color grading, "
    "rich vibrant colors, warm golden-hour lighting, "
    "subtle dark gradient overlay on the left side for text readability, "
    "clean modern premium travel agency aesthetic, "
    "high resolution, photorealistic style, 4K"
)


# ── VIETNAM CITIES BANNER DATA ─────────────────────────
# Each entry: (filename, display_name, price, prompt)
BANNERS = [
    (
        "phu-quoc.jpg",
        "Breathtaking aerial view of Phu Quoc Island Vietnam, "
        "pristine white sand beach Bai Sao with crystal clear turquoise water, "
        "lush tropical jungle-covered hills in the background, "
        "traditional Vietnamese long-tail wooden boats anchored near shore, "
        "coconut palm trees lining the coastline, "
        "dramatic golden hour sunset casting warm orange and pink hues across the sky, "
        "gentle waves lapping the shore, secluded paradise island feeling, "
        "shot from elevated angle showing the curve of the bay, "
    ),
]


# ── IMAGE GENERATION ──────────────────────────────────
IMAGEN_MODELS = [
    "gemini-2.5-flash-image",
]
GEMINI_MODEL = "gemini-2.5-flash-image"


def try_imagen(client, prompt):
    """Try generating with Imagen models (best quality)."""
    for model in IMAGEN_MODELS:
        try:
            response = client.models.generate_images(
                model=model,
                prompt=prompt,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio="16:9",
                    safety_filter_level="BLOCK_ONLY_HIGH",
                ),
            )
            if response.generated_images:
                return response.generated_images[0].image, model
        except Exception as e:
            error_msg = str(e).lower()
            if "not found" in error_msg or "permission" in error_msg or "404" in error_msg:
                continue
            raise
    return None, None


def try_gemini_flash(client, prompt):
    """Fallback: use Gemini Flash with image generation capability."""
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    if response.candidates:
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                return part.inline_data.data, GEMINI_MODEL
    return None, None


def generate_single_image(client, prompt, active_method):
    """Generate one image using the best available model."""

    if active_method == "gemini":
        try:
            data, model = try_gemini_flash(client, prompt)
            if data:
                return data, model, "gemini"
        except Exception:
            pass

    try:
        img, model = try_imagen(client, prompt)
        if img:
            return img, model, "imagen"
    except Exception as e:
        print(f"    Imagen error: {e}")

    try:
        data, model = try_gemini_flash(client, prompt)
        if data:
            return data, model, "gemini"
    except Exception as e:
        print(f"    Gemini Flash error: {e}")

    return None, None, None


def resize_to_banner(image_path):
    """Resize/crop image to exact 1920x600 banner dimensions."""
    img = PILImage.open(image_path).convert("RGB")

    target_ratio = BANNER_WIDTH / BANNER_HEIGHT
    current_ratio = img.width / img.height

    if current_ratio > target_ratio:
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))

    img = img.resize((BANNER_WIDTH, BANNER_HEIGHT), PILImage.LANCZOS)
    img.save(str(image_path), quality=95)


def save_image(data, filepath, method):
    """Save image data and resize to banner dimensions."""
    if method == "imagen":
        data.save(str(filepath))
    elif method == "gemini":
        if isinstance(data, bytes):
            with open(filepath, "wb") as f:
                f.write(data)
        elif isinstance(data, str):
            with open(filepath, "wb") as f:
                f.write(base64.b64decode(data))
        else:
            data.save(str(filepath))

    resize_to_banner(filepath)


def generate_images():
    """Generate all Vietnam travel banner images."""

    if not API_KEY or API_KEY == "PASTE_YOUR_API_KEY_HERE":
        print("=" * 60)
        print("  GEMINI API KEY REQUIRED")
        print("=" * 60)
        print()
        print("  1. Go to: https://aistudio.google.com/apikey")
        print("  2. Create a free API key")
        print("  3. Open this file and paste it on line 23:")
        print()
        print('     API_KEY = "your_actual_key_here"')
        print()
        print("=" * 60)
        return

    client = genai.Client(api_key=API_KEY)

    print("\nVietnam Travel Banner Generator")
    print("=" * 60)
    print(f"Banner size: {BANNER_WIDTH}x{BANNER_HEIGHT}px (3.2:1)")
    print("\nDetecting available models...")
    print("-" * 40)

    test_prompt = "A stunning Vietnamese landscape, photorealistic, 4K"
    test_img, test_model, test_method = generate_single_image(client, test_prompt, None)

    if test_img:
        print(f"  Using: {test_model} ({test_method})")
    else:
        print("  ERROR: No image generation model available for your API key.")
        print("  Get a new key at: https://aistudio.google.com/apikey")
        return

    active_method = test_method

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"Total banners to generate: {len(BANNERS)}")
    print("=" * 60)

    generated = 0
    skipped = 0
    failed = 0

    for i, (filename, city_prompt) in enumerate(BANNERS, 1):
        filepath = OUTPUT_DIR / filename

        if filepath.exists():
            print(f"[{i}/{len(BANNERS)}] SKIP (exists): {filename}")
            skipped += 1
            continue

        full_prompt = city_prompt + PROMPT_SUFFIX

        print(f"\n[{i}/{len(BANNERS)}] Generating: {filename}")

        try:
            data, model, method = generate_single_image(client, full_prompt, active_method)

            if data:
                save_image(data, filepath, method)
                active_method = method
                print(f"  SAVED: {filepath} (via {model})")
                generated += 1
            else:
                print(f"  FAILED: No image returned (prompt may have been filtered)")
                failed += 1

        except Exception as e:
            print(f"  ERROR: {e}")
            failed += 1

        if i < len(BANNERS):
            wait = 6 if active_method == "imagen" else 10
            print(f"  Waiting {wait}s (rate limit)...")
            time.sleep(wait)

    # ── Summary ──
    print("\n" + "=" * 60)
    print(f"  DONE!")
    print(f"  Generated: {generated}")
    print(f"  Skipped:   {skipped}")
    print(f"  Failed:    {failed}")
    print(f"  Total:     {len(BANNERS)}")
    print(f"\n  Banners saved to: {OUTPUT_DIR}")
    print("=" * 60)


def list_banners():
    """List all banner files and their status."""
    print("\n" + "=" * 60)
    print("  VIETNAM TRAVEL BANNERS STATUS")
    print("=" * 60)
    print()

    for filename, _prompt in BANNERS:
        filepath = OUTPUT_DIR / filename
        exists = filepath.exists()
        status = "OK" if exists else "MISSING"
        city = filename.replace(".jpg", "").replace("-", " ").title()
        print(f"  [{status}] {city}")
        print(f"         -> /banners/vietnam/{filename}")
        print()


if __name__ == "__main__":
    import sys

    if "--list" in sys.argv:
        list_banners()
    else:
        generate_images()
