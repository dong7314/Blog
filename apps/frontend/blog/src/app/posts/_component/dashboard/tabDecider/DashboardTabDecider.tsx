"use client";

import { Period } from "../Dashboard";
import DashboardFeed from "../tab/feed/DashboardFeed";
import DashboardTrend from "../tab/trend/DashboardTrend";
import DashboardRecent from "../tab/recent/DashboardRecent";

type Props = {
  index: number;
  period: Period;
};
export default function DashboardTabDecider({ index, period }: Props) {
  if (index === 0) {
    return <DashboardTrend period={period} />;
  } else if (index === 1) {
    return <DashboardRecent />;
  } else {
    return <DashboardFeed />;
  }
}
