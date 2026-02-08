"use client";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch users when the component loads
  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  // 2. Handle Role Change
  const handleChangeRole = async (userId, newRole) => {
    // Optimistic UI update (change it instantly on screen)
    setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));

    const res = await fetch("/api/admin/update-role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, newRole }),
    });

    if (!res.ok) {
      alert("Failed to update role");
      window.location.reload(); // Revert changes if server failed
    }
  };

  if (loading) return <div className="text-slate-400 p-4">Loading users...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mt-4">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                    user.role === 'doctor' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {user.role.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                <select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user._id, e.target.value)}
                  className="block w-full max-w-xs pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-white border cursor-pointer"
                >
                  <option value="customer">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}