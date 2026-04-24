/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { DashboardPage } from "./pages/dashboard";
import { MyTasksPage } from "./pages/my-tasks";
import { ReportsPage } from "./pages/reports";
import { SettingsPage } from "./pages/settings";
import { NewTaskPage } from "./pages/new-task";
import { DocumentsPage } from "./pages/documents";
import { ApprovalsPage } from "./pages/approvals";
import { AuthPage } from "./pages/auth";
import { LandingPage } from "./pages/landing";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/new-task" element={<NewTaskPage />} />
        <Route path="/tasks" element={<MyTasksPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Fallback for other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </AuthProvider>
  );
}
