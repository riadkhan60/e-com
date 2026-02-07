import { HeroSlider } from '@/components/hero-slider';
import HomeCollectionsSection from '@/components/home-collections-section';
import HomeCategoriesSection from '@/components/home-categories-section';
import HomeShowcaseReviewsSection from '@/components/home-showcase-reviews-section';
import { getHeroSlides } from '@/lib/actions/sliders';

// Revalidate this page every 1 hour (ISR)
export const revalidate = 3600;

export default async function Home() {
  const slides = await getHeroSlides();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSlider slides={slides} />
      <HomeCollectionsSection />
      <HomeCategoriesSection />
      <HomeShowcaseReviewsSection />
    </main>
  );
}
