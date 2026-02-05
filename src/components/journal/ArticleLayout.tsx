import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ArticleLayoutProps {
    children: React.ReactNode;
    title: string;
    category?: string;
    toc?: { id: string; label: string }[];
}

export function ArticleLayout({ children, title, category = "Engineering", toc = [] }: ArticleLayoutProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -35% 0px" }
        );

        toc.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [toc]);

    return (
        <Layout>
            <div className="pt-24 pb-16 md:pt-32">
                {/* Simple Header */}
                <div className="container-fluid max-w-4xl mx-auto mb-16 text-center">
                    <span className="text-primary font-medium tracking-wide text-sm uppercase mb-4 block">{category}</span>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">{title}</h1>
                </div>

                <div className="container-fluid">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sticky TOC (Desktop) */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-4">
                                <h4 className="font-heading text-lg mb-4">Table of Contents</h4>
                                <nav className="space-y-2">
                                    {toc.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={`block text-sm transition-colors duration-200 border-l-2 pl-4 py-1 ${activeId === item.id
                                                    ? "border-primary text-primary font-medium"
                                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 lg:col-start-4 prose prose-lg prose-slate dark:prose-invert max-w-none">
                            {children}
                        </div>

                    </div>
                </div>

                {/* Post-Article CTA */}
                <div className="container-fluid max-w-4xl mx-auto mt-24 mb-12">
                    <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/10">
                        <h3 className="font-heading text-3xl mb-4">Ready to optimize your document flow?</h3>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Join 1000+ enterprises using DocuNexus to transform their document infrastructure.
                        </p>
                        <div className="flex justify-center">
                            <Link to="/auth?mode=signup">
                                <Button size="lg" className="group">
                                    Start Your Free Trial
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
