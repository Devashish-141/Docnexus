import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Mail, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-20 pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10 dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our enterprise solutions? We're here to help you transform your document workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 -mt-20 relative z-10 px-4">
        <div className="container-fluid max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left Column: Info & Context */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Info Card */}
              <Card className="border-none shadow-xl bg-gradient-to-br from-primary via-primary/90 to-indigo-700 text-primary-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 opacity-10 scale-150 translate-x-1/4 -translate-y-1/4">
                  <MessageSquare className="w-64 h-64" />
                </div>
                <CardContent className="p-8 md:p-10 relative z-10">
                  <h3 className="font-heading text-2xl mb-2">Contact Information</h3>
                  <p className="text-primary-foreground/80 mb-8">Reach out internally or via email.</p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-primary-foreground/70 mb-1">Email Us</p>
                        <a href="mailto:support@docunexus.com" className="text-xl font-heading hover:underline decoration-white/50 underline-offset-4">
                          support@docunexus.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/20">
                    <h4 className="font-medium mb-4">Why choose DocuNexus?</h4>
                    <ul className="space-y-3">
                      {[
                        "Enterprise-grade document security",
                        "99.9% API uptime guarantee",
                        "Dedicated support team",
                        "Custom integration assistance"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-primary-foreground/90">
                          <CheckCircle2 className="w-5 h-5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

            </motion.div>

            {/* Right Column: Interactive Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-2xl border-muted/40 h-full">
                <CardContent className="p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-secondary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-secondary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="e.g. Enterprise Plan Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-secondary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="min-h-[160px] resize-none bg-secondary/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending Message...</>
                      ) : (
                        <div className="flex items-center gap-2">
                          Send Message <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-fluid text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple visual placeholders for trust logos - purely aesthetic */}
            {["Acme Corp", "GlobalTech", "Nexus Systems", "FutureScale", "DataFlow"].map((brand) => (
              <div key={brand} className="text-xl font-heading font-bold">{brand}</div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
