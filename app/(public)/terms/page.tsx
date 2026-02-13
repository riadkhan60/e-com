import { Container } from '@/components/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Shilpini',
  description: 'Shilpini terms and conditions. Read our terms of service for ordering and using our website.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pb-16 pt-8">
      <Container>
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Last updated: February 2025
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the Shilpini website and placing orders, you agree to these Terms & Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Products & Orders</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to display our products accurately. Product images and descriptions are for reference; slight variations in color or design may occur. By placing an order, you confirm that the information provided is correct and complete.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Payment & Pricing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are listed in BDT (Bangladeshi Taka) and include applicable taxes unless otherwise stated. We accept payment via Cash on Delivery (COD) and other methods as indicated at checkout. Prices are subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Shipping & Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              Delivery times are estimates and may vary based on location and circumstances. You are responsible for providing a correct delivery address. Risk of loss passes to you upon delivery.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Returns & Exchanges</h2>
            <p className="text-muted-foreground leading-relaxed">
              Please review our return and exchange policy before purchasing. Defective or incorrect items may be eligible for return or exchange. Contact us at{' '}
              <a href="mailto:info.shilpini@gmail.com" className="text-foreground underline hover:no-underline">
                info.shilpini@gmail.com
              </a>
              {' '}for assistance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including images, text, and logos, is the property of Shilpini and is protected by intellectual property laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms & Conditions, contact us at{' '}
              <a href="mailto:info.shilpini@gmail.com" className="text-foreground underline hover:no-underline">
                info.shilpini@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
