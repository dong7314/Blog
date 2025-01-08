import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./page.css";

import Anchor from "./_component/anchor/Anchor";
import DetailViewer from "./_component/viewer/DetailViewer";
import { Icon, Text, TextButton } from "@frontend/coreui";
import DetailTags from "./_component/tags/DetailTags";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function DetailPage() {
  const data = {
    id: 102,
    title: "평범한 3년차 개발자의 회고글",
    postDescription: "쉽지 않았던 1년. 생각보다 한게 많다.",
    content: `# NextJs 개발기

## Next js 란???

---

2022년 6월 15일 마이크로소프르는 27년만에 인터넷 익스플로러(IE) 11 브라우저 버전 대부분에 대한 지원을 종료하겠다고 선언하였다. 아직 국내 관공서에서는 익스플로러를 많이 사용하고 있어 아쉬운 사람들도 있겠지만, 개발자의 입장에서는 매우 반가운 소식이었다. 익스플로러 브라우저에서만 적용되지 않는 javascript, css 등 크로스브라우징 이슈가 많아서 대응하기 가장 힘든 브라우저였는데, 공식 종료 선언이라니..! 😇

덕분에 회사에서도 익스플로러 대응을 하지 않기로 하였고, 인터넷 익스플로러(IE11)로 접속한 사용자들에게 경고 페이지를 띄워주는 수단이 필요했다. 처음에는 getInitialProps를 사용해서 IE 사용자들에게 static 페이지를 보여줘야 할지 고민이었는데, 해당 메서드를 사용하면 _app.tsx 등 다른 페이지에서 영향이 가기 때문에 익스플로러 접속 시 url을 경고 페이지로 리다이렉트 시킬 수 있는 방법을 리서치 하였다. 그 중에 잘 정리된 Redirect IE11 users in NextJS글을 참고하였고, Next.js의 rewrites를 사용해 IE11 접속 유저들을 경고 페이지로 리다이렉트 시키는 방법을 적용하였다.

## NextJs Redirects

---

Next.js 버전 9.5부터는 next.config.js에서 \`redirects\`를 선언할 수 있다.

redirects 속성은 리디렉션 배열을 반환하는 비동기 함수를 받는다.

이 배열안에 있는 리디렉션에 따라 홈페이지에서 /ie_warning.html(public 폴더에서 제공되는 파일)로 이동되며, 서버가 302 HTTP 상태 코드를 반환한다는 의미인 'non-permanenet'로 설정된다. permanent가 true로 설정된 경우 301 상태 코드가 반환된다.

\`\`\`javascript
module.exports = {
  redirects: async () => {
    return [
      {
        source: '/',
        permanent: false,
        destination: '/ie_warning.html',
      },
    ]
  },
}
\`\`\`

## REST-API에서 동기/비동기 실행

---

REST-API에서 데이터의 요청과 응답을 위해 axios를 사용하여 비동기 통신을 사용해주었습니다. 이 때에 코드는 상단에서부터 실행되면서 백엔드 컴퓨터에 데이터를 요청하고 데이터를 가져와서 응답을 줍니다.

위 코드는 요청된 응답을 가져와 데이터에 저장하고, 저장된 데이터를 콘솔 창에 찍어주도록 작성된 코드입니다.

해당 코드를 실행하면 콘솔창에는 리턴된 Promise 객체가 보여지게 됩니다.

### 동기 통신(async/awiat)

---

우리가 해당 코드에서 Promise 객체가 아닌 요청된 데이터 값을 받아오려면 어떻게 해야할지 알아봅시다.

결론을 말씀 드립자면, await는 동기 통신을 위해 사용합니다.

만일 await가 없다면 updateBoard가 비동기 처리를 하는동안 기다려주지 않고 바로 다음 줄로 넘어가기 때문에 백에 등록 되기 전에 “수정이 완료되었습니다.”가 뜨게 됩니다.
따라서 updateBoard를 동기처리를 해서 등록될 때 까지 기다리도록 해주는게 await의 역할입니다.

즉 await를 사용함으로써 비동기 처리 함수인 updateBoard를 동기처리 함수로 바꿔주어 제대로 등록이 될때까지 기다려주는 역할을 하는 것 입니다.
`,
    author: "HyunHo Lee",
    likes: 55,
    comment: 3,
    tags: ["회고", "추억", "일기장"],
    series: {
      title: "회사생활",
      list: [
        "평범한 1년차 개발자의 회고글",
        "평범한 2년차 개발자의 회고글",
        "평범한 3년차 개발자의 회고글",
      ],
    },
    thumbnail: "/example3.jpg",
    createdDate: new Date(2024, 11, 16),
  };

  const convertDate = (date: Date) => {
    const givenDate = dayjs(date);
    const oneDayAgo = dayjs().subtract(1, "day");
    return givenDate.isBefore(oneDayAgo)
      ? givenDate.format("YYYY년 MM월 DD일")
      : givenDate.fromNow();
  };

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Text size="xh" weight={700}>
            {data.title}
          </Text>
        </div>
        <div className={styles.info}>
          <span className={styles.infoSpan}>
            <TextButton weight={600}>{data.author}</TextButton>
            <Text color="#595959">
              &nbsp;&nbsp;•&nbsp;&nbsp;{convertDate(data.createdDate)}
            </Text>
          </span>
          <span className={styles.infoSpan}>
            <Icon type="secret_open"></Icon>
            <Text color="#595959">&nbsp;116</Text>
          </span>
        </div>
        {data.tags.length > 0 && (
          <div className={styles.tags}>
            <DetailTags tags={data.tags} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <DetailViewer content={data.content} imgUrl={data.thumbnail} />
        <Anchor />
      </div>
      <div className={styles.favorites}></div>
    </div>
  );
}
