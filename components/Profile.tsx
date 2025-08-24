"use client";

import React from "react";

export default function Profile() {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full flex flex-col items-center">
        {/* Profile Picture */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full mb-4 shadow-md"
        />

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Profile</h2>

        <div className="w-full space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Member Since:</strong> Jan 2024
          </p>
        </div>

        {/* Optional Edit Button */}
        <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
