"use client";

import { Period } from "../Dashboard";
import DashboardRecent from "../recent/DashboardRecent";
import DashboardTrend from "../trend/DashboardTrend";

type Props = {
  index: number;
  period: Period;
};
export default function DashboardTabDecider({ index, period }: Props) {
  if (index === 0) {
    return <DashboardTrend period={period}/>;
  } else if (index === 1) {
    return <DashboardRecent />;
  } else {
    return <></>;
  }
}
