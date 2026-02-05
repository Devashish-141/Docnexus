import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const securityLogs = [
  {
    id: 1,
    type: "success",
    message: "API key dk_live_...h8 authenticated successfully",
    timestamp: "2 minutes ago",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    type: "warning",
    message: "Rate limit threshold reached (80%)",
    timestamp: "15 minutes ago",
    ip: "192.168.1.1",
  },
  {
    id: 3,
    type: "success",
    message: "New API key created: Production Key",
    timestamp: "1 hour ago",
    ip: "192.168.1.1",
  },
  {
    id: 4,
    type: "info",
    message: "Auto-expiry triggered for link #4521",
    timestamp: "2 hours ago",
    ip: "System",
  },
  {
    id: 5,
    type: "success",
    message: "Salesforce integration authenticated",
    timestamp: "3 hours ago",
    ip: "192.168.1.1",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-accent" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case "info":
      return <Clock className="w-4 h-4 text-primary" />;
    default:
      return <Shield className="w-4 h-4 text-muted-foreground" />;
  }
};

export function SecurityLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Recent Security Events
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {securityLogs.map((log) => (
            <div key={log.id} className="px-6 py-4 hover:bg-secondary/20 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(log.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.message}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    <span className="text-xs text-muted-foreground">IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
