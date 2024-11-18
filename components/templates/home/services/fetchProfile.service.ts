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
        throw error;
      }
    },
    enabled,
    staleTime: 2 * 60 * 1000,
  });
};

const useCreateProfile = () => {
  const { createProfile } = useProfileAPIRequest();

  return useMutation<ApiResponse<Profile>, ErrorResponse, ProfilePostProps>({
    mutationFn: async ({
      birthday,
      height,
      interests,
      username,
      weight,
      name,
    }) => {
      try {
        return await createProfile({
          birthday,
          height,
          name,
          interests,
          username,
          weight,
        });
      } catch (error) {
        throw error;
      }
    },
  });
};

const useUpdateProfile = () => {
  const { updateProfile } = useProfileAPIRequest();

  return useMutation<ApiResponse<Profile>, ErrorResponse, ProfilePostProps>({
    mutationFn: async ({
      birthday,
      height,
      interests,
      username,
      weight,
      name,
    }) => {
      try {
        return await updateProfile({
          birthday,
          height,
          name,
          interests,
          username,
          weight,
        });
      } catch (error) {
        throw error;
      }
    },
  });
};

export { useGetProfile, useCreateProfile, useUpdateProfile };
