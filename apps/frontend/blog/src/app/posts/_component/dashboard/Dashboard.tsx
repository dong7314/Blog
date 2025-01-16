"use client";

import { useState } from "react";

import * as styles from "./Dashboard.css";

import { PrePostDataList } from "@/app/home/data/PrePostDataEx";
import { Text } from "@frontend/coreui";
import HeaderItem from "./headerItem/HeaderItem";
import DashboardPost from "./post/DashboardPost";
import DashboardTabDecider from "./tab/DashboardTabDecider";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const exampleData = PrePostDataList;

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <HeaderItem index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
          트렌드
        </HeaderItem>
        <HeaderItem index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
          최신
        </HeaderItem>
        <HeaderItem index={2} activeTab={activeTab} setActiveTab={setActiveTab}>
          피드
        </HeaderItem>
      </header>
      <section className={styles.dashboardSection}>
        <DashboardTabDecider index={activeTab} />
      </section>
    </div>
  );
}
