interface HoneypotFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Invisible anti-spam field. Humans never see or fill it; spam bots
 * auto-fill every input, and the server silently drops submissions
 * where this has a value. Named "website" to look tempting to bots.
 */
const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => (
  <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
    <label>
      Website
      <input
        type="text"
        name="website"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </label>
  </div>
);

export default HoneypotField;
