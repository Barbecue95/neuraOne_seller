import axios from "axios";

// Dummy of a service function
const userInstance = axios.create({
  baseURL: "https://localhost:3000/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default userInstance;

export const getUsers = async () => {
  const res = await userInstance.get("/");
  return res.data;
};
