import { useEffect, useState } from "react";
import Calendar from "../../components/Calender";
import { createProject, deletedProject, getProject } from "../../Api/Project";
import { createTask, getTasksById } from "../../Api/task";
import { useParams } from "react-router-dom";

const DashboardScreen = () => {
  const { taskId } = useParams();
  const [state, setState]: any = useState([]);
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [showRecently, setShowRecently] = useState(true);
  const [showToday, setShowToday] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [activeLink, setActiveLink] = useState("Recently");
  const [projectCount, setProjectCount] = useState(0);

  const handleShowRecently = () => {
    setShowRecently(true);
    setShowToday(false);
    setViewTask(false);
    setShowTask(false);
    setActiveLink("Recently");
  };

  const handleShowToday = () => {
    setShowRecently(false);
    setShowToday(true);
    setViewTask(false);
    setShowTask(false);
    setActiveLink("Today");
  };
  const handleShowTask = () => {
    setShowRecently(false);
    setViewTask(false);
    setShowToday(false);
    setShowTask(true);
    setActiveLink("Task");
  };
  const handleViewTask = () => {
    setShowRecently(false);
    setViewTask(true);
    setShowToday(false);
    setShowTask(false);
    setActiveLink("viewTask");
  };

  const handleCreateProject = async () => {
    try {
      if (!projectName) {
        console.error("Project name is required");
        return;
      }

      const projectData = { projectName };

      const response = await createProject(projectData);

      if (response.data) {
        const createdProject = response.data;
        setState((prevProjects: any) => [...prevProjects, createdProject]);
        const updatedProjects = [...state, createdProject];
        setState(updatedProjects);

        const projectCount = updatedProjects.length;
        setProjectCount(projectCount);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = (projectID: string) => {
    // Call the API function to delete the project
    deletedProject(projectID).then(() => {
      // Refresh the project list after deletion
      getProject().then((res: any) => {
        setState(res.data);
      });
    });
  };

  useEffect(() => {
    getProject().then((res: any) => {
      setState(res.data);
    });
  }, []);

  const handlecreateTask = async (projectID: any) => {
    createTask(projectID).then((res: any) => {
      setState(res.data.data);
    });
  };
  useEffect(() => {
    getTasksById(taskId!).then((res: any) => {
      setState(res.task.data);
    });
  }, []);

  return (
    <div>
      <div
        className="w-full flex justify-center items-center"
        style={{
          height: "calc(100vh - 50px)",
          borderRadius: "20px",
          border: "4px solid black",
        }}
      >
        <div className="h-[100%] w-[50%] rounded-lg">
          <div className="w-[90%] h-[160px]">
            <p className="pl-10 pt-5 font-normal text-xl text-slate-400">
              Hello Jessica
            </p>
            <h1 className="pl-10 pt-5 font-bold text-3xl">
              You've got <br />
              {state.length} project(s) today
            </h1>
          </div>
          <div className="h-[80px] w-[80%] flex items-center justify-center">
            <input
              type="text"
              placeholder="search something"
              className="h-[50px] w-[60%] border-none outline-none bg-gray-200 pl-3"
            />
          </div>
          <div className="h-[72%] w-full rounded-lg">
            <h1 className="pl-10 pt-5 font-bold text-3xl">My Project</h1>
            <div className="h-[50px] w-[95%] flex justify-around items-center gap-5 ml-5 mt-7">
              <div className="relative">
                <nav
                  className={`font-bold text-xl cursor-pointer ${
                    activeLink === "Today" ? "text-yellow-400" : ""
                  }`}
                  style={{
                    position: "relative",
                    marginBottom: "9px",
                    display: "inline-block",
                  }}
                  onClick={handleShowRecently}
                >
                  Recently
                </nav>
                {activeLink === "Recently" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      backgroundColor: "yellow",
                    }}
                  />
                )}
              </div>
              <nav
                className={`font-normal text-xl cursor-pointer ${
                  activeLink === "Today" ? "text-slate-400" : ""
                }`}
                onClick={handleShowToday}
              >
                Today
              </nav>
              <nav
                className={`font-normal text-xl cursor-pointer ${
                  activeLink === "Task" ? "text-slate-700" : ""
                }`}
                onClick={handleShowTask}
              >
                Task
              </nav>
              <nav
                className={`font-normal text-xl cursor-pointer ${
                  activeLink === "viewTask" ? "text-slate-400" : ""
                }`}
                onClick={handleViewTask}
              >
                View Task
              </nav>
            </div>
            {showToday && (
              <div
                style={{
                  height: "78%",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                {state &&
                  state?.map((project: any) => (
                    <div key={project._id}>
                      <div className="project-box ml-5">
                        <div className="project-box-header flex items-center justify-between bg-gray-300 p-3">
                          <div className="flex items-center">
                            <span className="text-xl font-bold mr-3">
                              {project.projectName}
                            </span>
                            <span className="text-gray-500">
                              Due: 2023-12-31
                            </span>
                          </div>
                          <div className="flex items-center">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-3">
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-md"
                              onClick={() => handleDeleteProject(project._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="project-box-body p-3">
                          <p className="text-gray-700 mb-4">
                            Project description goes here. You can add more
                            details about the project in this section.
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-green-500">Completed</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-yellow-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                              </svg>
                              <span className="text-yellow-500">
                                In Progress
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="project-box-footer p-3">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-3"
                            onClick={handleShowTask}
                          >
                            Add Task
                          </button>
                          <button className="bg-green-500 text-white px-3 py-1 rounded-md">
                            View Tasks
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {showRecently && (
              <div
                style={{
                  height: "78%",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9 bg-blue-500"></div>
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9"></div>
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9"></div>
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9"></div>
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9"></div>
                <div className="h-[200px] w-[50%] border ml-[30px] mt-9"></div>
              </div>
            )}

            {viewTask && (
              <div
                style={{
                  height: "78%",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <div className="h-[80px] w-[80%] flex items-center justify-center ml-10">
                  <div className="task-card ml-9">
                    <div className="task-card-header flex items-center justify-between bg-blue-500 text-white p-3">
                      <div className="flex items-center">
                        <span className="font-bold text-lg">Task Name</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 2C5.25 2 1 6.25 1 11s4.25 9 9 9 9-4.25 9-9-4.25-9-9-9zm0 16c-2.92 0-5-2.5-5-5s2.08-5 5-5 5 2.5 5 5-2.08 5-5 5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>Created: 2023-01-01</span>
                      </div>
                    </div>
                    <div className="task-card-body p-3">
                      <p className="text-gray-700 mb-4">
                        Task description goes here. You can add more details
                        about the task in this section.
                      </p>
                    </div>
                    <div className="task-card-footer flex justify-between p-3">
                      <div className="flex items-center">
                        <span>Due: 2023-01-10</span>
                      </div>
                      <div className="flex items-center">
                        <span>Assign</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showTask && (
              <div
                style={{
                  height: "78%",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <div className="h-[80px] w-[80%] flex items-center justify-center ml-10">
                  <input
                    type="text"
                    title={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter the task title"
                    className="h-[50px] w-[60%] border-none outline-none bg-gray-200 pl-3"
                  />
                  <div className="flex justify-end items-center">
                    <button
                      className="h-[40px] w-[110px] bg-slate-300 rounded mr-9 ml-10"
                      onClick={handlecreateTask}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-[100%] w-[50%] rounded-lg">
          <div className="h-[200px] w-full">
            <div className="h-[90px] w-[100%] flex justify-around items-center">
              <div className="h-[80px] w-[80%] flex items-center justify-center">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter the project title"
                  className="h-[50px] w-[60%] border-none outline-none bg-gray-200 pl-3"
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  className="h-[40px] w-[100px] bg-slate-300 rounded mr-9"
                  onClick={handleCreateProject}
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-2xl pl-10 ml-10">Calender : </h1>
            <div className="flex justify-end items-center">
              <h1 className="font-bold text-2xl pr-10"></h1>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
