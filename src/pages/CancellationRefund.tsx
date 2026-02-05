import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const CancellationRefund = () => {
    return (
        <Layout>
            <div className="container-fluid py-24 md:py-32 max-w-4xl">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                    Cancellation & Refund Policy
                </h1>
                <p className="text-muted-foreground mb-12">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Cancellation Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You may cancel your subscription at any time through your account settings or by contacting our support team.
                            Upon cancellation, your subscription will remain active until the end of the current billing period.
                            We do not charge cancellation fees.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Refund Policy</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Subscriptions:</strong> Use of our services is generally non-refundable. However, if you are not satisfied with our service within the first 7 days of your initial subscription, you may request a full refund.
                            </li>
                            <li>
                                <strong>One-time purchases:</strong> API credits or other one-time purchases are non-refundable once used. Unused credits may be refunded within 14 days of purchase upon request.
                            </li>
                            <li>
                                <strong>Technical Issues:</strong> If you experience technical issues preventing you from using the service, please contact support. If we are unable to resolve the issue within a reasonable timeframe, a pro-rated refund may be issued.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Processing of Refunds</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Refund requests are processed within 5-10 business days. Refunds will be issued to the original payment method used for the purchase. Depending on your bank, it may take additional time for the funds to appear in your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about our Cancellation and Refund Policy, please contact us at support@docunexus.com.
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default CancellationRefund;
