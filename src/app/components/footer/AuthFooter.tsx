import { Link } from "react-router-dom";

type AuthProps = {
  text: string;
  path: string;
  button: string;
};

export const AuthFooter = ({ text, path, button }: AuthProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center rounded-t-3xl  bg-white shadow-md  p-5 ">
      <div>
        <div>
          <span>{text} </span>
          {""}
          <Link to={path} className="text-accent hover:underline font-semibold">
            {button}
          </Link>
        </div>
        <div className="text-xs flex justify-center items-center mt-5 text-gray-500 gap-3">
          <span className="hover:underline hover:text-info">beta-1.0.0 </span>
          <span> |</span>
          <span>Powered by PISARA</span>
        </div>
      </div>
    </div>
  );
};
