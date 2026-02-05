import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Key,
  Link2,
  ShieldCheck,
  Menu,
  X,
  Copy,
  Plus,
  Check,
  TrendingUp,
  CreditCard,
  Activity,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { APIKeysTable } from "@/components/dashboard/APIKeysTable";
import { IntegrationCards } from "@/components/dashboard/IntegrationCards";
import { SecurityLogs } from "@/components/dashboard/SecurityLogs";
import { CreateKeyModal } from "@/components/dashboard/CreateKeyModal";

const sidebarItems = [
  { id: "overview", label: "Analytics Overview", icon: LayoutDashboard },
  { id: "api", label: "API Management", icon: Key },
  { id: "integrations", label: "Integration Hub", icon: Link2 },
  { id: "security", label: "Security Center", icon: ShieldCheck },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
];

const prepareChartData = (logs: any[]) => {
  if (!logs || !Array.isArray(logs)) return [];

  const days = 30;
  const data = [];
  const now = new Date();

  // Initialize last 30 days
  const dailyStats: Record<string, { credits: number, apiCalls: number }> = {};

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyStats[dateStr] = { credits: 0, apiCalls: 0 };
    data.push({ date: dateStr, credits: 0, apiCalls: 0 }); // Preserve order
  }

  // Aggregate logs
  logs.forEach(log => {
    const d = new Date(log.timestamp);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (dailyStats[dateStr]) {
      dailyStats[dateStr].credits += (log.cost || 0);
      dailyStats[dateStr].apiCalls += 1;
    }
  });

  // Map back to array
  return data.map(day => ({
    ...day,
    credits: dailyStats[day.date].credits,
    apiCalls: dailyStats[day.date].apiCalls
  }));
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [autoExpiry, setAutoExpiry] = useState(true);
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { token, user, isAuthenticated, logout } = useAuth(); // Custom Auth
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data (protected)
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !token) return;

      try {
        // Token is already available from context
        // const token = await getToken();
        // console.log("Sending token:", token); // Debug

        const res = await fetch('/api/get-dashboard-data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch");
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        toast({
          title: "Error fetching data",
          description: "Could not load dashboard data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, toast]);



  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
              >
                <Card className="hover:shadow-elevated-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Used Credits</p>
                        <p className="font-heading text-3xl text-foreground">
                          {isLoading ? "..." : (dashboardData?.user?.credits || "0")}
                        </p>
                        <p className="text-sm mt-1 text-muted-foreground">
                          Available Balance
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-indigo-light flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="hover:shadow-elevated-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Company</p>
                        <p className="font-heading text-3xl text-foreground">
                          {isLoading ? "..." : (dashboardData?.user?.company || "N/A")}
                        </p>
                        <p className="text-sm mt-1 text-accent">Example Co.</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-indigo-light flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Usage Velocity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Usage Velocity
                </CardTitle>
                <CardDescription>Credit consumption over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardChart data={dashboardData ? prepareChartData(dashboardData.usageLogs) : []} />
              </CardContent>
            </Card>
          </motion.div>
        );

      case "api":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-heading text-2xl text-foreground">API Keys</h2>
                <p className="text-muted-foreground text-sm">Manage your API access tokens</p>
              </div>
            </div>
            <APIKeysTable apiKey={dashboardData?.user?.apiKey} />
          </motion.div>
        );

      case "integrations":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl text-foreground">Integration Hub</h2>
              <p className="text-muted-foreground text-sm">Connect your favorite tools and services</p>
            </div>
            <IntegrationCards />
          </motion.div>
        );

      case "security":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl text-foreground">Security Center</h2>
              <p className="text-muted-foreground text-sm">Monitor and configure security settings</p>
            </div>

            {/* Auto-Expiry Toggle */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto-Expiry (60 min)</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically expire download links after 60 minutes
                    </p>
                  </div>
                  <Switch
                    checked={autoExpiry}
                    onCheckedChange={(checked) => {
                      setAutoExpiry(checked);
                      toast({
                        title: checked ? "Auto-expiry enabled" : "Auto-expiry disabled",
                        description: checked
                          ? "Links will now expire after 60 minutes"
                          : "Links will remain active indefinitely",
                      });
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Logs */}
            <SecurityLogs />
          </motion.div>
        );

      case "billing":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-2xl text-foreground">Billing & Plans</h2>
              <p className="text-muted-foreground text-sm">Manage your subscription and usage</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Free Trial plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-heading text-foreground">Free Trial</span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">Active</span>
                    </div>
                    <p className="text-muted-foreground mt-1">Expires in 14 days</p>
                  </div>
                  <Button onClick={() => setShowWaitlist(true)} className="w-full sm:w-auto">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <CreditCard className="w-5 h-5" />
                    <span>No payment method added</span>
                  </div>
                  <Button variant="outline" onClick={() => setShowWaitlist(true)}>Add Card</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card fixed left-0 top-0 bottom-0">
        <div className="p-6 border-b">
          <h1 className="font-heading text-xl text-foreground">DocuNexus</h1>
          <p className="text-sm text-muted-foreground">Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === item.id
                ? 'bg-indigo-light text-primary font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/solutions">← Back to Services</Link>
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 safe-area-pb">
        <div className="flex justify-around py-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-h-[56px] ${activeSection === item.id
                ? 'text-primary'
                : 'text-muted-foreground'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-40">
          <div>
            <h1 className="font-heading text-lg text-foreground">DocuNexus</h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <X className="w-5 h-5" />
            </Link>
          </Button>
        </header>

        <div className="p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl text-foreground">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h1>
          </div>

          {renderContent()}
        </div>
      </main>

      {/* Create Key Modal */}
      <CreateKeyModal
        open={isCreateKeyModalOpen}
        onOpenChange={setIsCreateKeyModalOpen}
      />

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlist} onOpenChange={setShowWaitlist}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Polishing Our Experience</DialogTitle>
            <DialogDescription className="pt-2">
              We are currently polishing our checkout experience to ensure the highest level of security for your transactions. Drop your email below, and we’ll notify you the moment we go live.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus
            />
            <Button
              onClick={() => {
                toast({
                  title: "You're on the list!",
                  description: "We'll notify you as soon as we're live."
                });
                setShowWaitlist(false);
              }}
            >
              Notify Me
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
