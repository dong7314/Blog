import DashboardTrend from "../trend/DashboardTrend";

type Props = {
  index: number;
};
export default function DashboardTabDecider({ index }: Props) {
  return <DashboardTrend />;
}
