import { useProfileAPIRequest } from "@/services/hooks/profileHooks";
import {
  ApiResponse,
  ErrorResponse,
  ProfilePostProps,
  servicesParams,
} from "@/types/service";
import { useMutation, useQuery } from "react-query";

const useGetProfile = ({ enabled = true }: servicesParams) => {
  const { getProfile } = useProfileAPIRequest();

  return useQuery<ApiResponse<Profile>, ErrorResponse>({
    queryKey: ["getProfile"],
    queryFn: async () => {
      try {
        return await getProfile();
      } catch (error) {
        console.log(error);
      }
    },
    enabled,
    staleTime: 2 * 60 * 1000,
  });
};

const useCreateProfile = () => {
  const { createProfile } = useProfileAPIRequest();

  return useMutation<void, ErrorResponse, ProfilePostProps>({
    mutationFn: async ({ birthday, height, interests, username, weight }) => {
      try {
        await createProfile({
          birthday,
          height,
          interests,
          username,
          weight,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};

const useUpdateProfile = () => {
  const { updateProfile } = useProfileAPIRequest();

  return useMutation<ApiResponse<Profile>, ErrorResponse, ProfilePostProps>({
    mutationFn: async ({ birthday, height, interests, username, weight }) => {
      try {
        return await updateProfile({
          birthday,
          height,
          interests,
          username,
          weight,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export { useGetProfile, useCreateProfile, useUpdateProfile };
