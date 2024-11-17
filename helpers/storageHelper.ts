type User = {
  gender: string;
  pfp: string;
  email: string;
};

export const updateStoreDataByEmail = (
  email: string,
  updatedData: Partial<User>
): void => {
  const users: User[] = JSON.parse(
    localStorage.getItem("additionalData") || "[]"
  );

  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    console.log("User updated:", users[userIndex]);
  } else {
    const newUser: User = {
      email,
      gender: updatedData.gender ?? "",
      pfp: updatedData.pfp ?? "",
    };
    users.push(newUser);
    console.log("New user added:", newUser);
  }

  localStorage.setItem("additionalData", JSON.stringify(users));
};

export const getStorageDataByEmail = (email: string): User | undefined => {
  const users: User[] = JSON.parse(
    localStorage.getItem("additionalData") || "[]"
  );

  const user = users.find((user) => user.email === email);

  return user;
};
