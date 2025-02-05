import * as styles from "./Privacy.css";

import { Text } from "@frontend/coreui";

export default function Privacy() {
  return (
    <div className={styles.box}>
      <Text className={styles.title}>1. 수집하는 개인정보의 항목</Text>
      <Text size="s" color="#595959" className={styles.p}>
        관리자는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 필수 정보: 닉네임임, 이메일 주소
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 선택 정보: 프로필 사진
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 자동 수집 정보: 접속 기록, 쿠키, IP 주소
      </Text>
      <br />
      <Text className={styles.title}>2. 개인정보의 수집 및 이용 목적</Text>
      <Text size="s" color="#595959" className={styles.p}>
        수집된 개인정보는 다음과 같은 목적으로 이용됩니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 회원가입 및 본인 확인
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 서비스 제공 및 운영
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 서비스 이용 통계 및 분석
      </Text>
      <br />
      <Text className={styles.title}>3. 개인정보의 보유 및 이용 기간</Text>
      <Text size="s" color="#595959" className={styles.p}>
        관리자는 이용자의 개인정보를 아래의 기간 동안 보관 및 이용합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 회원 탈퇴 시: 즉시 삭제
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 관련 법령에 따른 보관 기간
      </Text>
      <br />
      <Text className={styles.title}>4. 개인정보 제3자 제공 및 위탁</Text>
      <Text size="s" color="#595959" className={styles.p}>
        회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단,
        법령에 따라 국가기관의 요청이 있는 경우 예외적으로 제공될 수 있습니다.
      </Text>
      <br />
      <Text className={styles.title}>5. 개인정보 보호를 위한 조치</Text>
      <Text size="s" color="#595959" className={styles.p}>
        회사는 이용자의 개인정보 보호를 위해 다음과 같은 조치를 시행합니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 개인정보 접근 권한 최소화
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 암호화 기술 적용
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        - 보안 시스템 운영 및 관리
      </Text>
      <br />
      <Text className={styles.title}>6. 개인정보 관리 책임자</Text>
      <Text size="s" color="#595959" className={styles.p}>
        개인정보 보호 관련 문의사항은 아래의 개인정보 보호 책임자에게 연락
        바랍니다.
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 이름: 이동엽
      </Text>
      <Text size="s" color="#595959" className={styles.p}>
        &nbsp;- 이메일: eaea7314@naver.com
      </Text>
      <Text size="s" color="#595959">
        &nbsp;- 본 약관은 2025년 2월 5일부터 적용됩니다.
      </Text>
    </div>
  );
}
