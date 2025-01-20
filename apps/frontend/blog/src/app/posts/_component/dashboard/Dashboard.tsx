"use client";

import { useEffect, useState } from "react";

import * as styles from "./Dashboard.css";

import { Select } from "@frontend/coreui";
import HeaderItem from "./headerItem/HeaderItem";
import DashboardTabDecider from "./tabDecider/DashboardTabDecider";

export type Period = "day" | "week" | "month" | "year";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [period, setPeriod] = useState<Period>("month");

  useEffect(() => {
    setPeriod("month");
  }, [activeTab]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div className={styles.headerTabs}>
          <HeaderItem
            index={0}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            트렌드
          </HeaderItem>
          <HeaderItem
            index={1}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            최신
          </HeaderItem>
          <HeaderItem
            index={2}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            피드
          </HeaderItem>
        </div>
        {activeTab === 0 && (
          <div className={styles.period}>
            <Select
              name="period"
              options={[
                { value: "day", label: "오늘" },
                { value: "week", label: "이번 주" },
                { value: "month", label: "이번 달" },
                { value: "year", label: "올해" },
              ]}
              defaultValue={{ value: "month", label: "이번 달" }}
              onChange={(value: Period) => {
                setPeriod(value);
              }}
            ></Select>
          </div>
        )}
      </header>
      <section className={styles.dashboardSection}>
        <DashboardTabDecider
          key={activeTab}
          index={activeTab}
          period={period}
        />
      </section>
    </div>
  );
}
