import { useEffect, useState } from 'react';
import { Property } from '../types/property';
import { fetchProperties } from '../services/api';

// Simple module-level cache so every component that calls useProperties()
// shares one fetch per page load instead of hitting the API repeatedly.
let cache: Property[] | null = null;
let inflight: Promise<Property[]> | null = null;

function loadProperties(): Promise<Property[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetchProperties()
      .then((data) => {
        cache = data;
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    let active = true;
    loadProperties()
      .then((data) => {
        if (!active) return;
        setProperties(data);
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { properties, loading, error };
}

/** Unique non-empty values of one property field, for filter dropdowns. */
export function uniqueValues(
  properties: Property[],
  field: 'location' | 'type' | 'developer'
): string[] {
  return [...new Set(properties.map((p) => p[field]).filter(Boolean))].sort();
}
