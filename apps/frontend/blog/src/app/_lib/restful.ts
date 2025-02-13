"use server";

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
    `${process.env.NEXT_BASE_URL}/${url}${queryParams ? "?" + queryParams : ""}`,
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

  let jsonData = null;
  try {
    const text = await res.text();
    jsonData = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
  }

  const data: { ok: boolean; data: any } = {
    ok: res.ok,
    data: jsonData,
  };

  return data;
}

export async function modifyData(
  url: string,
  method: "post" | "delete" | "put",
  tags: string[],
  body?: any,
  accessToken?: string,
) {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/${url}`, {
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

  let jsonData = null;
  try {
    const text = await res.text();
    jsonData = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
  }

  const data: { ok: boolean; data: any } = {
    ok: res.ok,
    data: jsonData,
  };

  return data;
}
