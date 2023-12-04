import axios from "axios";

const URL: string = "http://localhost:2266/api/v1";

export const createProject = async (projectData: any) => {
  try {
    const response = await axios.post(`${URL}/create-project`, projectData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getProject = async () => {
  try {
    return await axios.get(`${URL}/get-project`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
export const deletedProject = async (projectID: any) => {
  try {
    return await axios
      .delete(`${URL}/delete-project/${projectID}`)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
