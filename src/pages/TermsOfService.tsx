import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: January 4, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using DocuNexus services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                2. Description of Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                DocuNexus provides an enterprise-grade document intelligence platform that enables users to process, analyze, and manage documents using advanced AI technology. Our services include document parsing, data extraction, workflow automation, and API access for integration with third-party systems.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                3. User Accounts
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access our services, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious content or malware</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our services</li>
                <li>Process documents containing illegal content</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of all documents and content you upload to DocuNexus. We do not claim any intellectual property rights over your content. However, you grant us a limited license to process your documents as necessary to provide our services. Our platform, including all software, designs, and documentation, remains our exclusive property.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                6. Payment Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Paid services are billed according to your selected plan. All fees are non-refundable unless otherwise specified. We may change our pricing with 30 days' notice. Failure to pay may result in suspension or termination of your account.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                7. Service Availability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain high availability but do not guarantee uninterrupted service. We may perform maintenance or updates that temporarily affect availability. Enterprise customers may have specific SLA terms outlined in their agreements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, DocuNexus shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                9. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your right to use our services will cease immediately. We may retain certain data as required by law or for legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                10. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Delaware.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                11. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at support@docunexus.com or through our support channels.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
