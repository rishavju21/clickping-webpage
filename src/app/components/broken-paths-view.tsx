import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/components/ui/table";
import { ArrowLeft, AlertCircle, ChevronRight, Bell } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface PathStatus {
  path: string;
  status: "healthy" | "broken" | "checking";
  lastChecked: Date;
  httpStatus: number;
  jsErrors: number;
  errorMessage?: string;
}

interface BrokenPathsViewProps {
  onboardingData: OnboardingData;
  paths: PathStatus[];
  onBack: () => void;
  onViewPath: (path: string) => void;
}

export function BrokenPathsView({ onboardingData, paths, onBack, onViewPath }: BrokenPathsViewProps) {
  const brokenPaths = paths.filter(p => p.status === "broken");

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
            <AlertCircle className="size-8 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold">Broken Paths</h1>
              <p className="text-slate-600">
                {brokenPaths.length} of {paths.length} pages need attention on {onboardingData.domain}
              </p>
            </div>
          </div>

          {/* Alert Banner */}
          {brokenPaths.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="size-4 text-red-600" />
              <AlertDescription className="text-red-900">
                <strong>{brokenPaths.length} {brokenPaths.length === 1 ? "page is" : "pages are"} currently broken.</strong> 
                {" "}Email alerts have been sent to {onboardingData.email}.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Card */}
          {brokenPaths.length > 0 && (
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-center gap-4">
                <AlertCircle className="size-12 text-red-600" />
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-900 mb-1">
                    {brokenPaths.length} Broken Pages
                  </div>
                  <p className="text-sm text-red-700">
                    Pages with HTTP errors (404, 500) or JavaScript console errors detected.
                  </p>
                </div>
                <Bell className="size-8 text-red-600" />
              </div>
            </Card>
          )}

          {/* Paths Table */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Broken Pages</h2>
              <p className="text-sm text-slate-600">Pages that failed recent health checks</p>
            </div>

            {brokenPaths.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>HTTP Code</TableHead>
                    <TableHead>JS Errors</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brokenPaths.map((pathData, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => onViewPath(pathData.path)}
                    >
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="size-4 text-red-600" />
                          {pathData.path}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-red-600">
                          {pathData.errorMessage || "Unknown error"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-50 text-red-600">
                          {pathData.httpStatus}
                        </Badge>
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
            ) : (
              <div className="p-12 text-center text-slate-500">
                <AlertCircle className="size-12 mx-auto mb-4 text-slate-300" />
                <p className="font-medium mb-1">No broken pages!</p>
                <p className="text-sm">All pages are healthy</p>
              </div>
            )}
          </Card>

          {/* Email Preview */}
          {brokenPaths.length > 0 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="size-5" />
                Alert Email Preview
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg border text-sm font-mono">
                <div className="mb-3">
                  <strong>Subject:</strong> [PathGuard] {brokenPaths.length} page{brokenPaths.length > 1 ? "s" : ""} broken on {onboardingData.domain}
                </div>
                <div className="mb-3">
                  <strong>To:</strong> {onboardingData.email}
                </div>
                <div className="border-t pt-3 mt-3 space-y-2">
                  <p>The following pages are broken:</p>
                  {brokenPaths.map((p, i) => (
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

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">How We Detect Broken Pages</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• HTTP 404 (Page Not Found) or 500 (Server Error) responses</li>
              <li>• Network failures or timeout errors</li>
              <li>• Page fails to load completely</li>
              <li>• Uncaught JavaScript errors in console</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
