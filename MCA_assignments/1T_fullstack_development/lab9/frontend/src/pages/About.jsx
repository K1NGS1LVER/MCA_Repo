import React from "react";
// import "../css/style.css";

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col items-center justify-center">
    <div className="bg-white shadow-md rounded-xl px-8 py-10 w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        About CollabPro
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        CollabPro is a platform for real-time document collaboration and team
        coordination.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg shadow p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600">
            Empowering teams to work together efficiently and securely.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Features</h3>
          <p className="text-gray-600">
            Real-time editing, version history, and enterprise-grade security.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
