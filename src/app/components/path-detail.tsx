import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, AlertCircle, CheckCircle2, Clock, Code, XCircle } from "lucide-react";

interface PathDetailProps {
  path: string;
  domain: string;
  onBack: () => void;
}

export function PathDetail({ path, domain, onBack }: PathDetailProps) {
  // Mock check history
  const checkHistory = Array.from({ length: 10 }, (_, i) => {
    const isHealthy = Math.random() > 0.3;
    return {
      timestamp: new Date(Date.now() - i * 1800000), // Every 30 minutes
      status: isHealthy ? "healthy" : "broken",
      httpStatus: isHealthy ? 200 : (Math.random() > 0.5 ? 404 : 500),
      jsErrors: isHealthy ? 0 : Math.floor(Math.random() * 3) + 1,
      duration: Math.floor(Math.random() * 1000) + 200 // 200-1200ms
    };
  });

  // Mock JS errors (only if page is currently broken)
  const currentStatus = checkHistory[0];
  const jsErrors = currentStatus.jsErrors > 0 ? [
    {
      message: "Uncaught TypeError: Cannot read property 'map' of undefined",
      stack: `at Component.render (app.js:245:12)
at renderComponent (react-dom.js:1234:45)
at updateComponent (react-dom.js:2345:23)`,
      timestamp: currentStatus.timestamp,
      lineNumber: 245,
      columnNumber: 12,
      file: "app.js"
    },
    {
      message: "Network request failed: GET /api/data",
      stack: `at fetch (fetch.js:89:10)
at getData (api.js:34:15)
at async loadData (component.js:56:20)`,
      timestamp: currentStatus.timestamp,
      lineNumber: 89,
      columnNumber: 10,
      file: "fetch.js"
    }
  ].slice(0, currentStatus.jsErrors) : [];

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    return status === "healthy" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              {currentStatus.status === "healthy" ? (
                <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="size-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">{path}</h1>
                <p className="text-slate-600">
                  https://{domain}{path}
                </p>
              </div>
            </div>
            <Badge className={currentStatus.status === "healthy" ? "bg-green-600" : "bg-red-600"}>
              {currentStatus.status === "healthy" ? "Healthy" : "Broken"}
            </Badge>
          </div>

          {/* Current Status Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Current Status</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">HTTP Status</p>
                <p className={`text-2xl font-bold ${getStatusColor(currentStatus.status)}`}>
                  {currentStatus.httpStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">JS Errors</p>
                <p className={`text-2xl font-bold ${currentStatus.jsErrors > 0 ? "text-red-600" : "text-green-600"}`}>
                  {currentStatus.jsErrors}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Load Time</p>
                <p className="text-2xl font-bold">{currentStatus.duration}ms</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Last Checked</p>
                <p className="text-sm font-medium">{formatTimestamp(currentStatus.timestamp)}</p>
              </div>
            </div>
          </Card>

          {/* JavaScript Errors */}
          {jsErrors.length > 0 && (
            <Card className="p-6 border-red-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="size-5 text-red-600" />
                JavaScript Errors ({jsErrors.length})
              </h2>
              <div className="space-y-4">
                {jsErrors.map((error, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-slate-50">
                    <div className="flex items-start gap-3 mb-3">
                      <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-900 mb-1">{error.message}</p>
                        <p className="text-xs text-slate-600">
                          at {error.file}:{error.lineNumber}:{error.columnNumber}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {formatTimestamp(error.timestamp)}
                      </Badge>
                    </div>
                    <div className="bg-slate-900 text-slate-100 p-3 rounded font-mono text-xs overflow-x-auto">
                      <pre>{error.stack}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Check History */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="size-5" />
              Check History
            </h2>
            <div className="space-y-2">
              {checkHistory.map((check, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    {check.status === "healthy" ? (
                      <CheckCircle2 className="size-4 text-green-600" />
                    ) : (
                      <AlertCircle className="size-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {formatTimestamp(check.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className={getStatusColor(check.status)}>
                      HTTP {check.httpStatus}
                    </span>
                    {check.jsErrors > 0 ? (
                      <span className="text-red-600">
                        {check.jsErrors} JS error{check.jsErrors > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-slate-400">No errors</span>
                    )}
                    <span className="text-slate-600">
                      {check.duration}ms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monitoring Info */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">How Monitoring Works</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• We open this page in a headless browser at your selected frequency</li>
              <li>• HTTP status codes are captured (200, 404, 500, etc.)</li>
              <li>• JavaScript console errors are detected in real-time</li>
              <li>• If any issues are found, you'll receive an email alert</li>
              <li>• All checks are logged and visible in this history</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
