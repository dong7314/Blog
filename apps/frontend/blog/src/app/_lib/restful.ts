export default async function get(url: string, tags: string[], params?: any) {
  let queryParams;
  if (params) {
    queryParams = new URLSearchParams(params).toString();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${url}${queryParams ? "?" + queryParams : ""}`,
    {
      method: "get",
      next: {
        tags,
      },
    },
  );

  return res;
}
