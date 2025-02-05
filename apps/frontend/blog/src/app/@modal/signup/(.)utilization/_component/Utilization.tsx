import * as styles from "./Utilization.css";

import { Text } from "@frontend/coreui";

export default function Utilization() {
  return (
    <div className={styles.box}>
      <Text className={styles.title}>제1조 (목적)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        이 약관은 DPOST가 제공하는 모든 서비스(이하 "서비스")의 이용과 관련하여
        회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
      </Text>
      <br />
      <Text className={styles.title}>제2조 (용어의 정의)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. "서비스"란 개인이 운영하는 DPOST 웹사이트 및 관련 애플리케이션을 통해
        제공되는 모든 기능과 콘텐츠를 의미합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        2. "이용자"란 개인의 서비스에 접속하여 이 약관에 따라 서비스를 이용하는
        개인 또는 법인을 의미합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        3. "회원"이란 개인의 서비스에 가입하여 아이디 및 비밀번호를 생성한
        이용자를 의미합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        4. "비회원"이란 회원가입 없이 서비스를 이용하는 자를 의미합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        5. "게시물"이란 이용자가 서비스를 이용하여 작성한 글, 이미지, 댓글 등의
        모든 콘텐츠를 의미합니다.
      </Text>
      <br />
      <Text className={styles.title}>제3조 (약관의 효력 및 변경)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 본 약관은 서비스 초기 화면 또는 관리자가 정한 방법으로 공지함으로써
        효력이 발생합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        2. 관리자는 관련 법령을 준수하는 범위에서 약관을 개정할 수 있으며, 변경
        사항은 사전에 공지합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
        탈퇴할 수 있습니다.
      </Text>
      <br />
      <Text className={styles.title}>제4조 (서비스 이용)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 이용자는 관리자자가 제공하는 서비스 내에서 약관 및 운영정책을
        준수하여야 합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        2. 서비스 이용시간은 연중무휴 24시간 가능하나, 시스템 점검 및 기타
        사유로 일시적으로 중단될 수 있습니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        3. 관리자는 서비스 운영을 위해 이용자의 접속 기록 및 기타 정보를
        저장·관리할 수 있습니다.
      </Text>
      <br />
      <Text className={styles.title}>제5조 (이용자의 의무)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 이용자는 서비스 이용 시 다음과 같은 행위를 해서는 안 됩니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 타인의 정보를 도용하거나 부정하게 사용하는 행위
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 불법적인 콘텐츠를 게시하거나 배포하는 행위
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 서비스 및 제3자의 지식재산권을 침해하는 행위
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 기타 공공질서 및 미풍양속을 해치는 행위
      </Text>
      <br />
      <Text className={styles.title}>제6조 (서비스의 변경 및 중단)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 관리자는 운영상 또는 기술상의 필요에 따라 제공하는 서비스를
        변경하거나 중단할 수 있습니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        2. 서비스 중단 시 사전에 공지하며, 이용자는 이에 대해 이의를 제기할 수
        없습니다.
      </Text>
      <br />
      <Text className={styles.title}>제7조 (면책 조항)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 관리자자는 천재지변, 시스템 장애, 해킹 등의 불가항력적인 사유로 인한
        서비스 장애에 대해 책임을 지지 않습니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        2. 관리자는 이용자가 게재한 정보, 자료, 사실의 정확성 및 신뢰성에 대해
        보증하지 않습니다.
      </Text>
      <br />
      <Text className={styles.title}>제8조 (기타)</Text>
      <Text size="s" color="#595959" className={styles.p}>
        1. 본 약관에서 정하지 않은 사항은 관련 법령 및 상관례에 따릅니다.
      </Text>
      <Text size="s" color="#595959">
        2. 본 약관은 2025년 2월 5일부터 적용됩니다.
      </Text>
    </div>
  );
}
