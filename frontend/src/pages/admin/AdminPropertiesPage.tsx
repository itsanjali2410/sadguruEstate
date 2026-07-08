import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, Trash2, Pencil, Loader, RotateCcw } from 'lucide-react';
import { Property, Revision } from '../../types/property';
import {
  getAllProperties,
  updateProperty,
  deleteProperty,
  importExcel,
  getDeletedRevisions,
  revertRevision,
} from '../../services/adminApi';

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deleted, setDeleted] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    getAllProperties()
      .then(setProperties)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    getDeletedRevisions().then(setDeleted).catch(() => {});
  };

  useEffect(load, []);

  const restore = async (rev: Revision) => {
    if (!window.confirm(`Restore deleted property "${rev.name}"?`)) return;
    await revertRevision(rev._id);
    load();
  };

  const toggle = async (p: Property, field: 'published' | 'featured') => {
    const updated = await updateProperty(p._id!, { [field]: !p[field] });
    setProperties((prev) =>
      prev.map((item) => (item._id === p._id ? { ...item, ...updated } : item))
    );
  };

  const remove = async (p: Property) => {
    if (!window.confirm(`Delete "${p.name}"? You can restore it from "Recently deleted".`)) return;
    await deleteProperty(p._id!);
    load();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportResult(null);
    try {
      const result = await importExcel(file);
      setImportResult(
        `Imported ${result.created} of ${result.total} rows` +
          (result.errors.length
            ? ` — ${result.errors.length} errors (first: row ${result.errors[0].row}: ${result.errors[0].reason})`
            : '')
      );
      load();
    } catch (err) {
      setImportResult(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (loading) {
    return <div className="animate-pulse text-gray-500 py-12">Loading properties…</div>;
  }
  if (error) {
    return <div className="text-red-600 py-12">{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Properties ({properties.length})
        </h1>
        <div className="flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleImport}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={importing}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
          >
            {importing ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Import Excel
          </button>
          <Link
            to="/admin/properties/new"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" /> New Property
          </Link>
        </div>
      </div>

      {importResult && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          {importResult}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium text-center">Published</th>
              <th className="px-4 py-3 font-medium text-center">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.image && (
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <span className="font-medium text-gray-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.location}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{p.category}</td>
                <td className="px-4 py-3 text-gray-600">{p.price}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={p.published !== false}
                    onChange={() => toggle(p, 'published')}
                    className="h-4 w-4 accent-gray-900 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={Boolean(p.featured)}
                    onChange={() => toggle(p, 'featured')}
                    className="h-4 w-4 accent-gray-900 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/properties/${p._id}`}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => remove(p)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!properties.length && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  No properties yet. Create one or import an Excel file.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleted.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Recently deleted
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {deleted.map((rev) => (
              <div
                key={rev._id}
                className="px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{rev.name}</span>
                  <span className="text-gray-400">
                    {' '}— deleted {new Date(rev.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => restore(rev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;
