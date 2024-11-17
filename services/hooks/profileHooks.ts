import { ProfilePostProps } from "@/types/service";
import useAxiosAuth from "../client/useAxiosAuth";

const useProfileAPIRequest = () => {
  const api = useAxiosAuth();

  const getProfile = async () => {
    try {
      const res = await api.get("/api/getProfile");
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const createProfile = async (data: ProfilePostProps) => {
    try {
      const res = await api.post("/api/createProfile", data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateProfile = async (data: ProfilePostProps) => {
    try {
      const res = await api.put("/api/updateProfile", data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { getProfile, createProfile, updateProfile };
};

export { useProfileAPIRequest };
