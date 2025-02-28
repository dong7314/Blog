"use client";

import { Fragment } from "react";
import * as styles from "./SearchDashboardWord.css";

import { Text } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";
import SearchDashboardItem from "../item/SearchDashboardItem";

export default function SearchDashboardWord() {
  const count = 20;
  const dataList: any = [
    {
      id: 29,
      title: "테스트 게시글입니다.22",
      description: "테스트 게시글",
      content:
        "# 테스트 게시글\n\n테스트 글입니다. `안녕` 하세요\n\n- 테스트 진행\n- 테스트\n\n1. 테스트\n2. 테스트2\n3. 테스트3",
      thumbnail:
        "https://api-minio.ldy-studio.com/dpost/315800eb-a987-41b9-a527-ab0419473ee9-bitcoin.jpg",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [{ id: 1, name: "테스트" }],
      likes: [],
      seriesOrder: 4,
      viewCount: 453,
      createdDate: new Date("2025-02-26T00:09:41.417Z"),
      updatedDate: new Date("2025-02-28T04:33:05.000Z"),
    },
    {
      id: 28,
      title: "게시글 테스트",
      description: "게시글 테스트입니다.",
      content: "ㅁㄴㅇㄻㄴㅇㄹ",
      thumbnail: "",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [{ id: 49, name: "ㅁㅇㄴㄹ" }],
      likes: [],
      seriesOrder: 1,
      viewCount: 19,
      createdDate: "2025-02-13T04:57:44.239Z",
      updatedDate: "2025-02-28T00:31:57.000Z",
    },
    {
      id: 27,
      title: "게시글 수정 후 테스트",
      description: "게시글 수정 후 테스트 글입니다.",
      content: "# 게시글 앵커 테스트\n\n게시글 수정 후 테스트 글입니다.1",
      thumbnail:
        "https://api-minio.ldy-studio.com/dpost/14424965-6059-4e96-85e6-ab49162ce56e-coding.jpg",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [{ id: 48, name: "수정 후" }],
      likes: [],
      seriesOrder: 3,
      viewCount: 412,
      createdDate: "2025-02-10T06:39:51.616Z",
      updatedDate: "2025-02-28T00:43:40.000Z",
    },
    {
      id: 24,
      title: "React에서 파일 다른 아이디로 테스트 용입니다.",
      description:
        "React에서 파일 업로드를 처리하는 방법과 백엔드와의 연동을 다룹니다.",
      content:
        "# 파일 업로드\n\n## 기본 사용법\n```jsx\nfunction FileUpload() {\n  const handleFileChange = (event) => {\n    const file = event.target.files[0];\n    console.log(file);\n  };\n\n  return <input type=\"file\" onChange={handleFileChange} />;\n}\n```\n\n## 파일 전송\n```javascript\nasync function uploadFile(file) {\n  const formData = new FormData();\n  formData.append('file', file);\n\n  await fetch('/api/upload', {\n    method: 'POST',\n    body: formData,\n  });\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/433/1000/1000.jpg?hmac=CM_56OBbdKMAQACgcVkYZhmloQd9SVYt2GUjdex0SbQ",
      author: {
        id: 2,
        name: "testId",
        description: "",
        email: "test01234567@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 37, name: "Frontend" },
        { id: 45, name: "File Upload" },
      ],
      likes: [{ id: 38 }, { id: 63 }],
      seriesOrder: null,
      viewCount: 67,
      createdDate: "2025-01-20T00:49:51.280Z",
      updatedDate: "2025-02-28T04:54:00.000Z",
    },
    {
      id: 23,
      title: "React에서 파일 업로드 처리하기",
      description:
        "React에서 파일 업로드를 처리하는 방법과 백엔드와의 연동을 다룹니다.",
      content:
        "# 파일 업로드\n\n## 기본 사용법\n```jsx\nfunction FileUpload() {\n  const handleFileChange = (event) => {\n    const file = event.target.files[0];\n    console.log(file);\n  };\n\n  return <input type=\"file\" onChange={handleFileChange} />;\n}\n```\n\n## 파일 전송\n```javascript\nasync function uploadFile(file) {\n  const formData = new FormData();\n  formData.append('file', file);\n\n  await fetch('/api/upload', {\n    method: 'POST',\n    body: formData,\n  });\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/152/1000/1000.jpg?hmac=PROUM_wXGBei6hWzAx70AbTAJJOuTh5-aSwVQAycddw",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 37, name: "Frontend" },
        { id: 45, name: "File Upload" },
      ],
      likes: [{ id: 64 }],
      seriesOrder: null,
      viewCount: 60,
      createdDate: "2025-01-16T05:39:31.708Z",
      updatedDate: "2025-02-28T00:32:41.000Z",
    },
    {
      id: 22,
      title: "React로 다국어 지원 구현하기: i18next",
      description:
        "i18next를 사용하여 React 애플리케이션에 다국어 지원을 추가하는 방법을 알아봅니다.",
      content:
        "# 다국어 지원\n\n## 설치\n```bash\nnpm install i18next react-i18next\n```\n\n## 설정\n### i18n 설정 파일\n```javascript\nimport i18n from 'i18next';\nimport { initReactI18next } from 'react-i18next';\n\ni18n.use(initReactI18next).init({\n  resources: {\n    en: { translation: { welcome: \"Welcome\" } },\n    ko: { translation: { welcome: \"환영합니다\" } },\n  },\n  lng: 'en',\n});\n\nexport default i18n;\n```\n\n## 사용법\n```jsx\nimport { useTranslation } from 'react-i18next';\n\nfunction App() {\n  const { t } = useTranslation();\n  return <p>{t('welcome')}</p>;\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/241/1000/1000.jpg?hmac=tUMtuGlfNAkuvkJej5Tmr8uxzCiwTX3ikw2KKk0Gc5M",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 43, name: "i18next" },
        { id: 44, name: "Localization" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 8,
      createdDate: "2025-01-16T05:39:15.747Z",
      updatedDate: "2025-01-22T00:43:54.000Z",
    },
    {
      id: 21,
      title: "React에서 CSS 모듈 활용하기",
      description:
        "CSS 모듈을 사용하여 React 컴포넌트 스타일링을 모듈화하는 방법을 알아봅니다.",
      content:
        "# CSS 모듈 사용법\n\n## 설정\nCRA 프로젝트에서는 기본적으로 CSS 모듈이 활성화되어 있습니다.\n\n### 파일 생성\n`Button.module.css`\n```css\n.button {\n  background-color: blue;\n  color: white;\n}\n```\n\n### 사용법\n```jsx\nimport styles from './Button.module.css';\n\nfunction Button() {\n  return <button className={styles.button}>클릭</button>;\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/782/1000/1000.jpg?hmac=sIlPbMYftAV8f-9K2XDvBzc1jT-APv22h7PnIQJfTwE",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 10, name: "CSS Modules" },
        { id: 42, name: "Styling" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:38:58.589Z",
      updatedDate: "2025-01-16T05:38:58.589Z",
    },
    {
      id: 20,
      title: "React에서 API 호출하기: Axios와 Fetch 비교",
      description: "Axios와 Fetch를 사용하여 API를 호출하는 방법을 비교합니다.",
      content:
        "# API 호출하기\n\n## Fetch 사용\n```javascript\nasync function fetchData() {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  console.log(data);\n}\n```\n\n## Axios 사용\n```javascript\nimport axios from 'axios';\n\nasync function fetchData() {\n  const { data } = await axios.get('/api/data');\n  console.log(data);\n}\n```\n\n## 차이점\n- Axios는 JSON 변환이 내장되어 있음.\n- Fetch는 브라우저 내장 API로 추가 설정이 필요.\n\n## 사용 사례\n- 간단한 호출: Fetch\n- 확장성 있는 호출: Axios",
      thumbnail:
        "https://fastly.picsum.photos/id/919/1000/1000.jpg?hmac=r2z3otrZPQ3qpKj5y0fa5LwNrqLx5-gvRBsb0IMTjNM",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 16, name: "Axios" },
        { id: 40, name: "API" },
        { id: 41, name: "Fetch" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:38:33.155Z",
      updatedDate: "2025-01-16T05:38:33.155Z",
    },
    {
      id: 19,
      title: "React에서 컴포넌트 재사용성 극대화하기",
      description:
        "React에서 컴포넌트를 재사용 가능하게 설계하는 방법을 알아봅니다.",
      content:
        "# 컴포넌트 재사용성\n\n## 재사용 가능한 컴포넌트 만들기\n### 버튼 컴포넌트\n```jsx\ntype ButtonProps = {\n  label: string;\n  onClick: () => void;\n};\n\nfunction Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n```\n\n## 합성 vs 상속\nReact는 합성을 권장합니다.\n```jsx\nfunction Layout({ header, content }) {\n  return (\n    <div>\n      <header>{header}</header>\n      <main>{content}</main>\n    </div>\n  );\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/955/1000/1000.jpg?hmac=zYuKrapyZEYRBhHLo0GivDqQ8-zZKIatxGX_tY_cgU4",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 38, name: "Reusability" },
        { id: 39, name: "Component Design" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:38:15.874Z",
      updatedDate: "2025-01-16T05:38:15.874Z",
    },
    {
      id: 18,
      title: "React와 TypeScript의 궁합: 기본 설정과 사용법",
      description:
        "React와 TypeScript를 함께 사용하는 방법과 장점을 알아봅니다.",
      content:
        "# React + TypeScript\n\n## 프로젝트 설정\n```bash\nnpx create-react-app my-app --template typescript\n```\n\n## 기본 사용법\n### Props 타입 지정\n```tsx\ntype ButtonProps = {\n  label: string;\n  onClick: () => void;\n};\n\nfunction Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n```\n\n### 상태 타입 지정\n```tsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState<number>(0);\n  return <p>Count: {count}</p>;\n}\n```",
      thumbnail: "",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 36, name: "TypeScript" },
        { id: 37, name: "Frontend" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:37:54.104Z",
      updatedDate: "2025-01-16T05:37:54.104Z",
    },
    {
      id: 17,
      title: "React에서 애니메이션 구현하기: Framer Motion 사용법",
      description:
        "Framer Motion을 활용하여 React 애니메이션을 구현하는 방법을 알아봅니다.",
      content:
        "# Framer Motion으로 애니메이션 구현하기\n\n## 설치\n```bash\nnpm install framer-motion\n```\n\n## 기본 사용법\n```jsx\nimport { motion } from 'framer-motion';\n\nfunction App() {\n  return (\n    <motion.div animate={{ x: 100 }} transition={{ duration: 0.5 }}>\n      애니메이션 효과\n    </motion.div>\n  );\n}\n```\n\n## 초기, 애니메이션, 종료 상태 지정\n```jsx\nfunction Box() {\n  return (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n    >\n      애니메이션 박스\n    </motion.div>\n  );\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/1015/1000/1000.jpg?hmac=wXOEk3ji7xYdDAiL84drLIJpFh7VuqcFYOpx9LPMos0",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 6, name: "React" },
        { id: 34, name: "Framer Motion" },
        { id: 35, name: "Animation" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:37:42.920Z",
      updatedDate: "2025-01-16T05:37:42.920Z",
    },
    {
      id: 16,
      title: "React의 Context API로 전역 상태 관리하기",
      description:
        "React의 Context API를 활용하여 전역 상태를 관리하는 방법을 알아봅니다.",
      content:
        "# Context API로 전역 상태 관리하기\n\n## Context API란?\nContext는 React에서 전역적으로 데이터를 공유하기 위해 사용되는 내장 기능입니다.\n\n## 사용법\n1. Context 생성\n```javascript\nimport { createContext } from 'react';\n\nexport const ThemeContext = createContext();\n```\n\n2. Provider로 값 전달\n```jsx\nfunction App() {\n  return (\n    <ThemeContext.Provider value={{ theme: 'dark' }}>\n      <ChildComponent />\n    </ThemeContext.Provider>\n  );\n}\n```\n\n3. Consumer로 값 사용\n```jsx\nimport { useContext } from 'react';\nimport { ThemeContext } from './ThemeContext';\n\nfunction ChildComponent() {\n  const { theme } = useContext(ThemeContext);\n  return <div>현재 테마: {theme}</div>;\n}\n```",
      thumbnail:
        "https://fastly.picsum.photos/id/802/1000/1000.jpg?hmac=EQx-gqoPk-I6SWh5V4cq1zEt7B9caa8reC0WgPNsOLQ",
      author: {
        id: 1,
        name: "admin",
        description: "항상 도전하고 노력하는 신입 주니어 개발자입니다!",
        email: "eaea7314@naver.com",
        thumbnail: "",
      },
      tags: [
        { id: 5, name: "Context API" },
        { id: 6, name: "React" },
        { id: 26, name: "State Management" },
      ],
      likes: [],
      seriesOrder: null,
      viewCount: 0,
      createdDate: "2025-01-16T05:37:23.548Z",
      updatedDate: "2025-01-16T05:37:23.548Z",
    },
  ];

  return (
    <div className={styles.wordContainer}>
      <div className={styles.countContainer}>
        <Text color="#3f3f3f">
          총 <span className={styles.count}>{count}</span>개의 게시글
        </Text>
      </div>
      <div className={styles.postItemContainer}>
        {dataList.map((data: IPost) => {
          return <SearchDashboardItem key={data.id} data={data}/>;
        })}
      </div>
    </div>
  );
}
