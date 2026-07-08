import { useCallback, useEffect, useState } from 'react';
import { History, RotateCcw, Loader } from 'lucide-react';
import { Revision } from '../../types/property';
import { getRevisions, revertRevision } from '../../services/adminApi';

interface RevisionHistoryProps {
  propertyId: string;
  /** Called after a successful revert so the parent form can reload. */
  onReverted: () => void;
}

/** Change history of one property, with one-click undo per snapshot. */
const RevisionHistory = ({ propertyId, onReverted }: RevisionHistoryProps) => {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    getRevisions(propertyId)
      .then(setRevisions)
      .catch((e: Error) => setError(e.message));
  }, [propertyId]);

  useEffect(load, [load]);

  const revert = async (rev: Revision) => {
    if (
      !window.confirm(
        `Restore this property to how it was before the change of ${new Date(rev.createdAt).toLocaleString()}?`
      )
    )
      return;
    setBusyId(rev._id);
    setError(null);
    try {
      await revertRevision(rev._id);
      load();
      onReverted();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Revert failed');
    } finally {
      setBusyId(null);
    }
  };

  if (!revisions.length && !error) return null;

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-medium text-gray-900 flex items-center gap-2 mb-1">
        <History className="h-4 w-4" /> Change History
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Each entry is a snapshot taken before a save. Revert restores those
        values (the revert itself is also undoable).
      </p>
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <ul className="divide-y divide-gray-100">
        {revisions.map((rev) => (
          <li key={rev._id} className="py-2.5 flex items-center justify-between gap-3">
            <div className="text-sm text-gray-700">
              <span className="font-medium">
                {new Date(rev.createdAt).toLocaleString()}
              </span>
              <span className="text-gray-400"> — before an edit</span>
            </div>
            <button
              type="button"
              onClick={() => revert(rev)}
              disabled={busyId !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
            >
              {busyId === rev._id ? (
                <Loader className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RotateCcw className="h-3.5 w-3.5" />
              )}
              Revert to this
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RevisionHistory;
