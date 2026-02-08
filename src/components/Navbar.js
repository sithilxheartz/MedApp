import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">+</span>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">
              MediLab<span className="text-teal-600">Pro</span>
            </span>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full transition shadow-md hover:shadow-lg text-sm"
            >
              Login Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}