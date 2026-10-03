import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "react-hot-toast";

import  AuthProvider  from "./admin/context/AuthContext";

import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/layouts/AdminLayout";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import ServicesAdmin from "./admin/pages/ServicesAdmin";
import ProgramsAdmin from "./admin/pages/ProgramsAdmin";
import FAQsAdmin from "./admin/pages/FAQsAdmin";
import InquiriesAdmin from "./admin/pages/InquiriesAdmin";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

/*
|--------------------------------------------------------------------------
| Public Pages
|--------------------------------------------------------------------------
*/

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Programs from "./pages/Programs";
import Internship from "./pages/Internship";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>404</h1>

      <p>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

const PublicLayout = ({ children }) => {
  return <>
    <Navbar />
    {children}
    <Footer />
  </>;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          <Routes>

            {/* ---------------------------------------------------------
                Admin Authentication
            --------------------------------------------------------- */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* ---------------------------------------------------------
                Protected Admin Area
            --------------------------------------------------------- */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/admin"
                element={<AdminLayout />}
              >

                <Route
                  index
                  element={
                    <Navigate
                      to="/admin/dashboard"
                      replace
                    />
                  }
                />

                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="services"
                  element={<ServicesAdmin />}
                />

                <Route
                  path="programs"
                  element={<ProgramsAdmin />}
                />

                <Route
                  path="faqs"
                  element={<FAQsAdmin />}
                />

                <Route
                  path="inquiries"
                  element={<InquiriesAdmin />}
                />

              </Route>

            </Route>

            {/* ---------------------------------------------------------
                Public Website
            --------------------------------------------------------- */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />

            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />

            <Route
              path="/services"
              element={
                <PublicLayout>
                  <Services />
                </PublicLayout>
              }
            />

            <Route
              path="/programs"
              element={
                <PublicLayout>
                  <Programs />
                </PublicLayout>
              }
            />

            <Route
              path="/internship"
              element={
                <PublicLayout>
                  <Internship />
                </PublicLayout>
              }
            />

            <Route
              path="/faq"
              element={
                <PublicLayout>
                  <FAQ />
                </PublicLayout>
              }
            />

            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />

            {/* ---------------------------------------------------------
                404
            --------------------------------------------------------- */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;