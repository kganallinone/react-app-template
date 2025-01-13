import React from "react";
import { useNavigate } from "react-router-dom";

const WarningPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 text-lg mb-6">
          We're sorry, but the page you are trying to access is either outside
          the scope of this application or you are not subscribed.
        </p>
        <p className="text-gray-500 mb-8">
          If you believe this is an error, please reach out to our help center
          for assistance.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={goBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/help-center")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Contact Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPage;
