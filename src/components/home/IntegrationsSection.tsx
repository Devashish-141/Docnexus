import { motion } from "framer-motion";

// Integration logos as SVG components for crispness
// Integration logos as SVG components from Simple Icons
const integrations = [
  { name: "Dropbox", slug: "dropbox", color: "#0061FF" },
  { name: "Zapier", slug: "zapier", color: "#FF4A00" },
  { name: "n8n", slug: "n8n", color: "#EA4B71" },
  { name: "Make", slug: "make", color: "#6D00CC" },
  { name: "Google", slug: "google", color: "#4285F4" },
  { name: "IFTTT", slug: "ifttt", color: "#000000" },
  { name: "Airtable", slug: "airtable", color: "#18BFFF" },
  { name: "Microsoft", slug: "microsoft", color: "#0078D4" },
  { name: "Shopify", slug: "shopify", color: "#96BF48" },
  { name: "Slack", slug: "slack", color: "#4A154B" },
  { name: "Notion", slug: "notion", color: "#000000" },
  { name: "HubSpot", slug: "hubspot", color: "#FF7A59" },
  { name: "Trello", slug: "trello", color: "#0052CC" },
  { name: "Jira", slug: "jira", color: "#0052CC" },
  { name: "Zendesk", slug: "zendesk", color: "#03363D" },
  { name: "Intercom", slug: "intercom", color: "#1F8DED" },
];

function IntegrationLogo({ name, slug, color }: { name: string; slug: string; color: string }) {
  return (
    <div
      className="w-full aspect-square rounded-xl bg-card border flex items-center justify-center p-4 transition-all duration-300 hover:shadow-elevated hover:scale-105 hover:border-primary/20 group"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center p-2.5 transition-colors duration-300"
        style={{ backgroundColor: `${color}10` }}
      >
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
          alt={`${name} logo`}
          className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-110"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 md:py-28 bg-secondary/30">
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
            Seamless Integration Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect DocuNexus to your existing workflow tools. 100+ native integrations
            to automate document processing across your entire tech stack.
          </p>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <IntegrationLogo {...integration} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted-foreground mt-8"
        >
          Plus webhooks, REST API, and custom integrations via our Developer Platform
        </motion.p>
      </div>
    </section>
  );
}
