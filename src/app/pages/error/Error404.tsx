import { Link, useParams } from "react-router-dom";
import { APP_CONSTANTS } from "../../config/config";

const Error404 = () => {
  const { projectKey } = useParams();
  return (
    <div className="flex items-center justify-center h-screen bg-light">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-bold text-black dark:text-white">
          {APP_CONSTANTS.ERROR.NOT_FOUND.TITLE}
        </h1>
        <p className="text-base text-neutral">
          {APP_CONSTANTS.ERROR.NOT_FOUND.MESSAGE}
        </p>
        <div>
          <Link
            to={`/${projectKey}/event`}
            className="text-base text-primary hover:underline"
          >
            {APP_CONSTANTS.LABELS.GO_TO_HOME_PAGE}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
