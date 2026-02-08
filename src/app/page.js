import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Role-Based Access System
      </h1>
      
      <p className="mb-8 text-gray-600">
        Select an option to get started:
      </p>

      <div className="flex gap-4">
        {/* Link to the Login Page */}
        <Link 
          href="/login" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-lg transition"
        >
          Login
        </Link>

        {/* Link to the Register Page */}
        <Link 
          href="/register" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow-lg transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}