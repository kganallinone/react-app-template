import { Link, useParams } from "react-router-dom";
import { useItem } from "../../hooks/useItem";
import { getFieldValue } from "../../utils/useDataFinder";

export const AboutFooter = () => {
  const { projectKey } = useParams();
  const { version } = useItem();
  console.log(version);
  return (
    <div className="fixed bottom-0 left-0 w-full flex  justify-between  bg-white shadow-md  p-5 ">
      <div className="flex items-center justify-end gap-2 w-full">
        <div className="">
          <p className="text-xs">
            Version{" "}
            <Link
              to={`/${projectKey}/event/version`}
              className="font-bold cursor-pointer hover:underline hover:text-blue-600"
            >
              {" "}
              {getFieldValue(version, "common", "Title")}
            </Link>
          </p>
          <p className="text-xs">© 2024 </p>
        </div>
        <div className="border-x-2 px-2 border-gray-400">
          <h1>Event Management App</h1>
          <p className="text-xs">
            Powered by <span className="font-bold">PISARA</span>
          </p>
        </div>
        <div className=" pl-2 border-gray-400">
          <p className="text-xs cursor-pointer text-blue-600 hover:underline">
            Terms and Conditions
          </p>
          <p className="text-xs cursor-pointer text-blue-600 hover:underline">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
