import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200">
      <header>
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-xl">
          <div className="text-2xl font-bold text-blue-700">CollabPro</div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="text-blue-700 font-semibold hover:underline"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto py-12 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
            Collaborate and Create Together
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            A powerful platform for real-time document collaboration and team
            coordination.
          </p>
          <div>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Why Choose CollabPro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together with your team in real-time on documents and
                spreadsheets.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Version History
              </h3>
              <p className="text-gray-600">
                Track changes and access previous versions of your documents
                easily.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
