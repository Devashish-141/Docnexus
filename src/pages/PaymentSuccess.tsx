import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Mail, FileText, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Get email from URL params if provided by PayPal
        const emailParam = searchParams.get("email") || searchParams.get("payer_email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <Card className="border-2 border-primary/20 shadow-2xl">
                        <CardHeader className="text-center pb-6 pt-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex justify-center mb-6"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                    <CheckCircle2 className="w-20 h-20 text-primary relative" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <CardTitle className="text-3xl md:text-4xl font-heading mb-3">
                                Payment Successful! 🎉
                            </CardTitle>
                            <CardDescription className="text-base md:text-lg">
                                Thank you for subscribing to DocuNexus
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6 pb-10">
                            <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Email Confirmation</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {email
                                                ? `A confirmation email has been sent to ${email}`
                                                : "A confirmation email has been sent to your PayPal email address"
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Account Setup</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Please check your email for instructions to set up your DocuNexus account and access your credits.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-1">What's Next?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Create your account using the link in your email to start using your credits and accessing our API.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <Button
                                    onClick={() => navigate("/auth")}
                                    className="w-full py-6 text-lg"
                                    size="lg"
                                >
                                    Create Your Account
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>

                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Return to Home
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-border">
                                <p className="text-xs text-muted-foreground">
                                    Need help? Contact us at{" "}
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

export default PaymentSuccess;
