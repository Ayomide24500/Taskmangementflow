import axios from "axios";

const URL: string = "http://localhost:2266/api/v1";

export const createTask = async (projectID: any) => {
  try {
    const response = await axios.post(`${URL}/create-task/${projectID}`);
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getTasksById = async (taskId: any) => {
  try {
    await axios.get(`${URL}/get-task/${taskId}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    console.error("Error getting task:", error);
    throw error;
  }
};
