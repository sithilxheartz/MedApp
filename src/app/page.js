import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Advanced diagnostics</span>{" "}
                    <span className="block text-teal-600 xl:inline">for your health</span>
                  </h1>
                  <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Book appointments for blood tests, X-rays, and general checkups online. Fast, secure, and reliable results delivered to your dashboard.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-3">
                    <Link href="/login" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10 shadow-lg">
                      Book Appointment
                    </Link>
                    <Link href="/register" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10">
                      New Patient?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Image Placeholder (Right Side) */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 flex items-center justify-center">
             <div className="text-slate-300 font-bold text-4xl">
               [ Medical Image Here ]
             </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Our Laboratory Services
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Service 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="text-teal-600 text-xl font-bold mb-2">Blood Testing</div>
                  <p className="text-slate-500">Full blood count, lipid profile, and specialized hormonal tests.</p>
                </div>
                {/* Service 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="text-teal-600 text-xl font-bold mb-2">Radiology</div>
                  <p className="text-slate-500">Digital X-rays and Ultrasound scanning with instant reporting.</p>
                </div>
                {/* Service 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="text-teal-600 text-xl font-bold mb-2">Checkups</div>
                  <p className="text-slate-500">General wellness packages for corporate and individual clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}