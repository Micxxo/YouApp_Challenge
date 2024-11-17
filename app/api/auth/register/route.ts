const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (req: Request) => {
  const { email, username, password } = await req.json();

  const res = await fetch(`${baseURL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await res.json();

  if (res.ok) return new Response(JSON.stringify(data), { status: 201 });
  else
    return new Response(JSON.stringify(data), {
      status: res.status,
    });
};
