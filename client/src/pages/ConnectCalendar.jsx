import React from "react";

const ConnectCalendar = () => {
  const handleConnect = () => {
    const user = JSON.parse(localStorage.getItem("user")); // get full user object
    const userId = user?.id || user?._id;
    // Redirect to backend OAuth login route
    console.log("userId: ",userId);
    if (!userId) {
      alert("User not found! Please log in again.");
      console.warn("User ID not found in localStorage!");
      return;
    }
    window.location.href = `http://localhost:8080/api/oauth/login?userId=${userId}`;
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Connect Google Calendar
    </button>
  );
};

export default ConnectCalendar;