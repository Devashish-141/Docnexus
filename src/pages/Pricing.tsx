import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Check, Sparkles, Zap, Shield, Lock, Clock, Server, Mail, Loader2, ArrowRight, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricingTiers = [
  {
    name: "Basic",
    id: "basic",
    monthlyPrice: 14.99,
    annualPrice: 13.99,
    credits: 16500,
    badge: null,
    highlight: false,
    description: "Perfect for individuals starting out."
  },
  {
    name: "Personal",
    id: "personal",
    monthlyPrice: 29.99,
    annualPrice: 27.49,
    credits: 37000,
    badge: null,
    highlight: false,
    description: "Ideal for freelancers and professionals."
  },
  {
    name: "Business",
    id: "business",
    monthlyPrice: 54.99,
    annualPrice: 49.99,
    credits: 80500,
    badge: "Best Value",
    highlight: true,
    description: "For growing teams needing power."
  },
];

const features = [
  { icon: Clock, label: "60-min link expiry" },
  { icon: Server, label: "Full API access" },
  { icon: Zap, label: "Unlimited output" },
  { icon: Shield, label: "Secured data" },
  { icon: Lock, label: "Advanced security" },
  { icon: Mail, label: "Priority Support" },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [docExtractions, setDocExtractions] = useState([500]);
  const [apiCalls, setApiCalls] = useState([100000]);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const isEnterprise = docExtractions[0] > 2000;

  const calculateCredits = useMemo(() => {
    // 1 document = 300 credits, API calls at 0.5 credits each
    return docExtractions[0] * 300 + apiCalls[0] * 0.5;
  }, [docExtractions, apiCalls]);

  const recommendedTier = useMemo(() => {
    const needed = calculateCredits;
    for (let i = 0; i < pricingTiers.length; i++) {
      if (pricingTiers[i].credits >= needed) {
        return pricingTiers[i].name;
      }
    }
    return pricingTiers[pricingTiers.length - 1].name;
  }, [calculateCredits]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const handleGetStarted = (tier: typeof pricingTiers[0]) => {
    setLoadingTier(tier.name);

    setTimeout(() => {
      let planParam = tier.id;
      let extraParams = "";

      // Logic: Business tier gets high priority
      if (["business"].includes(tier.id)) {
        planParam = "business";
        extraParams = "&priority=high&tier=" + tier.id;
      } else {
        // Basic & Personal
        extraParams = "&tier=" + tier.id;
      }

      navigate(`/auth?mode=signup&plan=${planParam}${extraParams}`);
      setLoadingTier(null);
    }, 800);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10 dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="absolute top-0 center -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="container-fluid text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Flexible Plans</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Choose the plan that best fits your scale. No hidden fees. Upgrade or cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-16">
              <div className="relative flex items-center bg-secondary/30 p-1 rounded-full border border-border/50 backdrop-blur-sm">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${!isAnnual ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Monthly
                  {!isAnnual && <motion.div layoutId="pill" className="absolute inset-0 bg-background rounded-full shadow-sm border border-border -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${isAnnual ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Annual <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded ml-1 animate-pulse">-20%</span>
                  {isAnnual && <motion.div layoutId="pill" className="absolute inset-0 bg-background rounded-full shadow-sm border border-border -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="-mt-12 md:-mt-20 pb-20 relative z-20 px-4">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => {
              const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
              const isRecommended = tier.badge === "Best Value";

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`relative h-full flex flex-col overflow-visible bg-card border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isRecommended
                        ? 'border-primary shadow-lg ring-1 ring-primary/20 bg-gradient-to-b from-card to-primary/5'
                        : 'border-border/50 hover:border-border'
                      }`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                        <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {tier.badge}
                        </div>
                      </div>
                    )}

                    <CardHeader className="text-center pt-8 pb-4 border-b border-border/50 bg-secondary/10">
                      <CardTitle className="text-2xl font-heading mb-2">{tier.name}</CardTitle>
                      <CardDescription className="text-sm">{tier.description}</CardDescription>
                      <div className="mt-6 mb-2">
                        <span className="text-4xl font-bold font-heading text-foreground">${price.toFixed(2)}</span>
                        <span className="text-muted-foreground">/mo</span>
                      </div>
                      {isAnnual && <div className="text-xs text-muted-foreground font-medium">Billed annually</div>}
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col pt-6 p-6">
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center justify-between text-sm font-medium p-3 bg-secondary/30 rounded-lg border border-border/50">
                          <div className="flex items-center gap-2 text-foreground">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Credits/mo</span>
                          </div>
                          <span className="font-bold">{formatNumber(tier.credits)}</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8 flex-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Includes:</p>
                        <ul className="space-y-3">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                              <div className={`p-0.5 rounded-full ${isRecommended ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                                <Check className="w-3 h-3" />
                              </div>
                              {feature.label}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => handleGetStarted(tier)}
                        disabled={!!loadingTier}
                        className={`w-full py-6 font-semibold shadow-lg transition-transform active:scale-95 ${isRecommended
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50'
                          }`}
                      >
                        {loadingTier === tier.name ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Get Started"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credit Calculator */}
      <section className="py-20 bg-secondary/20">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-none shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-5 h-full">
                {/* Dark Sidebar */}
                <div className="md:col-span-2 bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl mb-4 text-white">Credit <br />Calculator</h3>
                    <p className="text-slate-300 text-sm">Adjust the sliders to estimate your monthly usage and find the perfect plan for your business.</p>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <HelpCircle className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Tip</span>
                    </div>
                    <p className="text-xs text-slate-400">API usage costs significantly less credits than full document extractions.</p>
                  </div>
                </div>

                {/* Calculator Content */}
                <div className="md:col-span-3 p-8 md:p-10 bg-card">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-foreground">Document Extractions</label>
                        <span className="text-lg font-bold text-primary tabular-nums">{formatNumber(docExtractions[0])}</span>
                      </div>
                      <Slider
                        value={docExtractions}
                        onValueChange={setDocExtractions}
                        max={5000}
                        min={1}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>5k+</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-foreground">API Calls</label>
                        <span className="text-lg font-bold text-primary tabular-nums">{formatNumber(apiCalls[0])}</span>
                      </div>
                      <Slider
                        value={apiCalls}
                        onValueChange={setApiCalls}
                        max={1000000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>1M+</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-border">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isEnterprise ? "enterprise" : "standard"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-between items-center"
                      >
                        {isEnterprise ? (
                          <div className="w-full text-center py-2">
                            <p className="text-lg font-bold text-foreground mb-2">High Volume Detected</p>
                            <Button variant="outline" className="gap-2 w-full">Contact Support <ArrowRight className="w-4 h-4" /></Button>
                          </div>
                        ) : (
                          <>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase">Estimated Usage</p>
                              <p className="text-2xl font-bold font-heading text-foreground">{formatNumber(calculateCredits)} <span className="text-sm font-normal text-muted-foreground">Credits</span></p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-muted-foreground uppercase">Recommended</p>
                              <p className="text-xl font-bold text-primary">{recommendedTier}</p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 text-center">
        <div className="container-fluid">
          <h2 className="font-heading text-3xl mb-12">Security provided by industry leaders</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Reuse simple text placeholders or icons if available */}
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> SecureCorp</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Lock className="w-6 h-6" /> EncryptKey</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Server className="w-6 h-6" /> CloudSafe</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
