export const isHaveAccessToLocalHelper = (emailUser: string) => {
  const email = localStorage.getItem("email");
  return emailUser === email;
};
