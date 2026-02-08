import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserList from "@/components/UserList"; // We import the component here

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-8 text-lg">
          Welcome, <strong>{session.user.name}</strong>! You are logged in as a:{" "}
          <span className="text-blue-600 font-bold uppercase">{role}</span>
        </p>

        {/* === ADMIN VIEW === */}
        {role === "admin" && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4 text-red-600">Admin Panel</h2>
            <p className="mb-4">Manage your users below:</p>
            <UserList /> 
          </div>
        )}

        {/* === DOCTOR VIEW === */}
        {role === "doctor" && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">Doctor Portal</h2>
            <p>Here you can see your appointments...</p>
          </div>
        )}

        {/* === CUSTOMER VIEW === */}
        {role === "customer" && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600">My Orders</h2>
            <p>You have no recent orders.</p>
          </div>
        )}
      </div>
    </div>
  );
}