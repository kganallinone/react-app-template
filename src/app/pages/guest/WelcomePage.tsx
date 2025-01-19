import SocialMediaButtons from "../../components/buttons/SocialMediaButtons";

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <img
          src={"./images/logo/kgan-logo.jpg"}
          alt="Creator Logo"
          className="w-32 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Our App!
        </h1>
        <p className="mt-2 text-gray-600 mb-4">
          We’re excited to have you here and we hope you enjoy using this
          template! Connect with us on social media!
        </p>
        <SocialMediaButtons />
      </div>
    </div>
  );
};

export default WelcomePage;
