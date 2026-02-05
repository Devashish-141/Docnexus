import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Copy,
  Check,
  FileText,
  Code,
  Zap,
  Lock,
  Globe,
  FileOutput,
} from "lucide-react";

const sidebarItems = [
  {
    category: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "authentication", label: "Authentication" },
      { id: "quickstart", label: "Quick Start" },
    ],
  },
  {
    category: "Core API",
    items: [
      { id: "extract", label: "Extract Data" },
      { id: "convert", label: "Convert Documents" },
      { id: "merge", label: "Merge & Split" },
    ],
  },
  {
    category: "Integrations",
    items: [
      { id: "n8n", label: "n8n Workflow" },
      { id: "salesforce", label: "Salesforce" },
      { id: "webhooks", label: "Webhooks" },
    ],
  },
];

const codeExamples = {
  introduction: `// Welcome to DocuNexus API
// Base URL: https://api.docunexus.com/v1

// All requests require authentication via API key
// Include your key in the Authorization header

fetch('https://api.docunexus.com/v1/documents', {
  headers: {
    'Authorization': 'Bearer your_api_key_here',
    'Content-Type': 'application/json'
  }
})`,

  authentication: `// Authentication
// All API requests require a valid API key

const headers = {
  'Authorization': 'Bearer dn_live_xxxxxxxxxxxx',
  'Content-Type': 'application/json'
};

// Test your authentication
const response = await fetch(
  'https://api.docunexus.com/v1/auth/verify',
  { headers }
);

// Response
{
  "authenticated": true,
  "organization": "Acme Corp",
  "tier": "enterprise",
  "rate_limit": {
    "requests_per_minute": 1000,
    "remaining": 999
  }
}`,

  quickstart: `// Quick Start - Extract data from an invoice
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('invoice.pdf'));
form.append('type', 'invoice');

const response = await fetch(
  'https://api.docunexus.com/v1/extract/invoice',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key'
    },
    body: form
  }
);

const data = await response.json();
console.log(data.extracted);
// { vendor: "Acme Corp", total: 1234.56, ... }`,

  extract: `// POST /v1/extract/invoice
// Extract structured data from invoices

const response = await fetch(
  'https://api.docunexus.com/v1/extract/invoice',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      document_url: 'https://example.com/invoice.pdf',
      options: {
        extract_line_items: true,
        detect_currency: true,
        parse_dates: true
      }
    })
  }
);

// Response
{
  "id": "ext_abc123",
  "status": "completed",
  "extracted": {
    "vendor": {
      "name": "Acme Corp",
      "address": "123 Business St",
      "tax_id": "12-3456789"
    },
    "invoice_number": "INV-2024-001",
    "date": "2024-01-15",
    "due_date": "2024-02-15",
    "line_items": [
      {
        "description": "Professional Services",
        "quantity": 10,
        "unit_price": 150.00,
        "total": 1500.00
      }
    ],
    "subtotal": 1500.00,
    "tax": 127.50,
    "total": 1627.50,
    "currency": "USD"
  },
  "confidence": 0.98
}`,

  convert: `// POST /v1/convert
// Convert documents between formats

const response = await fetch(
  'https://api.docunexus.com/v1/convert',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source_url: 'https://example.com/document.docx',
      output_format: 'pdf',
      options: {
        quality: 'high',
        preserve_hyperlinks: true,
        embed_fonts: true
      }
    })
  }
);

// Response
{
  "id": "conv_xyz789",
  "status": "completed",
  "output_url": "https://cdn.docunexus.com/...",
  "file_size": 245678,
  "pages": 12,
  "expires_at": "2024-01-16T12:00:00Z"
}`,

  merge: `// POST /v1/documents/merge
// Merge multiple PDFs into one

const response = await fetch(
  'https://api.docunexus.com/v1/documents/merge',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      documents: [
        { url: 'https://example.com/doc1.pdf' },
        { url: 'https://example.com/doc2.pdf', pages: '1-3' },
        { url: 'https://example.com/doc3.pdf', pages: '5,7,9' }
      ],
      options: {
        add_bookmarks: true,
        optimize_size: true
      }
    })
  }
);

// Response
{
  "id": "merge_def456",
  "status": "completed",
  "output_url": "https://cdn.docunexus.com/...",
  "total_pages": 15,
  "file_size": 1024567
}`,

  n8n: `// n8n Integration - Seamless Orchestration
// Trigger DocuNexus from n8n workflows

// Example: Invoice Processing Automation
// POST /v1/extract/invoice -> Salesforce -> Slack

{
  "workflow": "invoice_automation",
  "trigger": {
    "type": "webhook",
    "url": "https://your-n8n.com/webhook/abc123"
  },
  "steps": [
    {
      "name": "extract_invoice",
      "action": "docunexus.extract",
      "config": {
        "type": "invoice",
        "document": "{{ $json.document_url }}"
      }
    },
    {
      "name": "create_salesforce_record",
      "action": "salesforce.create",
      "config": {
        "object": "Invoice__c",
        "fields": {
          "Vendor__c": "{{ $json.extracted.vendor.name }}",
          "Amount__c": "{{ $json.extracted.total }}",
          "Due_Date__c": "{{ $json.extracted.due_date }}"
        }
      }
    },
    {
      "name": "notify_slack",
      "action": "slack.message",
      "config": {
        "channel": "#invoices",
        "message": "New invoice processed: \${{ $json.extracted.total }}"
      }
    }
  ]
}

// Webhook response from n8n
{
  "success": true,
  "salesforce_id": "a0B5g00000ABC123",
  "slack_ts": "1234567890.123456"
}`,

  salesforce: `// Salesforce Integration
// Sync extracted data directly to Salesforce

const response = await fetch(
  'https://api.docunexus.com/v1/integrations/salesforce/sync',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      extraction_id: 'ext_abc123',
      salesforce: {
        object: 'Invoice__c',
        mapping: {
          'Vendor__c': 'extracted.vendor.name',
          'Amount__c': 'extracted.total',
          'Invoice_Number__c': 'extracted.invoice_number',
          'PDF_URL__c': 'source_url'
        },
        upsert_key: 'Invoice_Number__c'
      }
    })
  }
);

// Response
{
  "success": true,
  "salesforce_id": "a0B5g00000ABC123",
  "operation": "created",
  "synced_at": "2024-01-15T10:30:00Z"
}`,

  webhooks: `// Webhooks - Real-time Event Notifications
// Receive updates when processing completes

// Register a webhook endpoint
const response = await fetch(
  'https://api.docunexus.com/v1/webhooks',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://your-app.com/webhooks/docunexus',
      events: [
        'extraction.completed',
        'conversion.completed',
        'extraction.failed'
      ],
      secret: 'whsec_your_signing_secret'
    })
  }
);

// Webhook payload you'll receive
{
  "id": "evt_123abc",
  "type": "extraction.completed",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "extraction_id": "ext_abc123",
    "status": "completed",
    "document_type": "invoice",
    "confidence": 0.98
  }
}

// Verify webhook signature
const crypto = require('crypto');
const signature = req.headers['x-docunexus-signature'];
const payload = JSON.stringify(req.body);
const expected = crypto
  .createHmac('sha256', 'whsec_your_signing_secret')
  .update(payload)
  .digest('hex');
  
const isValid = signature === expected;`,
};

const docContent: Record<string, { title: string; description: string }> = {
  introduction: {
    title: "Introduction",
    description:
      "Welcome to the DocuNexus API. Our REST API provides programmatic access to document intelligence, conversion, and management capabilities.",
  },
  authentication: {
    title: "Authentication",
    description:
      "All API requests require authentication using an API key. You can generate keys in your dashboard under Settings > API Keys.",
  },
  quickstart: {
    title: "Quick Start",
    description:
      "Get up and running with DocuNexus in minutes. This guide walks you through your first API call to extract data from a document.",
  },
  extract: {
    title: "Extract Data",
    description:
      "The extraction API uses AI to pull structured data from invoices, receipts, contracts, and other document types.",
  },
  convert: {
    title: "Convert Documents",
    description:
      "Convert between 50+ document formats including PDF, Word, Excel, images, and HTML with high-fidelity output.",
  },
  merge: {
    title: "Merge & Split",
    description:
      "Combine multiple documents or split large PDFs with page-level control and batch processing support.",
  },
  n8n: {
    title: "n8n Workflow Integration",
    description:
      "Orchestrate document workflows with n8n. This example shows an invoice processing pipeline that syncs to Salesforce and notifies via Slack.",
  },
  salesforce: {
    title: "Salesforce Integration",
    description:
      "Sync extracted document data directly to Salesforce objects with custom field mapping and upsert support.",
  },
  webhooks: {
    title: "Webhooks",
    description:
      "Receive real-time notifications when document processing completes or fails. Webhooks support signature verification for security.",
  },
};

function CodeBlock({ code, language = "javascript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-ink text-canvas rounded-lg p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded-md bg-foreground/10 text-canvas/60 hover:text-canvas opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

const Docs = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <Layout showFooter={false}>
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-secondary/30 p-6 overflow-y-auto">
          <nav className="space-y-6">
            {sidebarItems.map((category) => (
              <div key={category.category}>
                <h3 className="font-heading text-sm text-muted-foreground mb-2">
                  {category.category}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <ChevronRight
                          className={`w-3 h-3 transition-transform ${
                            activeSection === item.id ? "rotate-90" : ""
                          }`}
                        />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 lg:p-12">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <span>Docs</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">
                  {docContent[activeSection]?.title}
                </span>
              </div>

              {/* Content */}
              <h1 className="font-heading text-3xl md:text-4xl mb-4">
                {docContent[activeSection]?.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {docContent[activeSection]?.description}
              </p>

              {/* Code Example */}
              <div className="space-y-6">
                <h2 className="font-heading text-xl">Example</h2>
                <CodeBlock code={codeExamples[activeSection as keyof typeof codeExamples]} />
              </div>

              {/* Additional Info */}
              {activeSection === "n8n" && (
                <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                  <h3 className="font-heading text-lg mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Seamless Orchestration
                  </h3>
                  <p className="text-muted-foreground">
                    This example demonstrates a complete invoice automation
                    workflow: extracting data from invoices, creating Salesforce
                    records, and sending Slack notifications—all triggered by a
                    single webhook.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Docs;
