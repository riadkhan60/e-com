'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { CartDrawer } from '@/components/cart-drawer';
import { Container } from '@/components/container';
import Image from 'next/image';

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={'/logo/Logo-png-01.png'}
              alt="Logo"
              width={100}
              height={100}
              className="w-20 md:w-22"
            />
          </Link>

          {/* Right side: Cart */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center justify-center rounded-full border px-2 py-2 text-foreground transition hover:bg-muted"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
