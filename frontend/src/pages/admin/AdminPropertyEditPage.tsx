import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader, Plus, Sparkles, Trash2 } from 'lucide-react';
import { Property } from '../../types/property';
import {
  getAllProperties,
  createProperty,
  updateProperty,
  extractBrochure,
  uploadBrochure,
} from '../../services/adminApi';
import MediaUploader from '../../components/admin/MediaUploader';
import RevisionHistory from '../../components/admin/RevisionHistory';

type Config = { type: string; size: string; price: string };

const EMPTY: Partial<Property> = {
  name: '',
  developer: '',
  location: '',
  type: '',
  category: 'buy',
  price: '',
  size: '',
  carpetArea: '',
  superArea: '',
  possession: '',
  status: '',
  description: '',
  featured: false,
  verified: false,
  published: true,
  amenities: [],
  image: '',
  gallery: [],
  video: '',
  brochureUrl: '',
  configurations: [],
  contact: { name: '', phone: '' },
};

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-800 focus:border-transparent';

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const AdminPropertyEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Property>>(EMPTY);
  const [amenitiesText, setAmenitiesText] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractNote, setExtractNote] = useState<string | null>(null);
  const brochureRef = useRef<HTMLInputElement>(null);

  const loadProperty = useCallback(() => {
    if (isNew) return;
    getAllProperties()
      .then((all) => {
        const found = all.find((p) => p._id === id);
        if (!found) throw new Error('Property not found');
        setForm({ ...EMPTY, ...found });
        setAmenitiesText((found.amenities || []).join(', '));
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(loadProperty, [loadProperty]);

  const set = (patch: Partial<Property>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const setConfig = (index: number, patch: Partial<Config>) => {
    const configs = [...(form.configurations || [])];
    configs[index] = { ...configs[index], ...patch };
    set({ configurations: configs });
  };

  // Prefill from a PDF brochure: AI-extract the fields (only filling ones
  // that are still empty) and store the PDF itself as the brochure.
  const handleBrochurePrefill = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtracting(true);
    setExtractNote(null);
    setError(null);
    try {
      const extracted = await extractBrochure(file);

      setForm((prev) => {
        const merged = { ...prev };
        for (const [key, value] of Object.entries(extracted)) {
          if (value == null || value === '') continue;
          const current = prev[key as keyof Property];
          const isEmpty =
            current == null ||
            current === '' ||
            (Array.isArray(current) && !current.length) ||
            (key === 'contact' && !prev.contact?.name && !prev.contact?.phone);
          if (isEmpty) (merged as Record<string, unknown>)[key] = value;
        }
        return merged;
      });
      if (!amenitiesText && Array.isArray(extracted.amenities)) {
        setAmenitiesText(extracted.amenities.join(', '));
      }

      // Also attach the PDF as the property brochure (skip if uploads not configured)
      let note = 'Fields prefilled from brochure — please review before saving.';
      if (!form.brochureUrl) {
        try {
          const { url } = await uploadBrochure(file);
          setForm((prev) => ({ ...prev, brochureUrl: url }));
        } catch {
          note += ' (Brochure file itself was not stored — uploads not configured.)';
        }
      }
      setExtractNote(note);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Brochure extraction failed');
    } finally {
      setExtracting(false);
      if (brochureRef.current) brochureRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      amenities: amenitiesText
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
    };
    try {
      if (isNew) {
        await createProperty(payload);
      } else {
        await updateProperty(id!, payload);
      }
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse text-gray-500 py-12">Loading…</div>;
  }

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Back to properties
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isNew ? 'New Property' : `Edit: ${form.name}`}
        </h1>
        <input
          ref={brochureRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleBrochurePrefill}
        />
        <button
          type="button"
          onClick={() => brochureRef.current?.click()}
          disabled={extracting}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
        >
          {extracting ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {extracting ? 'Reading brochure…' : 'Prefill from brochure (PDF)'}
        </button>
      </div>

      {extractNote && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          {extractNote}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basics */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-gray-900">Basics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name *">
              <input
                required
                value={form.name || ''}
                onChange={(e) => set({ name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Developer">
              <input
                value={form.developer || ''}
                onChange={(e) => set({ developer: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Location">
              <input
                value={form.location || ''}
                onChange={(e) => set({ location: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Type (e.g. Residential)">
              <input
                value={form.type || ''}
                onChange={(e) => set({ type: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category || 'buy'}
                onChange={(e) =>
                  set({ category: e.target.value as Property['category'] })
                }
                className={inputClass}
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="commercial">Commercial</option>
              </select>
            </Field>
            <Field label="Price (e.g. ₹42 Lakhs+)">
              <input
                value={form.price || ''}
                onChange={(e) => set({ price: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Size">
              <input
                value={form.size || ''}
                onChange={(e) => set({ size: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Carpet Area">
              <input
                value={form.carpetArea || ''}
                onChange={(e) => set({ carpetArea: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Super Area">
              <input
                value={form.superArea || ''}
                onChange={(e) => set({ superArea: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Possession">
              <input
                value={form.possession || ''}
                onChange={(e) => set({ possession: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label='Status (e.g. "New Launch")'>
              <input
                value={form.status || ''}
                onChange={(e) => set({ status: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              rows={4}
              value={form.description || ''}
              onChange={(e) => set({ description: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Amenities (comma separated)">
            <input
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
              placeholder="Swimming Pool, Gym, Club House"
              className={inputClass}
            />
          </Field>
          <div className="flex flex-wrap gap-6">
            {(
              [
                ['published', 'Published'],
                ['featured', 'Featured'],
                ['verified', 'Verified'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => set({ [key]: e.target.checked })}
                  className="h-4 w-4 accent-gray-900"
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* Media */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-gray-900">Media</h2>
          <MediaUploader
            image={form.image || ''}
            gallery={form.gallery || []}
            brochureUrl={form.brochureUrl || ''}
            onChange={set}
          />
          <Field label="Video URL (optional)">
            <input
              value={form.video || ''}
              onChange={(e) => set({ video: e.target.value })}
              className={inputClass}
            />
          </Field>
        </section>

        {/* Configurations */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Configurations</h2>
            <button
              type="button"
              onClick={() =>
                set({
                  configurations: [
                    ...(form.configurations || []),
                    { type: '', size: '', price: '' },
                  ],
                })
              }
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {(form.configurations || []).map((c, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                placeholder="Type (1 BHK)"
                value={c.type}
                onChange={(e) => setConfig(i, { type: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Size (450 sq.ft)"
                value={c.size}
                onChange={(e) => setConfig(i, { size: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Price (₹40 L+)"
                value={c.price}
                onChange={(e) => setConfig(i, { price: e.target.value })}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  set({
                    configurations: (form.configurations || []).filter(
                      (_, idx) => idx !== i
                    ),
                  })
                }
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-gray-900">Contact Person</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                value={form.contact?.name || ''}
                onChange={(e) =>
                  set({
                    contact: { ...(form.contact || { name: '', phone: '' }), name: e.target.value },
                  })
                }
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                value={form.contact?.phone || ''}
                onChange={(e) =>
                  set({
                    contact: { ...(form.contact || { name: '', phone: '' }), phone: e.target.value },
                  })
                }
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {!isNew && id && (
          <RevisionHistory propertyId={id} onReverted={loadProperty} />
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {saving && <Loader className="h-4 w-4 animate-spin" />}
            {saving ? 'Saving…' : isNew ? 'Create Property' : 'Save Changes'}
          </button>
          <Link to="/admin" className="px-6 py-2.5 text-gray-600 hover:text-gray-900 text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyEditPage;
