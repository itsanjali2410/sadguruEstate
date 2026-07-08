import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Lead } from '../../types/property';
import {
  getLeads,
  updateLeadStatus,
  deleteLead,
} from '../../services/adminApi';

const STATUS_STYLES: Record<Lead['status'], string> = {
  new: 'bg-green-100 text-green-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-600',
};

const FORM_TYPE_LABELS: Record<Lead['formType'], string> = {
  contact: 'Contact form',
  property_inquiry: 'Property inquiry',
  quick_info: 'Quick info',
  brochure_download: 'Brochure download',
};

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getLeads(filter || undefined)
      .then(setLeads)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  const setStatus = async (lead: Lead, status: string) => {
    const updated = await updateLeadStatus(lead._id, status);
    setLeads((prev) =>
      prev.map((l) => (l._id === lead._id ? { ...l, status: updated.status } : l))
    );
  };

  const remove = async (lead: Lead) => {
    if (!window.confirm(`Delete lead from "${lead.name || lead.phone}"?`)) return;
    await deleteLead(lead._id);
    setLeads((prev) => prev.filter((l) => l._id !== lead._id));
  };

  if (error) return <div className="text-red-600 py-12">{error}</div>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Leads ({leads.length})
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="animate-pulse text-gray-500 py-12">Loading leads…</div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">
                      {lead.name || 'No name'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {FORM_TYPE_LABELS[lead.formType] || lead.formType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-x-4">
                    <a href={`tel:${lead.phone}`} className="hover:underline">
                      {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="hover:underline">
                        {lead.email}
                      </a>
                    )}
                  </div>
                  {lead.propertyName && (
                    <p className="text-sm text-gray-500 mt-1">
                      Property: {lead.propertyName}
                    </p>
                  )}
                  {lead.message && (
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => setStatus(lead, e.target.value)}
                    className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => remove(lead)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!leads.length && (
            <div className="text-center text-gray-500 py-12 bg-white border border-gray-200 rounded-xl">
              No leads{filter ? ` with status "${filter}"` : ' yet'}.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminLeadsPage;
