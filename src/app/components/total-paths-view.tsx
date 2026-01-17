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
import { ArrowLeft, Activity, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface PathStatus {
  path: string;
  status: "healthy" | "broken" | "checking";
  lastChecked: Date;
  httpStatus: number;
  jsErrors: number;
}

interface TotalPathsViewProps {
  onboardingData: OnboardingData;
  paths: PathStatus[];
  onBack: () => void;
  onViewPath: (path: string) => void;
}

export function TotalPathsView({ onboardingData, paths, onBack, onViewPath }: TotalPathsViewProps) {
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
      case "checking": return <Activity className="size-4 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Activity className="size-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">All Monitored Paths</h1>
              <p className="text-slate-600">
                {paths.length} pages monitored on {onboardingData.domain}
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Total Pages</span>
                <Activity className="size-4 text-slate-400" />
              </div>
              <div className="text-3xl font-bold">{paths.length}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Healthy</span>
                <CheckCircle2 className="size-4 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">
                {paths.filter(p => p.status === "healthy").length}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Broken</span>
                <AlertCircle className="size-4 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600">
                {paths.filter(p => p.status === "broken").length}
              </div>
            </Card>
          </div>

          {/* Paths Table */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">All Pages</h2>
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

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">About Path Monitoring</h3>
            <p className="text-sm text-slate-700">
              Each path is checked at your selected frequency ({onboardingData.frequency}). 
              We monitor HTTP response codes, page load success, and JavaScript console errors.
              Click any path to view detailed check history and error logs.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
