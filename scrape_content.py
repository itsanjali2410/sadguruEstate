"""
Scrape content and images from 'Sadguru Estates - Content & Images' folder.
Extracts text from PDFs, copies images, maps to existing properties,
and generates updated property data for properties.ts.
"""

import os
import re
import json
import shutil
import fitz  # PyMuPDF
from PIL import Image
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent
CONTENT_DIR = BASE_DIR / "Sadguru Estates - Content & Images"
PUBLIC_DIR = BASE_DIR / "public" / "properties"
OUTPUT_DIR = BASE_DIR / "scraped_output"

# Ensure output directories exist
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Mapping of content files to property IDs in properties.ts
FILE_TO_PROPERTY_MAP = {
    "10x10_in_Conti_Signature_Brochure-Final for Print--new copy.pdf": "continental-world-1",
    "9 Meraki - E Brochure.pdf": "meraki-panvel-1",
    "Brochure_ClubVegas-1.pdf": "sai-world-city-panvel-1",
    "Platinum Elysium, pl-7 Sec-29, Nerul-1 (1).pdf": "platinum-elysium-1",
    "Omkar Residency.jpeg": "omkar-regency-1",
    # These may be new properties not yet in properties.ts
    "Balaji Sapphire, Nerul .pdf": "balaji-sapphire-nerul",
    "Cyber Square Plan - Updated 2.pdf": "cyber-square",
    "KRC Plan Booklet-MAY 2025 - T11.pdf": "krc-residency",
    "PLOT NO.D-113, NERUL, NAVI MUMBAI.pdf": "plot-d113-nerul",
    "Varsha Group.jpeg": "varsha-group",
}


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract all text from a PDF using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += f"\n--- Page {page_num + 1} ---\n"
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"  [ERROR] Failed to extract text from {pdf_path}: {e}")
    return text


def extract_images_from_pdf(pdf_path: str, output_prefix: str) -> list:
    """Extract images from a PDF and save them."""
    saved_images = []
    try:
        doc = fitz.open(pdf_path)
        img_count = 0
        for page_num in range(len(doc)):
            page = doc[page_num]
            images = page.get_images(full=True)
            for img_idx, img_info in enumerate(images):
                xref = img_info[0]
                try:
                    base_image = doc.extract_image(xref)
                    if base_image:
                        img_bytes = base_image["image"]
                        img_ext = base_image["ext"]
                        # Only save reasonably sized images (likely property images, not icons)
                        if len(img_bytes) > 10000:  # > 10KB
                            img_filename = f"{output_prefix}_p{page_num+1}_img{img_idx+1}.{img_ext}"
                            img_path = OUTPUT_DIR / img_filename
                            with open(img_path, "wb") as f:
                                f.write(img_bytes)
                            saved_images.append(str(img_path))
                            img_count += 1
                except Exception:
                    continue
        doc.close()
        print(f"  Extracted {img_count} images from PDF")
    except Exception as e:
        print(f"  [ERROR] Failed to extract images from {pdf_path}: {e}")
    return saved_images


def copy_image_to_public(src_path: str, property_id: str) -> str:
    """Copy and convert an image to WebP format in the public/properties folder."""
    try:
        webp_filename = f"{property_id}.webp"
        jpg_filename = f"{property_id}.jpg"
        webp_path = PUBLIC_DIR / webp_filename
        jpg_path = PUBLIC_DIR / jpg_filename

        img = Image.open(src_path)
        # Convert to RGB if necessary (for RGBA/P modes)
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGB")

        # Save as WebP
        img.save(str(webp_path), "WEBP", quality=85)
        # Save as JPG backup
        img.save(str(jpg_path), "JPEG", quality=85)

        print(f"  Saved: {webp_filename} and {jpg_filename}")
        return f"/properties/{webp_filename}"
    except Exception as e:
        print(f"  [ERROR] Failed to process image {src_path}: {e}")
        return ""


def parse_property_details(text: str, filename: str) -> dict:
    """Parse extracted text to find property details."""
    details = {
        "source_file": filename,
        "raw_text_preview": text[:2000] if text else "",
        "extracted": {}
    }

    if not text:
        return details

    text_lower = text.lower()

    # Try to extract common property information
    extracted = {}

    # Property name patterns
    name_patterns = [
        r"(?:project|property)\s*(?:name)?\s*[:\-]\s*(.+)",
        r"^([A-Z][A-Z\s]+(?:RESIDENCY|ELYSIUM|MERAKI|SAPPHIRE|SQUARE|PARK|CITY|WORLD|TOWER|HEIGHTS|PINNACLE))",
    ]
    for pattern in name_patterns:
        match = re.search(pattern, text, re.MULTILINE | re.IGNORECASE)
        if match:
            extracted["name"] = match.group(1).strip()
            break

    # Location patterns
    location_patterns = [
        r"(?:location|address|at|site)\s*[:\-]\s*(.+?)(?:\n|$)",
        r"((?:Nerul|Panvel|Kharghar|Ulwe|Belapur|Sanpada|Ghansoli|Taloja|Navi Mumbai)[^,\n]*)",
    ]
    for pattern in location_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            extracted["location"] = match.group(1).strip()
            break

    # Price patterns
    price_patterns = [
        r"(?:price|starting|from)\s*[:\-]?\s*(₹[\d.,]+\s*(?:Cr|Lakhs?|L|K)\+?)",
        r"(₹\s*[\d.,]+\s*(?:Cr|Lakhs?|L)\s*(?:onwards|onward|\+)?)",
        r"(?:INR|Rs\.?)\s*([\d.,]+\s*(?:Cr|Lakhs?|L))",
    ]
    for pattern in price_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            extracted["prices"] = list(set(matches[:10]))
            break

    # BHK configurations
    bhk_pattern = r"(\d+(?:\.\d+)?\s*BHK)"
    bhk_matches = re.findall(bhk_pattern, text, re.IGNORECASE)
    if bhk_matches:
        extracted["configurations"] = list(set(bhk_matches))

    # Area/size patterns
    area_patterns = [
        r"(\d+(?:\.\d+)?\s*(?:sq\.?\s*ft\.?|sqft|sft|carpet|built[\s-]up))",
        r"(?:carpet\s*area|built[\s-]?up\s*area|super\s*area)\s*[:\-]?\s*(\d+(?:\.\d+)?)",
    ]
    for pattern in area_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            extracted["areas"] = list(set(matches[:15]))
            break

    # Amenities
    common_amenities = [
        "swimming pool", "gymnasium", "gym", "clubhouse", "club house",
        "garden", "landscaped", "jogging track", "yoga", "meditation",
        "parking", "car parking", "security", "cctv", "intercom",
        "children play area", "kids play", "indoor games", "outdoor games",
        "multipurpose hall", "party hall", "community hall",
        "rain water harvesting", "rainwater", "solar", "ev charging",
        "fire fighting", "lift", "elevator", "power backup",
        "sports", "tennis", "basketball", "badminton", "cricket",
        "amphitheatre", "library", "reading room", "spa", "sauna",
        "terrace", "rooftop", "viewing deck", "infinity pool",
        "miyawaki", "zen garden", "aroma garden", "senior citizen",
    ]
    found_amenities = []
    for amenity in common_amenities:
        if amenity in text_lower:
            found_amenities.append(amenity.title())
    if found_amenities:
        extracted["amenities"] = list(set(found_amenities))

    # RERA number
    rera_pattern = r"(?:RERA|MahaRERA)\s*(?:No\.?|Number|Reg\.?)?\s*[:\-]?\s*(P\d{8,})"
    rera_match = re.search(rera_pattern, text, re.IGNORECASE)
    if rera_match:
        extracted["rera_number"] = rera_match.group(1)

    # Developer name
    dev_patterns = [
        r"(?:developer|builder|by|developed by|promoted by)\s*[:\-]?\s*([A-Z][A-Za-z\s&]+(?:Ltd|Pvt|Group|Developers?|Builders?|Infra|Realty|Homes?))",
    ]
    for pattern in dev_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            extracted["developer"] = match.group(1).strip()
            break

    # Possession date
    possession_patterns = [
        r"(?:possession|ready by|completion|expected)\s*[:\-]?\s*(\w+\s*\d{4})",
        r"(?:Dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov)(?:ember|uary|ch|il|e|y|ust|tember|ober)?\s*\d{4}",
    ]
    for pattern in possession_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            extracted["possession"] = match.group(0).strip() if match.group(0) else match.group(1).strip()
            break

    # Description - first meaningful paragraph
    paragraphs = [p.strip() for p in text.split("\n\n") if len(p.strip()) > 50]
    if paragraphs:
        # Find a descriptive paragraph (not just headers or specs)
        for p in paragraphs:
            if any(word in p.lower() for word in ["located", "offers", "premium", "luxury", "project", "residences", "lifestyle"]):
                extracted["description_snippet"] = p[:500]
                break

    details["extracted"] = extracted
    return details


def find_best_cover_image(images: list) -> str:
    """Find the best image to use as property cover (largest file)."""
    if not images:
        return ""
    # Sort by file size, largest first
    images_with_size = []
    for img_path in images:
        try:
            size = os.path.getsize(img_path)
            images_with_size.append((img_path, size))
        except OSError:
            continue
    if not images_with_size:
        return ""
    images_with_size.sort(key=lambda x: x[1], reverse=True)
    return images_with_size[0][0]


def process_all_files():
    """Main processing function."""
    if not CONTENT_DIR.exists():
        print(f"Content directory not found: {CONTENT_DIR}")
        return

    files = list(CONTENT_DIR.iterdir())
    print(f"Found {len(files)} files in content directory:\n")

    all_results = {}
    new_properties = []
    updated_properties = []

    for file_path in sorted(files):
        filename = file_path.name
        property_id = FILE_TO_PROPERTY_MAP.get(filename, "")
        ext = file_path.suffix.lower()

        print(f"\n{'='*60}")
        print(f"Processing: {filename}")
        print(f"  Property ID: {property_id or 'UNMAPPED'}")
        print(f"  Type: {ext}")

        result = {
            "filename": filename,
            "property_id": property_id,
            "type": ext,
            "text": "",
            "images": [],
            "parsed": {},
        }

        if ext == ".pdf":
            # Extract text
            print("  Extracting text...")
            text = extract_text_from_pdf(str(file_path))
            result["text"] = text
            print(f"  Text length: {len(text)} chars")

            # Save raw text for review
            text_file = OUTPUT_DIR / f"{property_id or filename.replace(' ', '_')}_text.txt"
            with open(text_file, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"  Saved text to: {text_file.name}")

            # Extract images
            print("  Extracting images...")
            images = extract_images_from_pdf(
                str(file_path),
                property_id or filename.replace(" ", "_").replace(".", "_")
            )
            result["images"] = images

            # Find best cover image and copy to public
            if images and property_id:
                best_img = find_best_cover_image(images)
                if best_img:
                    img_url = copy_image_to_public(best_img, property_id)
                    result["cover_image"] = img_url

            # Parse property details from text
            print("  Parsing property details...")
            parsed = parse_property_details(text, filename)
            result["parsed"] = parsed

        elif ext in (".jpeg", ".jpg", ".png", ".webp"):
            print("  Processing image file...")
            if property_id:
                img_url = copy_image_to_public(str(file_path), property_id)
                result["cover_image"] = img_url
            result["images"] = [str(file_path)]

        all_results[filename] = result

        # Categorize as new or updated property
        existing_ids = [
            "continental-world-1", "meraki-panvel-1", "sai-world-city-panvel-1",
            "platinum-elysium-1", "omkar-regency-1",
        ]
        if property_id in existing_ids:
            updated_properties.append(result)
        elif property_id:
            new_properties.append(result)

    # Save complete results as JSON
    results_file = OUTPUT_DIR / "scrape_results.json"
    # Make results JSON serializable
    serializable_results = {}
    for k, v in all_results.items():
        sv = dict(v)
        sv["text"] = sv["text"][:3000] + "..." if len(sv.get("text", "")) > 3000 else sv.get("text", "")
        serializable_results[k] = sv

    with open(results_file, "w", encoding="utf-8") as f:
        json.dump(serializable_results, f, indent=2, ensure_ascii=False)
    print(f"\n\nResults saved to: {results_file}")

    # Generate TypeScript updates
    generate_ts_updates(all_results, new_properties)

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total files processed: {len(files)}")
    print(f"Existing properties updated: {len(updated_properties)}")
    print(f"New properties to add: {len(new_properties)}")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"\nFiles generated:")
    print(f"  - scraped_output/scrape_results.json (all extracted data)")
    print(f"  - scraped_output/*_text.txt (raw text per PDF)")
    print(f"  - scraped_output/new_properties.ts (new property entries)")
    print(f"  - scraped_output/property_updates.ts (updates for existing properties)")
    print(f"  - public/properties/*.webp & *.jpg (property images)")


def generate_ts_updates(all_results: dict, new_properties: list):
    """Generate TypeScript code for property updates and new properties."""

    # Generate updates for existing properties
    updates_code = "// Property updates extracted from brochures\n"
    updates_code += "// Review and merge these updates into properties.ts\n\n"

    for filename, result in all_results.items():
        if not result.get("parsed", {}).get("extracted"):
            continue
        prop_id = result.get("property_id", "")
        extracted = result["parsed"]["extracted"]

        updates_code += f"// Source: {filename}\n"
        updates_code += f"// Property ID: {prop_id}\n"

        if extracted.get("amenities"):
            updates_code += f"// Amenities found: {json.dumps(extracted['amenities'])}\n"
        if extracted.get("configurations"):
            updates_code += f"// Configurations: {json.dumps(extracted['configurations'])}\n"
        if extracted.get("prices"):
            updates_code += f"// Prices: {json.dumps(extracted['prices'])}\n"
        if extracted.get("areas"):
            updates_code += f"// Areas: {json.dumps(extracted['areas'])}\n"
        if extracted.get("rera_number"):
            updates_code += f"// RERA: {extracted['rera_number']}\n"
        if extracted.get("description_snippet"):
            updates_code += f"// Description: {extracted['description_snippet'][:200]}\n"
        updates_code += "\n"

    updates_file = OUTPUT_DIR / "property_updates.ts"
    with open(updates_file, "w", encoding="utf-8") as f:
        f.write(updates_code)

    # Generate new property entries
    new_code = "// New properties extracted from brochures\n"
    new_code += "// Add these to the properties array in properties.ts\n\n"

    for result in new_properties:
        prop_id = result.get("property_id", "unknown")
        extracted = result.get("parsed", {}).get("extracted", {})
        cover = result.get("cover_image", f"/properties/{prop_id}.webp")

        name = extracted.get("name", prop_id.replace("-", " ").title())
        location = extracted.get("location", "Navi Mumbai")
        developer = extracted.get("developer", "Contact for details")
        possession = extracted.get("possession", "Under Construction")
        amenities_list = extracted.get("amenities", ["Modern amenities", "Parking facilities"])
        description = extracted.get("description_snippet", f"Premium property - {name}").replace('"', '\\"').replace("\n", " ")[:300]

        configs = extracted.get("configurations", [])
        prices = extracted.get("prices", [])

        new_code += f"""  {{
    id: "{prop_id}",
    name: "{name}",
    developer: "{developer}",
    location: "{location}",
    type: "Residential",
    category: "buy",
    price: "{prices[0] if prices else 'Contact for pricing'}",
    size: "Contact for details",
    possession: "{possession}",
    status: "",
    featured: true,
    verified: true,
    amenities: {json.dumps(amenities_list, indent=6)},
    description: "{description[:300]}",
    image: "{cover}",
    configurations: [\n"""

        if configs:
            for cfg in configs:
                new_code += f"""      {{
        type: "{cfg}",
        size: "Contact for details",
        price: "Contact for pricing"
      }},\n"""
        else:
            new_code += """      {
        type: "Contact for details",
        size: "Contact for details",
        price: "Contact for pricing"
      },\n"""

        new_code += "    ]\n  },\n\n"

    new_file = OUTPUT_DIR / "new_properties.ts"
    with open(new_file, "w", encoding="utf-8") as f:
        f.write(new_code)


if __name__ == "__main__":
    process_all_files()
