import { motion } from "framer-motion";
import { 
  Brain, 
  Edit3, 
  RefreshCw, 
  Shield,
  FileSearch,
  FileOutput,
  ScanLine,
  Lock,
  Merge,
  Signature,
  FileSpreadsheet,
  Globe,
  Minimize2,
  QrCode
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    id: "extraction",
    title: "Intelligent Extraction",
    description: "AI-powered data capture that understands your documents",
    icon: Brain,
    color: "bg-primary/10 text-primary",
    features: [
      { icon: FileSearch, label: "AI Invoice Intelligence" },
      { icon: ScanLine, label: "Universal Data Capture" },
      { icon: FileOutput, label: "Auto Classification" },
    ],
  },
  {
    id: "editor",
    title: "The Precision Editor",
    description: "Professional-grade tools for document perfection",
    icon: Edit3,
    color: "bg-accent/10 text-accent",
    features: [
      { icon: Merge, label: "Smart Merge & Split" },
      { icon: Signature, label: "Legal eSignatures" },
      { icon: FileSearch, label: "Search & Replace" },
    ],
  },
  {
    id: "conversion",
    title: "Universal Conversion",
    description: "Seamless format transformations across all channels",
    icon: RefreshCw,
    color: "bg-orange-100 text-orange-600",
    features: [
      { icon: FileSpreadsheet, label: "Spreadsheet Digitization" },
      { icon: Globe, label: "HTML-to-Print" },
      { icon: FileOutput, label: "Omnichannel Export" },
    ],
  },
  {
    id: "security",
    title: "DocOps & Security",
    description: "Enterprise-grade protection and optimization",
    icon: Shield,
    color: "bg-rose-100 text-rose-600",
    features: [
      { icon: Minimize2, label: "Lossless Compression" },
      { icon: QrCode, label: "Barcode Logic" },
      { icon: Lock, label: "Encryption Suite" },
    ],
  },
];

export function PillarsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            Four Pillars of Document Excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive platform engineered for every document workflow, 
            from extraction to secure delivery.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-xl border p-6 transition-all duration-300 hover:shadow-elevated-lg hover:border-primary/20">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${pillar.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <pillar.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {pillar.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {pillar.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-3 text-sm">
                      <feature.icon className="w-4 h-4 text-muted-foreground" />
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/solutions">
            <Button size="lg">
              Explore All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
