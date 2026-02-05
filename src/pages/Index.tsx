import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ROISection } from "@/components/home/ROISection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ROISection />
      <PillarsSection />
      <IntegrationsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
