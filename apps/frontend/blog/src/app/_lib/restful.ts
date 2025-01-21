export async function fetchData(
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

export async function modifyData(
  url: string,
  method: "post" | "delete" | "put",
  tags: string[],
  body?: any,
  accessToken?: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
    method,
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
