import { useState } from 'react';
import { Upload, X, Loader, FileText } from 'lucide-react';
import {
  uploadImage,
  uploadImages,
  uploadBrochure,
} from '../../services/adminApi';

interface MediaUploaderProps {
  image: string;
  gallery: string[];
  brochureUrl: string;
  onChange: (media: {
    image?: string;
    gallery?: string[];
    brochureUrl?: string;
  }) => void;
}

/** Main image, gallery and brochure uploads for the property form. */
const MediaUploader = ({
  image,
  gallery,
  brochureUrl,
  onChange,
}: MediaUploaderProps) => {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (label: string, task: () => Promise<void>) => {
    setBusy(label);
    setError(null);
    try {
      await task();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Main image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Image
        </label>
        <div className="flex items-center gap-4">
          {image && (
            <img src={image} alt="" className="w-24 h-24 rounded-lg object-cover" />
          )}
          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
            {busy === 'image' ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {image ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy !== null}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                run('image', async () => {
                  const { url } = await uploadImage(file);
                  onChange({ image: url });
                });
              }}
            />
          </label>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gallery
        </label>
        <div className="flex flex-wrap gap-3">
          {gallery.map((url, i) => (
            <div key={url + i} className="relative group">
              <img src={url} alt="" className="w-20 h-20 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() =>
                  onChange({ gallery: gallery.filter((_, idx) => idx !== i) })
                }
                className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-0.5 shadow hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 text-gray-400">
            {busy === 'gallery' ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={busy !== null}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (!files.length) return;
                run('gallery', async () => {
                  const results = await uploadImages(files);
                  onChange({ gallery: [...gallery, ...results.map((r) => r.url)] });
                });
              }}
            />
          </label>
        </div>
      </div>

      {/* Brochure */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brochure (PDF)
        </label>
        <div className="flex items-center gap-3">
          {brochureUrl && (
            <a
              href={brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
            >
              <FileText className="h-4 w-4" /> View current
            </a>
          )}
          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
            {busy === 'brochure' ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {brochureUrl ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={busy !== null}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                run('brochure', async () => {
                  const { url } = await uploadBrochure(file);
                  onChange({ brochureUrl: url });
                });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
