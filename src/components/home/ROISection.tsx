import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  duration?: number;
}

function AnimatedStat({ value, suffix, label, prefix = "", duration = 2 }: StatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div className="text-center">
      <div className="stat-number text-accent mb-2">
        {prefix}{count}{suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

const stats = [
  { value: 80, suffix: "%", label: "Reduction in Manual Data Entry", prefix: "" },
  { value: 3.5, suffix: "x", label: "Faster Document Processing", prefix: "" },
  { value: 100, suffix: "+", label: "Native Integrations", prefix: "" },
  { value: 99.9, suffix: "%", label: "Uptime SLA", prefix: "" },
];

export function ROISection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container-fluid">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedStat {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-heading text-2xl md:text-3xl text-center mb-8">
            The DocuNexus Advantage
          </h3>
          
          <div className="bg-card rounded-xl border overflow-hidden shadow-elevated">
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 font-medium text-sm">
              <div>Metric</div>
              <div className="text-center">Before</div>
              <div className="text-center text-accent">With DocuNexus</div>
            </div>
            
            {[
              { metric: "Cost per Invoice", before: "$12.00", after: "$0.45" },
              { metric: "Processing Time", before: "15 minutes", after: "30 seconds" },
              { metric: "Error Rate", before: "4.2%", after: "0.1%" },
              { metric: "Manual Review", before: "100%", after: "1%" },
            ].map((row, index) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index !== 3 ? "border-b" : ""
                }`}
              >
                <div className="text-muted-foreground">{row.metric}</div>
                <div className="text-center line-through opacity-60">{row.before}</div>
                <div className="text-center font-medium text-accent">{row.after}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
