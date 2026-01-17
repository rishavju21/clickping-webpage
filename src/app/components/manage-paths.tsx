import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { ArrowLeft, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface ManagePathsProps {
  onboardingData: OnboardingData;
  onBack: () => void;
  onUpdatePaths: (paths: string[]) => void;
}

export function ManagePaths({ onboardingData, onBack, onUpdatePaths }: ManagePathsProps) {
  const [paths, setPaths] = useState(onboardingData.paths);
  const [newPath, setNewPath] = useState("");
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case "free": return { name: "Free", maxPaths: 5 };
      case "starter": return { name: "Starter", maxPaths: 20 };
      case "growth": return { name: "Growth", maxPaths: 100 };
      default: return { name: "Free", maxPaths: 5 };
    }
  };

  const planDetails = getPlanDetails(onboardingData.plan);
  const needsAddOn = paths.length > planDetails.maxPaths;
  const excessPaths = Math.max(0, paths.length - planDetails.maxPaths);

  const handleAddPath = () => {
    setError("");

    if (!newPath.trim()) {
      setError("Please enter a path");
      return;
    }

    let normalizedPath = newPath.trim();
    if (!normalizedPath.startsWith("/")) {
      normalizedPath = "/" + normalizedPath;
    }

    if (paths.includes(normalizedPath)) {
      setError("This path is already being monitored");
      return;
    }

    const updatedPaths = [...paths, normalizedPath];
    setPaths(updatedPaths);
    onUpdatePaths(updatedPaths);
    setNewPath("");
  };

  const handleRemovePath = (pathToRemove: string) => {
    const updatedPaths = paths.filter(p => p !== pathToRemove);
    setPaths(updatedPaths);
    onUpdatePaths(updatedPaths);
  };

  const handleRefreshSitemap = () => {
    setIsRefreshing(true);
    setError("");

    // Simulate sitemap refresh
    setTimeout(() => {
      const mockNewPaths = [
        "/new-feature",
        "/updated-pricing"
      ];

      const uniqueNewPaths = mockNewPaths.filter(p => !paths.includes(p));
      
      if (uniqueNewPaths.length > 0) {
        const updatedPaths = [...paths, ...uniqueNewPaths];
        setPaths(updatedPaths);
        onUpdatePaths(updatedPaths);
        setError(`Added ${uniqueNewPaths.length} new paths from sitemap`);
      } else {
        setError("No new paths found in sitemap");
      }

      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Paths</h1>
            <p className="text-slate-600">
              Add or remove pages to monitor on {onboardingData.domain}
            </p>
          </div>

          {/* Summary Card */}
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Current Plan</p>
                <p className="text-2xl font-bold">{planDetails.name}</p>
                <p className="text-sm text-slate-500">Up to {planDetails.maxPaths} pages</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Monitoring</p>
                <p className="text-2xl font-bold">{paths.length}</p>
                <p className="text-sm text-slate-500">pages total</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Status</p>
                {needsAddOn ? (
                  <>
                    <p className="text-2xl font-bold text-orange-600">{excessPaths}</p>
                    <p className="text-sm text-orange-600">need add-ons</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-green-600">
                      {planDetails.maxPaths - paths.length}
                    </p>
                    <p className="text-sm text-green-600">slots remaining</p>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Add Path */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Path</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="new-path">Path</Label>
                  <Input
                    id="new-path"
                    placeholder="/new-page"
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddPath()}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Example: /pricing, /features, /blog/post-title
                  </p>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddPath}>
                    <Plus className="size-4 mr-2" />
                    Add Path
                  </Button>
                </div>
              </div>

              {error && (
                <Alert>
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm font-medium">Refresh from Sitemap</p>
                  <p className="text-xs text-slate-500">
                    Automatically discover new pages from sitemap.xml
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleRefreshSitemap}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`size-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </Card>

          {/* Current Paths */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Current Paths ({paths.length})</h2>
            <div className="space-y-2">
              {paths.map((path, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 ${
                    index >= planDetails.maxPaths ? "bg-orange-50 border-orange-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {index >= planDetails.maxPaths ? (
                      <AlertCircle className="size-4 text-orange-600" />
                    ) : (
                      <CheckCircle2 className="size-4 text-green-600" />
                    )}
                    <code className="text-sm font-mono">
                      https://{onboardingData.domain}{path}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    {index >= planDetails.maxPaths && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Add-on required
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRemovePath(path)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {paths.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  <p>No paths added yet</p>
                </div>
              )}
            </div>
          </Card>

          {/* Add-on Info */}
          {needsAddOn && (
            <Card className="p-6 border-orange-200 bg-orange-50">
              <h3 className="font-semibold mb-2">Add-on Required</h3>
              <p className="text-sm text-slate-700 mb-4">
                You're monitoring {excessPaths} more {excessPaths === 1 ? "page" : "pages"} than your {planDetails.name} plan includes. 
                Add a flexible page bundle to continue monitoring all pages.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded border">
                  <p className="font-semibold">+10 Pages</p>
                  <p className="text-sm text-slate-600">$5/month</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <p className="font-semibold">+50 Pages</p>
                  <p className="text-sm text-slate-600">$20/month</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <p className="font-semibold">+100 Pages</p>
                  <p className="text-sm text-slate-600">$35/month</p>
                </div>
              </div>
              <Button className="w-full mt-4">
                Add Page Bundle
              </Button>
            </Card>
          )}

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">Path Management Tips</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Paths should start with / (e.g., /pricing, /features)</li>
              <li>• Each path is checked independently at your monitoring frequency</li>
              <li>• Use the sitemap refresh to auto-discover new pages</li>
              <li>• You can exceed your plan limit by purchasing add-on bundles</li>
              <li>• Removing a path stops monitoring immediately</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
