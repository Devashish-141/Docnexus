import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Brain,
  Edit3,
  RefreshCw,
  Shield,
  FileSearch,
  FileOutput,
  ScanLine,
  Merge,
  Signature,
  FileSpreadsheet,
  Globe,
  Minimize2,
  QrCode,
  Lock,
  ArrowRight,
  CheckCircle2,
  Search,
} from "lucide-react";

const solutions = [
  {
    id: "extraction",
    title: "Intelligent Extraction",
    subtitle: "AI-Powered Document Intelligence",
    description:
      "Transform unstructured documents into structured, actionable data with our advanced machine learning models trained on millions of documents.",
    icon: Brain,
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    features: [
      {
        icon: FileSearch,
        title: "AI Invoice Intelligence",
        description:
          "Automatically extract line items, totals, vendor info, and payment terms from invoices in any format.",
      },
      {
        icon: ScanLine,
        title: "Universal Data Capture",
        description:
          "OCR and NLP-powered extraction for receipts, contracts, forms, and any document type.",
      },
      {
        icon: FileOutput,
        title: "Automated Classification",
        description:
          "Smart routing and tagging based on document content, type, and business rules.",
      },
    ],
  },
  {
    id: "editor",
    title: "The Precision Editor",
    subtitle: "Professional Document Editing Suite",
    description:
      "A complete toolkit for document manipulation, from simple edits to complex transformations, all within a secure, audited environment.",
    icon: Edit3,
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    features: [
      {
        icon: Merge,
        title: "Smart Merge & Split",
        description:
          "Combine multiple PDFs or split large documents with page-level precision and batch processing.",
      },
      {
        icon: Signature,
        title: "Legally Binding eSignatures",
        description:
          "ESIGN and eIDAS compliant digital signatures with full audit trail and certificate management.",
      },
      {
        icon: Search,
        title: "Contextual Search & Replace",
        description:
          "Find and replace text, redact sensitive information, and apply bulk edits across documents.",
      },
    ],
  },
  {
    id: "conversion",
    title: "Universal Conversion Engine",
    subtitle: "Seamless Format Transformations",
    description:
      "Convert between any document format while preserving layout, fonts, and visual fidelity. Built for enterprise-scale operations.",
    icon: RefreshCw,
    color: "from-orange-200 to-orange-50",
    iconColor: "text-orange-600",
    features: [
      {
        icon: FileSpreadsheet,
        title: "Spreadsheet Digitization",
        description:
          "Convert PDF tables to Excel/CSV with structure detection and formula preservation.",
      },
      {
        icon: Globe,
        title: "HTML-to-Print Rendering",
        description:
          "Generate pixel-perfect PDFs from web content with CSS support and responsive layouts.",
      },
      {
        icon: FileOutput,
        title: "Omnichannel Format Interoperability",
        description:
          "Email to PDF, Word to PDF, image optimization, and 50+ format conversions.",
      },
    ],
  },
  {
    id: "security",
    title: "DocOps & Security",
    subtitle: "Enterprise-Grade Protection",
    description:
      "Comprehensive security controls, optimization tools, and compliance features designed for regulated industries.",
    icon: Shield,
    color: "from-rose-200 to-rose-50",
    iconColor: "text-rose-600",
    features: [
      {
        icon: Minimize2,
        title: "Lossless Compression",
        description:
          "Reduce file sizes by up to 90% without quality loss. Perfect for archival and transmission.",
      },
      {
        icon: QrCode,
        title: "Barcode Logic",
        description:
          "Read and generate QR codes, barcodes (Code128, EAN, UPC), and 2D matrix codes.",
      },
      {
        icon: Lock,
        title: "Enterprise Encryption",
        description:
          "AES-256 encryption, password protection, and DRM controls with key management.",
      },
    ],
  },
];

const Solutions = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-transparent">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              Complete Document Solutions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Four integrated modules designed to handle every aspect of your
              document workflow, from capture to secure delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-8 md:py-12">
        <div className="container-fluid space-y-20 md:space-y-28">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id={solution.id}
              className="scroll-mt-24"
            >
              {/* Solution Header */}
              <div
                className={`rounded-2xl bg-gradient-to-br ${solution.color} p-8 md:p-12 mb-8`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-background flex items-center justify-center shrink-0 ${solution.iconColor}`}
                  >
                    <solution.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {solution.subtitle}
                    </p>
                    <h2 className="font-heading text-3xl md:text-4xl mb-4">
                      {solution.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {solution.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                    className="bg-card rounded-xl border p-6 hover:shadow-elevated transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-heading text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Experience the full power of DocuNexus with a free trial. No
                credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth?mode=signup">
                  <Button size="lg">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" size="lg">
                    View API Documentation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Solutions;
