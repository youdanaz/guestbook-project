"use client";

import { useEffect, useState } from "react";

type Guestbook = {
  id: number;
  nickname: string;
  content: string;
};

const API_BASE = "http://34.229.198.28:8080/api/guestbook"; // EC2 퍼블릭 IP + 백엔드 포트

export default function Home() {
  const [list, setList] = useState<Guestbook[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  // 목록 조회
  const loadGuestbook = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        console.error("API error:", res.status);
        setList([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setList(data);
      } else {
        console.error("응답이 배열이 아님:", data);
        setList([]);
      }
    } catch (e) {
      console.error("fetch 실패:", e);
      setList([]);
    }
  };

  // 등록
  const submit = async () => {
    if (!nickname || !content) return;

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, content }),
      });

      if (!res.ok) {
        console.error("POST 실패:", res.status);
        return;
      }

      // 백엔드 JSON 확인
      const result = await res.json();
      console.log("등록 성공, 백엔드 JSON:", result);

      setNickname("");
      setContent("");
      loadGuestbook();
    } catch (e) {
      console.error("POST fetch 실패:", e);
    }
  };

  // 처음 로드 시 목록 불러오기
  useEffect(() => {
    loadGuestbook();
  }, []);

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">방명록</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="bg-black text-white px-4 py-2 mb-6" onClick={submit}>
        등록
      </button>

      <ul>
        {list.map((g) => (
          <li key={g.id} className="border-b py-2">
            <strong>{g.nickname}</strong>
            <p>{g.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
