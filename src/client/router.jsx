import { Route, Routes, useNavigate } from "react-router-dom";
import {
  SignUp,
  SignIn,
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import DashboardLayout from "./pages/DashboardLayout";
import Editor from "./pages/Editor";
import AdminDashboard from "./pages/AdminDashboard";
import Pricing from "./components/Pricing";
import UserDashboardHome from "./components/UserDashboardHome";

function ClerkProviderWithRoutes({ publishableKey }) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/editor" element={<Editor />} /> */}

          <Route
            path="/sign-in/*"
            element={
              <div className="h-screen flex items-center justify-center">
                <SignIn routing="path" path="/sign-in" />
              </div>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <div className="h-screen flex items-center justify-center">
                <SignUp routing="path" path="/sign-up" />
              </div>
            }
          />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <UserDashboardHome />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/dashboard/pricing"
              element={
                <>
                  <SignedIn>
                    <Pricing isDashboard={true} />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Route>
          <Route
            path="/editor"
            element={
              <>
                <SignedIn>
                  <Editor />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <>
                <SignedIn>
                  <Editor />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <SignedIn>
                  <Profile />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <SignedIn>
                  <AdminDashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default ClerkProviderWithRoutes;
