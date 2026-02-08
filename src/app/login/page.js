"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: info.email,
      password: info.password,
      redirect: false,
    });

    if (res.error) {
      alert("Invalid Credentials");
    } else {
      router.push("/dashboard"); // Redirect to dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" placeholder="Email" className="border p-2" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
      <input type="password" placeholder="Password" className="border p-2" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
      <button className="bg-green-500 text-white p-2 rounded">Login</button>
    </form>
  );
}