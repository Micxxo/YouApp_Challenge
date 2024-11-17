type registerProps = {
  email: string;
  username: string;
  password: string;
};

export const registerHooks = async ({
  email,
  username,
  password,
}: registerProps) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  return res;
};
