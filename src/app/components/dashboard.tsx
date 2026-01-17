import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/components/ui/table";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Settings, 
  Bell,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface PathStatus {
  path: string;
  status: "healthy" | "broken" | "checking";
  lastChecked: Date;
  httpStatus: number;
  jsErrors: number;
  errorMessage?: string;
}

interface DashboardProps {
  onboardingData: OnboardingData;
  onViewPath: (path: string) => void;
  onSettings: () => void;
  onViewTotalPaths: () => void;
  onViewHealthyPaths: () => void;
  onViewBrokenPaths: () => void;
  onViewFrequency: () => void;
}

export function Dashboard({ 
  onboardingData, 
  onViewPath, 
  onSettings,
  onViewTotalPaths,
  onViewHealthyPaths,
  onViewBrokenPaths,
  onViewFrequency
}: DashboardProps) {
  // Generate mock data for paths
  const [paths] = useState<PathStatus[]>(() => {
    return onboardingData.paths.map((path, index) => {
      const isHealthy = Math.random() > 0.2; // 80% healthy
      const hasBrokenStatus = !isHealthy && Math.random() > 0.5;
      const hasJsError = !isHealthy && !hasBrokenStatus;
      
      return {
        path,
        status: isHealthy ? "healthy" : "broken",
        lastChecked: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
        httpStatus: hasBrokenStatus ? (Math.random() > 0.5 ? 404 : 500) : 200,
        jsErrors: hasJsError ? Math.floor(Math.random() * 3) + 1 : 0,
        errorMessage: hasBrokenStatus 
          ? `HTTP ${hasBrokenStatus ? (Math.random() > 0.5 ? 404 : 500) : 200} Error`
          : hasJsError 
          ? `${Math.floor(Math.random() * 3) + 1} JavaScript error(s)`
          : undefined
      };
    });
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const healthyCount = paths.filter(p => p.status === "healthy").length;
  const brokenCount = paths.filter(p => p.status === "broken").length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getStatusColor = (status: PathStatus["status"]) => {
    switch (status) {
      case "healthy": return "text-green-600 bg-green-50";
      case "broken": return "text-red-600 bg-red-50";
      case "checking": return "text-blue-600 bg-blue-50";
    }
  };

  const getStatusIcon = (status: PathStatus["status"]) => {
    switch (status) {
      case "healthy": return <CheckCircle2 className="size-4" />;
      case "broken": return <AlertCircle className="size-4" />;
      case "checking": return <RefreshCw className="size-4 animate-spin" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "free": return "bg-slate-600";
      case "starter": return "bg-blue-600";
      case "growth": return "bg-purple-600";
      default: return "bg-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="size-6 text-blue-600" />
            <div>
              <h1 className="font-semibold text-lg">PathGuard</h1>
              <p className="text-xs text-slate-600">{onboardingData.domain}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getPlanBadgeColor(onboardingData.plan)}>
              {onboardingData.plan.charAt(0).toUpperCase() + onboardingData.plan.slice(1)} Plan
            </Badge>
            <Button variant="outline" size="sm" onClick={onSettings}>
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Pages</span>
              <Activity className="size-4 text-slate-400" />
            </div>
            <div className="text-3xl font-bold">{paths.length}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewTotalPaths}
            >
              View
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Healthy</span>
              <CheckCircle2 className="size-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{healthyCount}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewHealthyPaths}
            >
              View
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Broken</span>
              <AlertCircle className="size-4 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600">{brokenCount}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewBrokenPaths}
            >
              View
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Frequency</span>
              <Clock className="size-4 text-slate-400" />
            </div>
            <div className="text-lg font-semibold">{onboardingData.frequency}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewFrequency}
            >
              View
            </Button>
          </Card>
        </div>

        {/* Broken Pages Alert */}
        {brokenCount > 0 && (
          <Card className="p-6 mb-6 border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">
                  {brokenCount} {brokenCount === 1 ? "Page" : "Pages"} Need Attention
                </h3>
                <p className="text-sm text-red-700">
                  Some pages are currently broken. Email alerts have been sent to {onboardingData.email}.
                </p>
              </div>
              <Bell className="size-5 text-red-600" />
            </div>
          </Card>
        )}

        {/* Paths Table */}
        <Card>
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Monitored Pages</h2>
              <p className="text-sm text-slate-600">
                Last check: {formatTimestamp(new Date(Date.now() - 300000))}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`size-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>HTTP Code</TableHead>
                <TableHead>JS Errors</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paths.map((pathData, index) => (
                <TableRow 
                  key={index}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => onViewPath(pathData.path)}
                >
                  <TableCell className="font-mono text-sm">
                    {pathData.path}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pathData.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(pathData.status)}
                        {pathData.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={pathData.httpStatus === 200 ? "text-green-600" : "text-red-600"}>
                      {pathData.httpStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    {pathData.jsErrors > 0 ? (
                      <span className="text-red-600 font-medium">{pathData.jsErrors}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {formatTimestamp(pathData.lastChecked)}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="size-4 text-slate-400" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Email Alert Example */}
        {brokenCount > 0 && (
          <Card className="mt-8 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell className="size-5" />
              Latest Alert Email
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border text-sm font-mono">
              <div className="mb-3">
                <strong>Subject:</strong> [PathGuard] {brokenCount} page{brokenCount > 1 ? "s" : ""} broken on {onboardingData.domain}
              </div>
              <div className="mb-3">
                <strong>To:</strong> {onboardingData.email}
              </div>
              <div className="border-t pt-3 mt-3 space-y-2">
                <p>The following pages are broken:</p>
                {paths
                  .filter(p => p.status === "broken")
                  .map((p, i) => (
                    <div key={i} className="text-red-600">
                      • {p.path} – {p.errorMessage}
                    </div>
                  ))}
                <p className="mt-4 text-slate-600">
                  Checked at: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}