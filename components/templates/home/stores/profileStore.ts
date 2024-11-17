import { create } from "zustand";

interface profileProps {
  profile: Profile;
  setProfile: (data: Profile) => void;
}

const useProfileStore = create<profileProps>((set) => ({
  profile: {
    picture: "",
    birthday: new Date(),
    email: "",
    height: "",
    gender: "",
    horoscope: "",
    interests: [],
    username: "",
    weight: "",
    zodiac: "",
  },
  setProfile: (data) => set({ profile: data }),
}));

export { useProfileStore };
