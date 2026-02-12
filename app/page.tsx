import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { TrustStrip } from '@/components/trust/TrustStrip';
import { MetricsSection } from '@/components/metrics/MetricsSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { WorkSection } from '@/components/work/WorkSection';
import { Process2DSection } from '@/components/process/Process2DSection';
import { ClientsSection } from '@/components/clients/ClientsSection';
import { BrandsCarousel } from '@/components/brands/BrandsCarousel';
import { WhyChooseUs } from '@/components/why/WhyChooseUs';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { CTASection } from '@/components/cta/CTASection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

/**
 * Social Route – Agency portfolio home page.
 * Sections: Hero → Trust → Metrics → About → Services → Our Work → Process → Why Us → Testimonials → CTA → Contact → Footer.
 */
import { FluidFlowOverlay } from '@/components/ui/FluidFlowOverlay';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { CustomCursor } from '@/components/ui/CustomCursor';

export default function Home() {
  return (
    <>
      <FluidFlowOverlay />
      <FloatingContact />
      <CustomCursor />
      <Header />
      <main className="relative">
        <HeroSection />
        <MetricsSection />
        <TrustStrip />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <Process2DSection />
        <ClientsSection />
        <BrandsCarousel />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
