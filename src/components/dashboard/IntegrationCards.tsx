import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";

const integrations = [
  {
    name: "Salesforce",
    description: "CRM & Sales Platform",
    status: "connected",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg",
    color: "#00A1E0",
  },
  {
    name: "n8n",
    description: "Workflow Automation",
    status: "connected",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg",
    color: "#EA4B71",
  },
  {
    name: "Zapier",
    description: "App Integrations",
    status: "connected",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg",
    color: "#FF4A00",
  },
  {
    name: "Shopify",
    description: "E-commerce Platform",
    status: "connected",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg",
    color: "#7AB55C",
  },
];

export function IntegrationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {integrations.map((integration, index) => (
        <motion.div
          key={integration.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-elevated-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${integration.color}15` }}
                  >
                    <img 
                      src={integration.icon} 
                      alt={integration.name}
                      className="w-6 h-6"
                      style={{ filter: 'brightness(0) saturate(100%)' }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-light text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                  <Check className="w-3 h-3" />
                  Connected
                </span>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
