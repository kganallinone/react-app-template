import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons
import { useToast } from "../../context/ToastProvider";
import { ASSETS } from "../../config/assetsConfig";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { projectKey } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response: any = await authContext?.login(email, password);

      if (response) {
        showToast("Login successful", "success", "top-10 right-10");
        if (projectKey) {
          navigate(`/${projectKey}/event`);
        } else {
          navigate(`/apps/event`);
        }
      } else {
        showToast("Invalid Credentials", "error", "top-10 right-10");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative hidden md:block w-full md:w-2/3 h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ASSETS.LOGIN_BG})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        <div className="absolute bottom-[10%] left-[10%]  text-white  font-bold flex items-center gap-4">
          <div className="flex space-x-4">
            <img src={`./pisara_logo.png`} alt="" className="w-32 h-32" />
          </div>
          <div>
            <h1 className="text-6xl ">PISARA EVENT APP</h1>
            <p className="text-xs text-gray-300">Powered by PISARA</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-6xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-indigo-800">
            WELCOME
          </h2>
          <form className="space-y-6 md:space-y-8" onSubmit={handleLogin}>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={isLoading}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-600" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white text-2xl md:text-xl font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Please Wait...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
