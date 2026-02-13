import { Container } from '@/components/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shilpini',
  description: 'Shilpini privacy policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pb-16 pt-8">
      <Container>
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Last updated: February 2025
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you place an order or contact us, we collect information such as your name, phone number, email address, and delivery address. We use this information to process your orders and provide customer support.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to fulfill orders, communicate with you about your purchases, improve our products and services, and send relevant updates (with your consent). We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take reasonable measures to protect your personal information. Payment details are processed securely. We retain your order information as required for business and legal purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Cookies & Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies and analytics to improve your experience, understand how you use our site, and personalize content. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy or wish to update or delete your data, please contact us at{' '}
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
