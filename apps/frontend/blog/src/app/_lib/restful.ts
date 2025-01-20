export async function get(
  url: string,
  tags: string[],
  params?: any,
  accessToken?: string,
) {
  let queryParams;
  if (params) {
    queryParams = new URLSearchParams(params).toString();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${url}${queryParams ? "?" + queryParams : ""}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      next: {
        tags,
      },
    },
  );

  return res;
}

export async function post(
  url: string,
  tags: string[],
  body?: any,
  accessToken?: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
    next: {
      tags,
    },
  });

  return res;
}
