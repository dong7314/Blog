"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import * as styles from "./SignupTerms.css";

import { Checkbox, Icon, Text } from "@frontend/coreui";

type Props = {
  inspectChange: Function;
};
export default function SignupTerms({ inspectChange }: Props) {
  const [allTerms, setAllTerms] = useState(false);
  const [firstTerm, setFirstTerm] = useState(false);
  const [secondTerm, setSecondTerm] = useState(false);

  const handleAllTermsCheckboxChange = (value: boolean) => {
    setAllTerms(value);
    setFirstTerm(value);
    setSecondTerm(value);
  };

  useEffect(() => {
    setAllTerms(!!(firstTerm && secondTerm));
  }, [firstTerm, secondTerm]);

  useEffect(() => {
    inspectChange(allTerms);
  }, [allTerms]);

  return (
    <div className={styles.terms}>
      <Checkbox value={allTerms} onChange={handleAllTermsCheckboxChange}>
        <Text weight={500}>전체 동의</Text>
      </Checkbox>
      <div className={styles.termSeperate} />
      <div className={styles.checkbox}>
        <Checkbox
          value={firstTerm}
          onChange={(value) => {
            setFirstTerm(value);
          }}
        >
          <Text size="s" color="#595959">
            [필수] DPOST 이용약관 동의
          </Text>
        </Checkbox>
        <Link href="/signup/utilization">
          <Text size="s" color="#595959" className={styles.telegram}>
            전문 <Icon size="s" type="right" />
          </Text>
        </Link>
      </div>
      <div className={styles.checkbox}>
        <Checkbox
          value={secondTerm}
          className={styles.lastCheckbox}
          onChange={(value) => {
            setSecondTerm(value);
          }}
        >
          <Text size="s" color="#595959">
            [필수] DPOST 개인정보 수집 및 이용 동의
          </Text>
        </Checkbox>
        <Link href="/signup/privacy">
          <Text size="s" color="#595959" className={styles.telegram}>
            전문 <Icon size="s" type="right" />
          </Text>
        </Link>
      </div>
    </div>
  );
}
