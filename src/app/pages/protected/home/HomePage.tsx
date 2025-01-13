import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "../../../hooks/useProject";
import { IoExtensionPuzzle } from "react-icons/io5";
import { ProjectList } from "./features/ProjectList";

export const HomePage = () => {
  const { projects, loading, error, getProjectsByItemTypeName } = useProject();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("list");
  const filteredProjects = getProjectsByItemTypeName(projects, "Event");
  console.log(projects);

  useEffect(() => {
    const tab = searchParams.get("tab");
    setActiveTab(tab === "reports" ? "reports" : "list");
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {activeTab === "list" && (
        <>
          {projects ? (
            <div className="py-5">
              <ProjectList projects={filteredProjects} />
            </div>
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg">
              <IoExtensionPuzzle size={50} className="mx-auto text-gray-400" />

              <p className=" text-center text-gray-400">No Projects</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
