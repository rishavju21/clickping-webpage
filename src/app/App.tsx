import { useState } from "react";
import { LandingPage } from "@/app/components/landing-page";
import { LoginPage } from "@/app/components/login-page";
import { PricingPage } from "@/app/components/pricing-page";
import { OnboardingFlow, type OnboardingData } from "@/app/components/onboarding-flow";
import { Dashboard } from "@/app/components/dashboard";
import { PathDetail } from "@/app/components/path-detail";
import { SettingsPage } from "@/app/components/settings-page";
import { TotalPathsView } from "@/app/components/total-paths-view";
import { HealthyPathsView } from "@/app/components/healthy-paths-view";
import { BrokenPathsView } from "@/app/components/broken-paths-view";
import { FrequencyView } from "@/app/components/frequency-view";
import { ManagePaths } from "@/app/components/manage-paths";

type AppView = 
  | "landing"
  | "login"
  | "pricing" 
  | "onboarding"
  | "dashboard"
  | "path-detail"
  | "settings"
  | "total-paths"
  | "healthy-paths"
  | "broken-paths"
  | "frequency"
  | "manage-paths";

interface PathStatus {
  path: string;
  status: "healthy" | "broken" | "checking";
  lastChecked: Date;
  httpStatus: number;
  jsErrors: number;
  errorMessage?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "starter" | "growth">("free");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("");
  
  // Generate mock path data when onboarding completes
  const [pathsData, setPathsData] = useState<PathStatus[]>([]);

  const generatePathsData = (paths: string[]): PathStatus[] => {
    return paths.map((path) => {
      const isHealthy = Math.random() > 0.2; // 80% healthy
      const hasBrokenStatus = !isHealthy && Math.random() > 0.5;
      const hasJsError = !isHealthy && !hasBrokenStatus;
      
      return {
        path,
        status: isHealthy ? "healthy" : "broken",
        lastChecked: new Date(Date.now() - Math.random() * 3600000),
        httpStatus: hasBrokenStatus ? (Math.random() > 0.5 ? 404 : 500) : 200,
        jsErrors: hasJsError ? Math.floor(Math.random() * 3) + 1 : 0,
        errorMessage: hasBrokenStatus 
          ? `HTTP ${hasBrokenStatus ? (Math.random() > 0.5 ? 404 : 500) : 200} Error`
          : hasJsError 
          ? `${Math.floor(Math.random() * 3) + 1} JavaScript error(s)`
          : undefined
      };
    });
  };

  const handleGetStarted = () => {
    setSelectedPlan("free");
    setCurrentView("onboarding");
  };

  const handleLogin = (email: string) => {
    // Simulate login with mock data
    const mockData: OnboardingData = {
      email,
      domain: email.split("@")[1] || "acmecorp.com",
      paths: ["/", "/pricing", "/features", "/about", "/contact", "/blog"],
      frequency: "Every 30 minutes",
      plan: "starter"
    };
    setOnboardingData(mockData);
    setPathsData(generatePathsData(mockData.paths));
    setCurrentView("dashboard");
  };

  const handleSelectPlan = (plan: "free" | "starter" | "growth") => {
    setSelectedPlan(plan);
    setCurrentView("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setPathsData(generatePathsData(data.paths));
    setCurrentView("dashboard");
  };

  const handleViewPath = (path: string) => {
    setSelectedPath(path);
    setCurrentView("path-detail");
  };

  const handleUpdateSettings = (data: Partial<OnboardingData>) => {
    if (onboardingData) {
      setOnboardingData({ ...onboardingData, ...data });
    }
  };

  const handleUpdatePaths = (paths: string[]) => {
    if (onboardingData) {
      const updatedData = { ...onboardingData, paths };
      setOnboardingData(updatedData);
      setPathsData(generatePathsData(paths));
    }
  };

  return (
    <div className="size-full">
      {currentView === "landing" && (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onViewPricing={() => setCurrentView("pricing")}
          onLogin={() => setCurrentView("login")}
        />
      )}

      {currentView === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setCurrentView("landing")}
        />
      )}

      {currentView === "pricing" && (
        <PricingPage 
          onSelectPlan={handleSelectPlan}
          onBack={() => setCurrentView("landing")}
        />
      )}

      {currentView === "onboarding" && (
        <OnboardingFlow
          selectedPlan={selectedPlan}
          onComplete={handleOnboardingComplete}
          onBack={() => setCurrentView("pricing")}
        />
      )}

      {currentView === "dashboard" && onboardingData && (
        <Dashboard
          onboardingData={onboardingData}
          onViewPath={handleViewPath}
          onSettings={() => setCurrentView("settings")}
          onViewTotalPaths={() => setCurrentView("total-paths")}
          onViewHealthyPaths={() => setCurrentView("healthy-paths")}
          onViewBrokenPaths={() => setCurrentView("broken-paths")}
          onViewFrequency={() => setCurrentView("frequency")}
        />
      )}

      {currentView === "path-detail" && onboardingData && (
        <PathDetail
          path={selectedPath}
          domain={onboardingData.domain}
          onBack={() => setCurrentView("dashboard")}
        />
      )}

      {currentView === "settings" && onboardingData && (
        <SettingsPage
          onboardingData={onboardingData}
          onBack={() => setCurrentView("dashboard")}
          onUpdateSettings={handleUpdateSettings}
          onManagePaths={() => setCurrentView("manage-paths")}
          onChangePlan={() => setCurrentView("pricing")}
        />
      )}

      {currentView === "total-paths" && onboardingData && (
        <TotalPathsView
          onboardingData={onboardingData}
          paths={pathsData}
          onBack={() => setCurrentView("dashboard")}
          onViewPath={handleViewPath}
        />
      )}

      {currentView === "healthy-paths" && onboardingData && (
        <HealthyPathsView
          onboardingData={onboardingData}
          paths={pathsData}
          onBack={() => setCurrentView("dashboard")}
          onViewPath={handleViewPath}
        />
      )}

      {currentView === "broken-paths" && onboardingData && (
        <BrokenPathsView
          onboardingData={onboardingData}
          paths={pathsData}
          onBack={() => setCurrentView("dashboard")}
          onViewPath={handleViewPath}
        />
      )}

      {currentView === "frequency" && onboardingData && (
        <FrequencyView
          onboardingData={onboardingData}
          onBack={() => setCurrentView("dashboard")}
          onUpdateFrequency={(frequency) => handleUpdateSettings({ frequency })}
        />
      )}

      {currentView === "manage-paths" && onboardingData && (
        <ManagePaths
          onboardingData={onboardingData}
          onBack={() => setCurrentView("settings")}
          onUpdatePaths={handleUpdatePaths}
        />
      )}
    </div>
  );
}