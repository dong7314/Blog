import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./DashboardPost.css";

import { Icon, Text, TextButton } from "@frontend/coreui";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function DashboardPost() {
  const data = {
    id: 102,
    title: "평범한 3년차 개발자의 회고글",
    postDescription: "쉽지 않았던 1년. 생각보다 한게 많다.",
    content:
      " 나는 학점을 잘 받는거에 집중하는 평범한 대학생이었다. 컴퓨터 관련 학과를 전공했어도, 취업의 길은 다양했기에 개발자만을 꿈꾸지 않았다. 그렇게 시간은 어느새 4학년 1학기가 끝나가고 있었고, 곧이어 개발자를 목표로 삼은 계기를 마주하게 된다.\n 4학년의 마지막 학기를 인턴으로 대신할 수 있는 제도가 있었다. 인정해주는 학점 자체체는 적었지만, 1학년때부터 성실하게 학점을 꽉꽉 채워 들어서 인턴에 도전해볼 수 있었다. 평소에 재밌게 공부했던 전공 중 하나인 개발 분야로 지원했고, 서류 및 면접 전형 끝에풀스택 개발자로 합류하게 되었다.\n 회사에서 실제 업무를 맡기지는 않았지만, 여러가지 미션들을 수행하며 발표하는 것이 업무였다. 실무를 접해본다는 생각으로 최선을 다했다. 그 결과 채용 전환 오퍼가 왔지만, 더 체계적으로 웹 개발을 준비해보고 싶다는 생각에 다음을 기약했다.\n 이후로는 프론트엔드 개발에 몰두하게 된다. 백엔드에도 흥미가 있었지만, 프론트엔드 개발은 취미생활 하는것 만큼 시간이 잘갔다. 백엔드가 없으면 서비스가 없고, 프론트엔드가 없으면 서비스를 이용할 수 있는 유저가 없다는 말이 있다. 유저가 사용하기 쉬운 UI/UX를 구성하기 위해 기획 및 디자인과 소통하고, 유저에게 더 좋은 경험을 선사하기위해 최적화를 하며, 백엔드 개발자와 합을 맞춰나가는 과정이 즐거웠던 것 같다.",
    author: "HyunHo Lee",
    likes: 55,
    comment: 3,
    thumbnail: "/example1.jpg",
    tags: ["회고", "추억"],
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
    <div className={styles.postContainer}>
      <div className={styles.flexCenter}>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={380}
          height={290}
          className={styles.image}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.author}>
          <div className={styles.profile}>
            <Image
              src={"/profile.png"}
              alt={"profile-icon"}
              width={28}
              height={28}
              className={styles.profileIcon}
            />
            <TextButton weight={600} size="l">
              {data.author}
            </TextButton>
          </div>
          <Text size="s" color="#a5a5a5">
            {convertDate(data.createdDate)}
          </Text>
        </div>
        <div className={styles.title}>
          <Text weight={600} size="dxl">
            {data.title}
          </Text>
        </div>
        <Text color="#595959">
          <div className={styles.content}>{data.content}</div>
        </Text>
        <div className={styles.details}>
          <div className={styles.tags}>
            {data.tags.map((tag) => {
              return (
                <Text
                  className={styles.tag}
                  color="#7F7F7F"
                  key={`${data.id}-${tag}`}
                >
                  # {tag}
                </Text>
              );
            })}
          </div>
          <div className={styles.flexCenter}>
            <div className={styles.comments}>
              <Icon type="comment" size="l" />
              <Text className={styles.commentsCounter} color="#595959">
                {data.comment}
              </Text>
            </div>
            <div className={styles.favorites}>
              <Icon type="favorite" size="xl" />
              <Text className={styles.commentsCounter} color="#595959">
                {data.likes}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
