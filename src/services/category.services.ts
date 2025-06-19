import { User, UserSortOption } from "@/types/users.types";
import axios from "axios";

// Dummy of a service function
const categoryInstance = axios.create({
  baseURL: "http://localhost:3000/api/categories",
  headers: {
    "Content-Type": "application/json",
  },
});

export default categoryInstance;

export const getCategories = async () => {
  const res = await categoryInstance.get("/");
  return res.data;
};