"use client";
import Sidebar from "@/components/organisms/Sidebar";
import { Topbar } from "@/components/organisms/Topbar";
import { useAuth } from "@/context/AuthContext";
/**
 * DashboardLayout Component
 *
 * Main layout for all dashboard pages, providing a consistent structure with:
 * - Fixed sidebar navigation (role-based menu items)
 * - Top navigation bar with user information
 * - Main content area for page-specific content
 *
 * This layout wraps all routes within the (dashboard) route group.
 * Automatically applies to: /admin, /coder, /tickets, /users, etc.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extract user authentication data from AuthContext
  // userRole determines which menu items are visible in the sidebar
  // userName is displayed in the topbar
  const { userRole, userName } = useAuth();

  return (
    // Main container - full height with light gray background
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar - Navigation menu with role-based items */}
      <Sidebar role={userRole} />

      {/* Right Section - Contains topbar and main content */}
      <div className="flex-1 flex flex-col ">
        {/* Top Navigation Bar - Displays user info and actions */}
        <Topbar userName={userName} role={userRole} />

        {/* Main Content Area - Renders the current page content */}
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
