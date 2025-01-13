import Image from "next/image";

import * as styles from "./DetailProfile.css";

import { Button, Text, TextButton } from "@frontend/coreui";

export default function DetailProfile() {
  const data = {
    id: 1,
    name: "administrator",
    description: "안녕하세요 항상 도전하고 배우고 있는 프론트 개발자입니다!",
    email: "eaea7314@naver.com",
    thumbnail: "",
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <Image
            src={"/profile.png"}
            alt={"profile-icon"}
            width={72}
            height={72}
            className={styles.profileIcon}
          />
          <div className={styles.profileUser}>
            <TextButton size="dxl" weight={600}>
              {data.name}
            </TextButton>
            <Text color="#7F7F7F" size="s" className={styles.email}>
              {data.email}
            </Text>
          </div>
        </div>
        <div className={styles.followButtonBox}>
          <Button rounded={true} type="primary" size="l">
            팔로우
          </Button>
        </div>
      </div>
      <div className={styles.profileDescription}>
        <Text color="#595959">{data.description}</Text>
      </div>
    </div>
  );
}
