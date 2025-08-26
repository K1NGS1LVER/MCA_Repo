import React, { useEffect, useState } from "react";
import UserEditModal from "../components/UserEditModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user)
    return (
      <div className="py-8 text-center">No user found. Please sign in.</div>
    );

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        localStorage.removeItem("user");
        window.location.href = "/signin";
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Profile</h2>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        {user.profilePic ? (
          <img
            src={`http://localhost:3001/uploads/${user.profilePic}`}
            alt="Profile"
            className="rounded-full mb-4"
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-500">
            No Photo
          </div>
        )}
        <div className="text-lg font-semibold mb-2">{user.name}</div>
        <div className="text-gray-600 mb-1">Email: {user.email}</div>
        <div className="text-gray-600 mb-1">Phone: {user.phone}</div>
        <div className="flex gap-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowEdit(true)}
          >
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete My Account
          </button>
        </div>
        {showEdit && (
          <UserEditModal
            user={user}
            onClose={() => setShowEdit(false)}
            onUpdate={(updated) => {
              setUser(updated);
              localStorage.setItem("user", JSON.stringify(updated));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
