import Dashboard from "../components/Dashboard";
import { firstDayOfTheMonth, lastDayOfTheMonth } from "../util/Helper";

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  let startDate = searchParams?.startDate || '' as string;
  let endDate = searchParams?.endDate || '' as string;
  if (!startDate || !endDate) {
    startDate = `${new Date().getFullYear()}-01-01`;
    endDate = `${new Date().getFullYear()}-12-01`;
  }
  return (
    <>
      <Dashboard startDate={startDate} endDate={endDate} />
    </>
  );
}
