"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/"); // Redirect to login
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input type="text" placeholder="Name" className="border p-2" onChange={(e) => setInfo({ ...info, name: e.target.value })} />
      <input type="email" placeholder="Email" className="border p-2" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
      <input type="password" placeholder="Password" className="border p-2" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
      <button className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}