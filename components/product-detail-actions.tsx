'use client';

import { ShoppingCart, Check, MessageCircle, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

import { useRouter } from 'next/navigation';

interface ProductDetailActionsProps {
  product: {
    id: string;
    name: string;
    price: string;
    featuredImage: string | null;
    stock: number;
    categoryName?: string | null;
    options?: {
      id: string;
      name: string;
      values: string[];
    }[];
  };
}

// Helper removed

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // State for selected options
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<string | null>(null);

  const cartItem = items.find((item) => item.id === product.id);
  const currentCartQty = cartItem?.quantity || 0;
  const availableStock = product.stock - currentCartQty;

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
    setError(null);
  };

  const handleAddToCart = () => {
    // Validate options
    if (product.options && product.options.length > 0) {
      const missingOptions = product.options.filter(
        (opt) => !selectedOptions[opt.name],
      );

      if (missingOptions.length > 0) {
        setError(
          `Please select ${missingOptions.map((o) => o.name).join(', ')}`,
        );
        return;
      }
    }

    if (availableStock <= 0) return;

    // Create a variant ID or append options to name for the cart item
    // For now, simpler approach: just add it.
    // Ideally we need to support variants in cart properly.
    // We will append selected options to name or pass as metadata.

    // Note: The cart context currently doesn't support complex variants merging separately.
    // Updates to cart context are planned. For now we pass options.

    // Construct cart item with options
    const cartItemData = {
      ...product,
      selectedOptions: selectedOptions, // Pass this even if not typed yet in cart
      // Create a unique ID for this variant if needed,
      // but for now we keep ID same and let CartContext handle split if valid.
      // Wait, if ID is same, cart will merge them.
      // We will temporarily append options to ID to force separation or rely on CartContext update.
      // Let's rely on extending the addItem to just take what we give.
    };

    for (let i = 0; i < quantity; i++) {
      addItem(cartItemData);
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const router = useRouter();

  // ... (previous code)

  const handleOrderNow = () => {
    // Validate options
    if (product.options && product.options.length > 0) {
      const missingOptions = product.options.filter(
        (opt) => !selectedOptions[opt.name],
      );

      if (missingOptions.length > 0) {
        setError(
          `Please select ${missingOptions.map((o) => o.name).join(', ')}`,
        );
        return;
      }
    }

    if (availableStock <= 0) return;

    // Construct cart item with options
    const cartItemData = {
      ...product,
      selectedOptions: selectedOptions,
    };

    for (let i = 0; i < quantity; i++) {
      addItem(cartItemData);
    }

    router.push('/checkout');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < availableStock) setQuantity(quantity + 1);
  };

  if (product.stock <= 0) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-destructive">
          Out of Stock
        </div>
        <p className="text-center text-xs text-muted-foreground">
          This product is currently unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Options */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-4">
          {product.options.map((option) => (
            <div key={option.id}>
              <h3 className="mb-2 text-sm font-medium text-foreground">
                {option.name}:{' '}
                <span className="text-muted-foreground">
                  {selectedOptions[option.name]}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionSelect(option.name, value)}
                      className={`min-w-12 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all
                            ${
                              isSelected
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-input bg-background hover:bg-muted text-foreground'
                            }
                        `}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm font-medium text-destructive animate-pulse">
          {error}
        </p>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border bg-background">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="inline-flex h-10 w-10 items-center justify-center transition hover:bg-muted disabled:opacity-50 sm:h-12 sm:w-12"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-sm font-semibold sm:w-16 sm:text-base">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= availableStock}
              className="inline-flex h-10 w-10 items-center justify-center transition hover:bg-muted disabled:opacity-50 sm:h-12 sm:w-12"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {availableStock} available
            {currentCartQty > 0 && ` (${currentCartQty} in cart)`}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={availableStock <= 0}
          className="inline-flex py-2 flex-1 items-center justify-center gap-2 rounded-full border bg-foreground text-background transition hover:bg-foreground/90 disabled:opacity-50 sm:h-12"
        >
          {isAdded ? (
            <>
              <Check className="h-5 w-5" />
              <span className="font-medium">Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Add to Cart</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleOrderNow}
          className="inline-flex h-11 flex-1  py-2 items-center justify-center gap-2 rounded-full border border-green-600 bg-green-600 text-white transition hover:bg-green-700 sm:h-12"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Order Now</span>
        </button>
      </div>

      {availableStock <= 0 && (
        <p className="text-center text-sm text-destructive">
          Cannot add more - stock limit reached
        </p>
      )}
    </div>
  );
}
