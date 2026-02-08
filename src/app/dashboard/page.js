import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserList from "@/components/UserList"; // <--- IMPORT THE COMPONENT

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold tracking-wide border-b border-slate-800">
          MediLab<span className="text-teal-400">Pro</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <div className="block py-2.5 px-4 rounded transition bg-teal-600 text-white">
            Dashboard
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="text-sm text-slate-400">Logged in as:</div>
          <div className="font-bold text-teal-400 uppercase">{role}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Overview</h1>
          <div className="flex items-center gap-4">
             <span className="text-slate-600 font-medium">{session.user.name}</span>
             <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold border border-teal-200">
               {session.user.name?.charAt(0) || "U"}
             </div>
          </div>
        </div>

        {/* ADMIN VIEW - THIS IS THE PART YOU MISSED */}
        {role === "admin" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
               </div>
               <h2 className="text-xl font-bold text-slate-800">Admin Control Panel</h2>
            </div>
            <p className="text-slate-500 mb-6">Manage user roles and system access.</p>
            
            {/* HERE IS THE TABLE COMPONENT */}
            <UserList /> 
          </div>
        )}

        {/* DOCTOR VIEW */}
        {role === "doctor" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h2 className="text-xl text-green-700 font-bold mb-4">Doctor Dashboard</h2>
             <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center text-slate-400">
               No appointments found for today.
             </div>
          </div>
        )}

        {/* PATIENT VIEW */}
        {role === "customer" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h2 className="text-xl text-blue-700 font-bold mb-4">Patient Portal</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded border border-slate-100">
                  <h3 className="font-bold">My Reports</h3>
                  <p className="text-sm text-slate-500">No reports available.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded border border-slate-100">
                  <h3 className="font-bold">Upcoming Visits</h3>
                  <p className="text-sm text-slate-500">No appointments scheduled.</p>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}