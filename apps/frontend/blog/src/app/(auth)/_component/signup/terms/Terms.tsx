"use client";

import { useEffect, useState } from "react";

import { Checkbox, Text } from "@frontend/coreui";
import * as styles from "./Terms.css";

export default function Terms() {
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

  return (
    <div className={styles.terms}>
      <Checkbox value={allTerms} onChange={handleAllTermsCheckboxChange}>
        <Text weight={500}>전체 동의</Text>
      </Checkbox>
      <div className={styles.termSeperate}></div>
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
    </div>
  );
}
