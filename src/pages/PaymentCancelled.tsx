import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <Card className="border-2 border-muted shadow-xl">
                        <CardHeader className="text-center pb-6 pt-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex justify-center mb-6"
                            >
                                <div className="relative">
                                    <XCircle className="w-20 h-20 text-muted-foreground" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <CardTitle className="text-3xl md:text-4xl font-heading mb-3">
                                Payment Cancelled
                            </CardTitle>
                            <CardDescription className="text-base md:text-lg">
                                Your payment was not completed
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6 pb-10">
                            <div className="bg-secondary/30 rounded-lg p-6">
                                <p className="text-center text-muted-foreground">
                                    Don't worry! No charges were made to your account.
                                    You can try again whenever you're ready.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                                    <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Changed your mind?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Take your time to review our pricing plans and features. We're here when you're ready!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                                    <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Need assistance?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Our team is here to help answer any questions about our plans or features.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <Button
                                    onClick={() => navigate("/pricing")}
                                    className="w-full py-6 text-lg"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Pricing
                                </Button>

                                <Button
                                    onClick={() => navigate("/contact")}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Contact Support
                                </Button>

                                <Button
                                    onClick={() => navigate("/")}
                                    variant="ghost"
                                    className="w-full"
                                >
                                    Return to Home
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-border">
                                <p className="text-xs text-muted-foreground">
                                    Questions? Email us at{" "}
                                    <a href="mailto:support@docunexus.com" className="text-primary hover:underline">
                                        support@docunexus.com
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </Layout>
    );
};

export default PaymentCancelled;
