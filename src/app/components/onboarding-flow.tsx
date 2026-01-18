import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Globe, Plus, Trash2 } from "lucide-react";

interface OnboardingFlowProps {
  selectedPlan: "free" | "starter" | "growth";
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export interface OnboardingData {
  email: string;
  domain: string;
  paths: string[];
  frequency: string;
  plan: "free" | "starter" | "growth";
}

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "mail.com"
];

type OnboardingStep = "email" | "discovery" | "homepage" | "paths" | "frequency";

export function OnboardingFlow({ selectedPlan, onComplete, onBack }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("email");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [discoveredPaths, setDiscoveredPaths] = useState<string[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [manualPaths, setManualPaths] = useState("");
  const [newManualPath, setNewManualPath] = useState("");
  const [frequency, setFrequency] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useSitemap, setUseSitemap] = useState(true);

  const handleEmailSubmit = () => {
    setError("");
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Extract domain from email
    const emailDomain = email.split("@")[1].toLowerCase();
    
    // Check if it's a public email domain
    if (PUBLIC_EMAIL_DOMAINS.includes(emailDomain)) {
      setError("Please use your company email to continue. Public email domains are not allowed.");
      return;
    }

    // Extract website domain (remove subdomains if any)
    const domainParts = emailDomain.split(".");
    const extractedDomain = domainParts.slice(-2).join(".");
    
    setDomain(extractedDomain);
    setStep("discovery");
  };

  const handleSitemapDiscovery = async () => {
    setLoading(true);
    setError("");

    // Simulate sitemap fetching
    setTimeout(() => {
      // Mock sitemap discovery
      const mockPaths = [
        "/",
        "/pricing",
        "/features",
        "/about",
        "/contact",
        "/blog",
        "/blog/getting-started",
        "/blog/best-practices",
        "/docs",
        "/docs/api"
      ];

      // Randomly simulate sitemap success or failure
      const hasSitemap = Math.random() > 0.3; // 70% success rate

      if (hasSitemap) {
        setDiscoveredPaths(mockPaths);
        setUseSitemap(true);
        setStep("homepage");
      } else {
        setDiscoveredPaths([]);
        setUseSitemap(false);
        setError("No sitemap found. Please enter your paths manually.");
      }
      
      setLoading(false);
    }, 2000);
  };

  const handleManualPathsSubmit = () => {
    setError("");
    
    // Parse manual paths
    const paths = manualPaths
      .split("\n")
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => p.startsWith("/") ? p : `/${p}`);

    if (paths.length === 0) {
      setError("Please enter at least one path");
      return;
    }

    setDiscoveredPaths(paths);
    setStep("homepage");
  };

  const handleHomepageValidation = async () => {
    setLoading(true);
    setError("");

    // Simulate homepage validation
    setTimeout(() => {
      const isValid = Math.random() > 0.1; // 90% success rate

      if (isValid) {
        // Initialize selectedPaths with all discovered paths
        setSelectedPaths(discoveredPaths);
        setStep("paths");
      } else {
        setError("Homepage validation failed. Please ensure your homepage loads correctly and try again.");
      }
      
      setLoading(false);
    }, 2000);
  };

  const handleFrequencySubmit = () => {
    if (!frequency) {
      setError("Please select a monitoring frequency");
      return;
    }

    onComplete({
      email,
      domain,
      paths: selectedPaths,
      frequency,
      plan: selectedPlan
    });
  };

  const handleAddManualPath = () => {
    setError("");
    
    if (!newManualPath.trim()) {
      setError("Please enter a path");
      return;
    }

    let normalizedPath = newManualPath.trim();
    if (!normalizedPath.startsWith("/")) {
      normalizedPath = "/" + normalizedPath;
    }

    if (selectedPaths.includes(normalizedPath)) {
      setError("This path is already added");
      return;
    }

    setSelectedPaths([...selectedPaths, normalizedPath]);
    setNewManualPath("");
    setError("");
  };

  const handleRemovePath = (pathToRemove: string) => {
    setSelectedPaths(selectedPaths.filter(p => p !== pathToRemove));
  };

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case "free":
        return { name: "Free", maxPaths: 5, frequencies: ["Every 6 hours"] };
      case "starter":
        return { name: "Starter", maxPaths: 20, frequencies: ["Every 1 hour", "Every 30 minutes"] };
      case "growth":
        return { name: "Growth", maxPaths: 100, frequencies: ["Every 15 minutes", "Every 30 minutes", "Every 1 hour"] };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-slate-600">
            {planDetails.name} Plan
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Setup Progress</span>
              <span className="text-sm text-slate-600">
                Step {step === "email" ? 1 : step === "discovery" ? 2 : step === "homepage" ? 3 : step === "paths" ? 4 : 5} of 5
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ 
                  width: step === "email" ? "20%" : 
                         step === "discovery" ? "40%" : 
                         step === "homepage" ? "60%" : 
                         step === "paths" ? "80%" : "100%" 
                }}
              />
            </div>
          </div>

          {/* Email Step */}
          {step === "email" && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-2">Enter Your Company Email</h2>
              <p className="text-slate-600 mb-6">
                We'll automatically detect your website domain from your email address.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Public email domains are not allowed:</p>
                  <p className="text-xs text-slate-600">
                    {PUBLIC_EMAIL_DOMAINS.join(", ")}
                  </p>
                </div>

                <Button className="w-full" onClick={handleEmailSubmit}>
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {/* Discovery Step */}
          {step === "discovery" && (
            <Card className="p-8">
              <div className="flex items-start gap-3 mb-6">
                <Globe className="size-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Discover Your Pages</h2>
                  <p className="text-slate-600">
                    We'll automatically fetch pages from your sitemap.xml at:
                  </p>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded mt-2 inline-block">
                    https://{domain}/sitemap.xml
                  </code>
                </div>
              </div>

              {error && (
                <Alert className="mb-4">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!error ? (
                <Button 
                  className="w-full" 
                  onClick={handleSitemapDiscovery}
                  disabled={loading}
                >
                  {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
                  {loading ? "Fetching Sitemap..." : "Discover Pages from Sitemap"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="manual-paths">Enter Paths Manually (one per line)</Label>
                    <Textarea
                      id="manual-paths"
                      placeholder={`/\n/pricing\n/features\n/contact\n/blog`}
                      value={manualPaths}
                      onChange={(e) => setManualPaths(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Example: Enter "/" for homepage, "/pricing" for pricing page, etc.
                    </p>
                  </div>
                  <Button className="w-full" onClick={handleManualPathsSubmit}>
                    Continue with Manual Paths
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* Homepage Validation Step */}
          {step === "homepage" && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-2">Validate Homepage</h2>
              <p className="text-slate-600 mb-6">
                Before monitoring your pages, we need to verify your homepage is accessible.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">We'll check:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• HTTP response is 200</li>
                    <li>• Page loads successfully</li>
                    <li>• No critical JavaScript errors</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium mb-1">Homepage URL:</p>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                    https://{domain}/
                  </code>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleHomepageValidation}
                  disabled={loading}
                >
                  {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
                  {loading ? "Validating Homepage..." : "Validate Homepage"}
                </Button>
              </div>
            </Card>
          )}

          {/* Paths Review Step */}
          {step === "paths" && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-2">Review & Add Paths</h2>
              <p className="text-slate-600 mb-6">
                Found {discoveredPaths.length} pages {useSitemap ? "from sitemap" : "from manual input"}. You can add more paths manually.
              </p>

              <div className="space-y-4">
                {/* Add Manual Path Section */}
                <div className="p-4 border rounded-lg bg-slate-50">
                  <Label htmlFor="new-path" className="text-sm font-medium mb-2 block">
                    Add More Paths
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="new-path"
                      type="text"
                      placeholder="/new-page"
                      value={newManualPath}
                      onChange={(e) => setNewManualPath(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddManualPath()}
                      className="bg-white"
                    />
                    <Button onClick={handleAddManualPath} size="sm">
                      <Plus className="size-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Example: /new-feature, /products/item
                  </p>
                  {error && (
                    <p className="text-xs text-red-600 mt-2">{error}</p>
                  )}
                </div>

                {/* All Paths List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      All Paths ({selectedPaths.length})
                    </Label>
                    {selectedPaths.length > planDetails.maxPaths && (
                      <span className="text-xs text-orange-600 font-medium">
                        {selectedPaths.length - planDetails.maxPaths} require add-ons
                      </span>
                    )}
                  </div>
                  <div className="border rounded-lg max-h-80 overflow-y-auto">
                    {selectedPaths.map((path, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-3 p-3 border-b last:border-b-0 ${index >= planDetails.maxPaths ? "bg-orange-50" : ""}`}
                      >
                        <CheckCircle2 className={`size-4 flex-shrink-0 ${index >= planDetails.maxPaths ? "text-orange-500" : "text-green-600"}`} />
                        <code className="text-sm font-mono flex-1">https://{domain}{path}</code>
                        {index >= planDetails.maxPaths && (
                          <span className="text-xs text-orange-600 font-medium whitespace-nowrap">
                            Add-on
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePath(path)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPaths.length > planDetails.maxPaths && (
                  <Alert>
                    <AlertCircle className="size-4" />
                    <AlertDescription>
                      Your {planDetails.name} plan includes {planDetails.maxPaths} pages. 
                      You have {selectedPaths.length} pages. You can add flexible page bundles 
                      (+10, +50, or +100 pages) without changing plans.
                    </AlertDescription>
                  </Alert>
                )}

                <Button className="w-full" onClick={() => setStep("frequency")}>
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {/* Frequency Selection Step */}
          {step === "frequency" && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-2">Choose Monitoring Frequency</h2>
              <p className="text-slate-600 mb-6">
                How often should we check your pages for issues?
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="frequency">Check Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Every 15 minutes">Every 15 minutes</SelectItem>
                      <SelectItem value="Every 30 minutes">Every 30 minutes</SelectItem>
                      <SelectItem value="Every 1 hour">Every 1 hour</SelectItem>
                      <SelectItem value="Every 3 hours">Every 3 hours</SelectItem>
                      <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                      <SelectItem value="Every 12 hours">Every 12 hours</SelectItem>
                      <SelectItem value="Every 1 day">Every 1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">What we'll monitor:</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• HTTP response status (404, 500 errors)</li>
                    <li>• Page load success</li>
                    {selectedPlan !== "free" && <li>• JavaScript console errors</li>}
                    <li>• Network failures and timeouts</li>
                  </ul>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button className="w-full" onClick={handleFrequencySubmit}>
                  Complete Setup
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}