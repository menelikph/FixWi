import { LoginForm } from '@/components/molecules/LoginForm';

/**
 * LoginPage Component
 * 
 * Authentication page with a split layout design:
 * - Left side: Login form
 * - Right side: Promotional content with features and branding
 * 
 * Responsive design: Promotional content is hidden on screens smaller than lg breakpoint
 */
export default function LoginPage() {
  // Feature list displayed on the promotional side
  const features = [
    "Fast and organized reports",
    "Real-time tracking",
    "AI-powered suggestions",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>

      {/* Right Side - Promotional Content */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5C3DFF] to-[#4A2FCC] items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern Elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Top-left decorative blur */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          {/* Bottom-right decorative blur */}
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 text-white max-w-lg">
          {/* Hero Title */}
          <h2 className="text-4xl font-bold mb-6">Internal Incident Management System</h2>
          
          {/* Hero Description */}
          <p className="text-lg text-white/90 mb-8">
            Report and manage technical issues quickly and efficiently. 
            Keep your workspace running at 100%.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Check icon container */}
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                  {/* Check mark SVG icon */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Feature text */}
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}