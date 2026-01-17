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
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface PathStatus {
  path: string;
  status: "healthy" | "broken" | "checking";
  lastChecked: Date;
  httpStatus: number;
  jsErrors: number;
}

interface HealthyPathsViewProps {
  onboardingData: OnboardingData;
  paths: PathStatus[];
  onBack: () => void;
  onViewPath: (path: string) => void;
}

export function HealthyPathsView({ onboardingData, paths, onBack, onViewPath }: HealthyPathsViewProps) {
  const healthyPaths = paths.filter(p => p.status === "healthy");

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
            <CheckCircle2 className="size-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold">Healthy Paths</h1>
              <p className="text-slate-600">
                {healthyPaths.length} of {paths.length} pages are healthy on {onboardingData.domain}
              </p>
            </div>
          </div>

          {/* Summary Card */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="size-12 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {healthyPaths.length} Healthy Pages
                </div>
                <p className="text-sm text-green-700">
                  All pages are loading correctly with HTTP 200 status and no JavaScript errors.
                </p>
              </div>
            </div>
          </Card>

          {/* Paths Table */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Healthy Pages</h2>
              <p className="text-sm text-slate-600">Pages with HTTP 200 and no errors</p>
            </div>

            {healthyPaths.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>HTTP Code</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthyPaths.map((pathData, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => onViewPath(pathData.path)}
                    >
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-green-600" />
                          {pathData.path}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-50 text-green-600">
                          200 OK
                        </Badge>
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
                <CheckCircle2 className="size-12 mx-auto mb-4 text-slate-300" />
                <p>No healthy pages found</p>
              </div>
            )}
          </Card>

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">What Makes a Page Healthy?</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• HTTP response is 200</li>
              <li>• Page loads successfully without timeouts</li>
              <li>• No JavaScript console errors detected</li>
              <li>• Passing all health checks for at least the last check</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
