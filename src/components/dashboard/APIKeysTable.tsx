import { useState } from "react";
import { Copy, Plus, RefreshCw, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface APIKeysTableProps {
  apiKey?: string;
}

export function APIKeysTable({ apiKey }: APIKeysTableProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateKey = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/generate-api-key', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: "API Key Generated" });
        window.location.reload(); // Simple reload to refresh data
      } else {
        throw new Error(data.error);
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key</CardTitle>
        <CardDescription>You are limited to one active API key.</CardDescription>
      </CardHeader>
      <CardContent>
        {apiKey ? (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-secondary/50 p-3 rounded-md font-mono text-sm truncate">
              {apiKey}
            </div>
            <Button size="icon" variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button size="icon" variant="destructive" onClick={generateKey} disabled={loading} title="Regenerate Key">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">You haven't generated an API key yet.</p>
            <Button onClick={generateKey} disabled={loading}>
              {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Generate API Key
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
