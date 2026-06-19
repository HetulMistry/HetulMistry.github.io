import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MotionProvider } from "@/lib/motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Portfolio from "@/page";
import NotFoundPage from "@/pages/NotFoundPage";
import ServerErrorPage from "@/pages/ServerErrorPage";
import GatewayTimeoutPage from "@/pages/GatewayTimeoutPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <MotionProvider>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/504" element={<GatewayTimeoutPage />} />
            {/* Catch-all → 404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MotionProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
