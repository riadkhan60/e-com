'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const COLLECTIONS = [
  { value: 'NEW_ARRIVAL', label: 'New Arrivals' },
  { value: 'BEST_SELL', label: 'Best Sellers' },
  { value: 'TRENDING', label: 'Trending' },
];

export function CollectionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentCollection = searchParams.get('collection');

  const handleCollectionSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCollection === value) {
      params.delete('collection');
    } else {
      params.set('collection', value);
    }

    params.delete('skip'); // Reset pagination
    router.push(`?${params.toString()}`, { scroll: false });
    setIsExpanded(false);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('collection');
    params.delete('skip');
    router.push(`?${params.toString()}`, { scroll: false });
    setIsExpanded(false);
  };

  const selectedLabel = COLLECTIONS.find(
    (c) => c.value === currentCollection,
  )?.label;

  return (
    <div className="w-full">
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:shadow-md"
      >
        <span className="text-foreground">
          {selectedLabel || 'Filter by Collection'}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Options */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-2 space-y-2 rounded-lg border-2 border-border bg-card p-4">
          {/* Clear Filter Button */}
          {currentCollection && (
            <button
              onClick={handleClearAll}
              className="w-full rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              Clear Filter
            </button>
          )}

          {/* Collection Options */}
          {COLLECTIONS.map((collection) => {
            const isSelected = currentCollection === collection.value;
            return (
              <button
                key={collection.value}
                onClick={() => handleCollectionSelect(collection.value)}
                className={`w-full rounded-md px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted hover:bg-accent hover:shadow-sm'
                }`}
              >
                {collection.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
