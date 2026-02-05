import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container-fluid py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: January 4, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                DocuNexus ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our document intelligence platform and related services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Account information (name, email address, company name)</li>
                <li>Documents and files you upload for processing</li>
                <li>Payment and billing information</li>
                <li>Communications you send to us</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your documents and deliver results</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data, including encryption in transit and at rest, secure data centers, regular security audits, and access controls. Your documents are processed in isolated environments and are automatically deleted after processing unless you choose to store them.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                5. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with third-party service providers who assist us in operating our platform, processing payments, and analyzing usage. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at support@docunexus.com or through our support channels.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
