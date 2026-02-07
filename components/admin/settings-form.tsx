'use client';

import { useState } from 'react';
import { updateShippingCharges } from '@/lib/actions/settings';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface SettingsFormProps {
  initialSettings: {
    insideDhakaShipping: number;
    outsideDhakaShipping: number;
  };
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    insideDhaka: initialSettings.insideDhakaShipping.toString(),
    outsideDhaka: initialSettings.outsideDhakaShipping.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow positive numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const insideDhaka = parseFloat(formData.insideDhaka);
    const outsideDhaka = parseFloat(formData.outsideDhaka);

    // Validation
    if (isNaN(insideDhaka) || insideDhaka <= 0) {
      setMessage({
        type: 'error',
        text: 'Inside Dhaka shipping must be a positive number',
      });
      setIsSubmitting(false);
      return;
    }

    if (isNaN(outsideDhaka) || outsideDhaka <= 0) {
      setMessage({
        type: 'error',
        text: 'Outside Dhaka shipping must be a positive number',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await updateShippingCharges(insideDhaka, outsideDhaka);

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Shipping charges updated successfully!',
        });
        router.refresh();
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to update settings',
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Delivery Charges</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="insideDhaka" className="text-sm font-medium">
              Inside Dhaka (৳)
            </label>
            <input
              id="insideDhaka"
              name="insideDhaka"
              type="text"
              required
              value={formData.insideDhaka}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="70"
            />
            <p className="text-xs text-muted-foreground">
              Delivery charge for orders inside Dhaka
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="outsideDhaka" className="text-sm font-medium">
              Outside Dhaka (৳)
            </label>
            <input
              id="outsideDhaka"
              name="outsideDhaka"
              type="text"
              required
              value={formData.outsideDhaka}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="180"
            />
            <p className="text-xs text-muted-foreground">
              Delivery charge for orders outside Dhaka
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-lg p-4 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
