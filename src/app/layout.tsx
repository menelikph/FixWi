import "./styles/globals.css";
import "./index.css";
import { Providers } from "./providers";
import { Bounce, ToastContainer } from "react-toastify";
import type { Metadata } from "next";

/**
 * Application Metadata
 * 
 * Defines SEO metadata and favicon for the entire application.
 * This metadata is applied to all pages unless overridden by page-specific metadata.
 */
export const metadata: Metadata = {
  title: "Fixwi",
  description: "IT Support Ticket Management System",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * RootLayout Component
 * 
 * The root layout component that wraps the entire application.
 * This layout is applied to all routes and provides:
 * - Global styles import
 * - Toast notification system (react-toastify)
 * - Application providers (AuthContext, HeroUI, etc.)
 * - HTML structure with language attribute
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Global Toast Notification Container */}
        {/* Displays success/error/info messages throughout the app */}
        <ToastContainer
          position="top-center"        // Display at top center of screen
          autoClose={5000}              // Auto-close after 5 seconds
          hideProgressBar={false}       // Show progress bar
          newestOnTop={false}           // Stack oldest on top
          closeOnClick={false}          // Don't close on click
          rtl={false}                   // Left-to-right layout
          pauseOnFocusLoss              // Pause when window loses focus
          draggable                     // Allow dragging to dismiss
          pauseOnHover                  // Pause auto-close on hover
          theme="dark"                  // Dark theme styling
          transition={Bounce}           // Bounce animation effect
        />
        
        {/* Application Providers - Wraps all content with context providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
