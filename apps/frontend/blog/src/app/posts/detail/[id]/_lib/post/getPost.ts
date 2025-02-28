export async function getPost(id: number) {
  // 1시간 동안 캐싱 적용해서 조회수 올리는 것을 막도록 설정
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api.post/${id}`, {
    method: "get",
    credentials: "include",
    next: {
      tags: ["post", "detail", `${id}`],
      revalidate: 3600,
    },
    cache: "force-cache",
  });

  let jsonData = null;
  try {
    const text = await res.text();
    jsonData = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
  }

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return jsonData;
}
