'use client';

import { ShoppingBag } from 'lucide-react';

interface OrderNowButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
  };
  variant?: 'default' | 'compact';
  className?: string;
}

function formatPrice(value: string) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return `TK ${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function OrderNowButton({
  product,
  variant = 'default',
  className = '',
}: OrderNowButtonProps) {
  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
    const message = `Hi! I want to order: 1 pcs ${product.name}. Price: ${formatPrice(product.price)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleOrderNow}
        className={`inline-flex h-7 w-full items-center justify-center gap-1 rounded-full border-2 border-gray-300 bg-white text-foreground transition-all hover:bg-gray-50 hover:shadow-sm sm:h-10 sm:gap-2 dark:border-gray-700 dark:bg-slate-950 dark:hover:bg-slate-900 ${className}`}
      >
        <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-[10px] font-medium sm:text-sm">Order</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleOrderNow}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium text-foreground transition-all hover:bg-gray-50 hover:shadow-lg dark:border-gray-700 dark:bg-slate-950 dark:hover:bg-slate-900 sm:h-12 ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      Order via WhatsApp
    </button>
  );
}
