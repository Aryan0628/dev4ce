import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const linked = searchParams.get("linked");

    if (linked === "true") {
        alert("Google Calendar linked successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        navigate("/dashboard");
      }

    // Redirect to dashboard
    navigate("/dashboard");
  }, [searchParams, navigate]);

  return <div>Connecting your Google Calendar...</div>;
};

export default OAuthCallback;