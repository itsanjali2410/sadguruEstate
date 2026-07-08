/**
 * Heuristic (no-AI) brochure parser: pulls listing fields out of the raw
 * text of a PDF using patterns and keyword lists. Used when GEMINI_API_KEY
 * is not set. Best-effort — the admin reviews everything before saving.
 */

const LOCATIONS = [
  'Nerul', 'Ulwe', 'Panvel', 'Kharghar', 'Taloja', 'Ghansoli', 'Sanpada',
  'Juinagar', 'Belapur', 'Pushpak Nagar', 'Dronagiri', 'Kamothe',
  'Kalamboli', 'Airoli', 'Vashi', 'Seawoods', 'Kopar Khairane', 'Turbhe',
];

const AMENITIES = [
  'Swimming Pool', 'Gym', 'Gymnasium', 'Clubhouse', 'Club House', 'Garden',
  'Kids Play Area', "Children's Play Area", 'Jogging Track', 'Yoga',
  'Indoor Games', 'Security', 'CCTV', 'Parking', 'Lift', 'Power Backup',
  'Rain Water Harvesting', 'Temple', 'Amphitheatre', 'Banquet Hall',
  'Landscaped Garden', 'Senior Citizen Area', 'Multipurpose Hall',
  'Society Office', 'Fire Fighting System', 'Intercom', 'Cycling Track',
];

const DEVELOPER_HINT =
  /^(?:by\s+)?(.{3,60}?(?:Developers?|Group|Realty|Realtors?|Builders?|Infra(?:structure)?|Constructions?|Corp)(?:\s+LLP)?)\s*$/im;

export function parseBrochureText(text: string): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  const details: Record<string, string> = {};
  const compact = text.replace(/\s+/g, ' ');

  // RERA number
  const rera = compact.match(
    /(?:Maha)?RERA(?:\s*(?:Reg(?:istration)?|No)\.?\s*:?\s*)+([A-Z]?\d{9,14})/i
  );
  if (rera) details['RERA No'] = rera[1];

  // Contact phone (first Indian mobile found)
  const phone = compact.match(/(?:\+91[\s-]?)?([6-9]\d{9})\b/);
  if (phone) fields.contact = { name: '', phone: phone[1] };

  // Prices like "₹42 Lakhs", "Rs. 1.2 Cr" — use the lowest as starting price
  const prices = [
    ...compact.matchAll(/(?:₹|Rs\.?)\s*([\d.,]+)\s*(Lakhs?|Lacs?|L\b|Crores?|Cr)/gi),
  ];
  if (prices.length) {
    const inLakhs = (m: RegExpMatchArray) => {
      const n = parseFloat(m[1].replace(/,/g, ''));
      return /cr/i.test(m[2]) ? n * 100 : n;
    };
    const min = prices.reduce((a, b) => (inLakhs(a) <= inLakhs(b) ? a : b));
    const unit = /cr/i.test(min[2]) ? 'Cr' : 'Lakhs';
    fields.price = `₹${min[1]} ${unit}+`;
  }

  // Sizes: "450 - 900 sq.ft" or single value; also carpet area
  const sizeRange = compact.match(
    /(\d{3,4})\s*(?:-|to|–)\s*(\d{3,4})\s*sq\.?\s*\.?\s*ft/i
  );
  const sizeSingle = compact.match(/(\d{3,4})\s*sq\.?\s*\.?\s*ft/i);
  if (sizeRange) fields.size = `${sizeRange[1]} - ${sizeRange[2]} sq.ft`;
  else if (sizeSingle) fields.size = `${sizeSingle[1]} sq.ft`;
  const carpet = compact.match(
    /carpet(?:\s*area)?\s*:?\s*(\d{3,4}(?:\s*(?:-|to|–)\s*\d{3,4})?)\s*sq/i
  );
  if (carpet) fields.carpetArea = `${carpet[1].replace(/\s+/g, ' ')} sq.ft`;

  // Possession: "Possession: Dec 2026" or any "Month 20xx" near the word
  const possession =
    compact.match(/possession\s*(?:by|date|:)?\s*([A-Za-z]{3,9}\.?\s*20\d{2})/i) ||
    compact.match(/ready\s+to\s+move/i);
  if (possession) {
    fields.possession =
      typeof possession[1] === 'string' ? possession[1].trim() : 'Ready to Move';
    if (/ready\s+to\s+move/i.test(possession[0])) fields.status = 'Ready to Move';
  }
  if (!fields.status && /under\s+construction/i.test(compact)) {
    fields.status = 'Under Construction';
  }
  if (!fields.status && /new\s+launch/i.test(compact)) fields.status = 'New Launch';

  // Configurations: unique BHK mentions, incl. lists like "1 & 2 BHK"
  const bhks = [
    ...new Set(
      [...compact.matchAll(/((?:[1-5](?:\.5)?\s*[&,]\s*)*[1-5](?:\.5)?)\s*BHK/gi)]
        .flatMap((m) => m[1].split(/[&,]/))
        .map((n) => `${n.trim()} BHK`)
    ),
  ];
  if (bhks.length) {
    fields.configurations = bhks.map((type) => ({ type, size: '', price: '' }));
  }

  // Category / type
  const commercial = /shops?|offices?|showrooms?|commercial/i.test(compact);
  const residential = /BHK|residen|apartment|flat/i.test(compact);
  fields.category = commercial && !residential ? 'commercial' : 'buy';
  fields.type = commercial && !residential ? 'Commercial' : 'Residential';

  // Location: first known locality mentioned
  const loc = LOCATIONS.find((l) => new RegExp(`\\b${l}\\b`, 'i').test(compact));
  if (loc) fields.location = loc;

  // Developer: first line that looks like a builder name
  const dev = text.match(DEVELOPER_HINT);
  if (dev) fields.developer = dev[1].trim();

  // Amenities: keyword matches; drop entries contained in a longer match
  // (e.g. keep "Landscaped Garden" over "Garden", "Gymnasium" over "Gym")
  const found = AMENITIES.filter((a) =>
    new RegExp(a.replace(/\s+/g, '\\s+'), 'i').test(compact)
  );
  const amenities = found.filter(
    (a) =>
      !found.some(
        (b) => b !== a && b.toLowerCase().includes(a.toLowerCase())
      )
  );
  if (amenities.length) fields.amenities = amenities;

  // Project name guess: first short, non-numeric line of the PDF
  const firstLine = text
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length >= 3 && l.length <= 50 && /[A-Za-z]{3}/.test(l));
  if (firstLine) fields.name = firstLine;

  if (Object.keys(details).length) fields.details = details;
  return fields;
}
