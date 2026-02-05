import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Wind, ShieldCheck, Network } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-primary/20">

        {/* fluid background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        </div>

        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8"
            >
              The Architecture of<br /><span className="italic">Intelligence.</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-body text-xl md:text-3xl font-light text-stone-600 max-w-3xl mx-auto leading-relaxed"
            >
              Document management is no longer a storage problem; it is a data-flow opportunity.
            </motion.p>
          </div>
        </section>

        {/* Section 2 & 3: Mission & Vision */}
        <section className="py-24 px-6 border-b border-stone-200/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">

            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-8">The Mission</h2>
              <p className="font-body text-xl md:text-2xl leading-loose text-stone-700">
                To build the world’s most invisible document infrastructure. We exist to transform static, trapped information into dynamic, actionable intelligence that fuels global enterprise growth.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="md:mt-32"
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-8">The Vision</h2>
              <p className="font-body text-xl md:text-2xl leading-loose text-stone-700">
                A world where manual data entry is obsolete. We envision a future where every document—from a simple receipt to a complex legal contract—is self-aware, structured, and instantly integrated into the global digital ecosystem.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Section 4: Philosophy */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-12 lg:gap-16"
              variants={stagger}
            >
              {/* Pillar 1 */}
              <motion.div variants={fadeUp} className="group">
                <div className="mb-6 p-4 rounded-full bg-stone-100 w-fit group-hover:bg-indigo-50 transition-colors">
                  <Wind className="w-8 h-8 text-stone-800 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl mb-4">Frictionless Flow</h3>
                <p className="font-body text-lg md:text-xl text-stone-600 leading-relaxed">
                  Engineering systems that move data without resistance. We eliminate the drag of manual intervention, allowing your business logic to execute at the speed of software.
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div variants={fadeUp} className="group">
                <div className="mb-6 p-4 rounded-full bg-stone-100 w-fit group-hover:bg-indigo-50 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-stone-800 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl mb-4">Zero-Knowledge Security</h3>
                <p className="font-body text-lg md:text-xl text-stone-600 leading-relaxed">
                  Protecting data integrity through 60-minute link expiries and advanced encryption. We believe the safest data is the data we do not hold.
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <motion.div variants={fadeUp} className="group">
                <div className="mb-6 p-4 rounded-full bg-stone-100 w-fit group-hover:bg-indigo-50 transition-colors">
                  <Network className="w-8 h-8 text-stone-800 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl mb-4">Interoperability by Design</h3>
                <p className="font-body text-lg md:text-xl text-stone-600 leading-relaxed">
                  Ensuring 100+ native integrations (Salesforce, n8n, Zapier) so your data is never siloed. We build bridges, not walls.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Section 5: The Impact & CTA */}
        <section className="py-24 md:py-32 px-6 bg-stone-100/50 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20 divide-y md:divide-y-0 md:divide-x divide-stone-200">
              <div className="p-4">
                <div className="font-heading text-5xl md:text-6xl mb-2 text-indigo-600">1,000+</div>
                <div className="font-body text-xl text-stone-600">Enterprises Optimized</div>
              </div>
              <div className="p-4">
                <div className="font-heading text-5xl md:text-6xl mb-2 text-indigo-600">96%</div>
                <div className="font-body text-xl text-stone-600">Reduction in Costs</div>
              </div>
              <div className="p-4">
                <div className="font-heading text-5xl md:text-6xl mb-2 text-indigo-600">100+</div>
                <div className="font-body text-xl text-stone-600">Native API Connections</div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth?mode=signup">
                <Button
                  size="lg"
                  className="bg-[#4F46E5] hover:bg-[#4338ca] text-white py-8 px-10 text-xl font-heading rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Experience the Flow <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
};

export default About;
