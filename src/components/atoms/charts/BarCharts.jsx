import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";

export default function BarChart({ isSidebarOpen, data, header, detail }) {

  const categories = data.map((d) => d.nama_anggota || d.nama_departemen);

  const series = useMemo(() => {
    return detail.map((col) => ({
      name: col.label,
      data: data.map((item) => item[col.key]),
    }));
  }, [data, detail]);

  const chartConfig = {
    type: "bar",
    height: 300,
    series,
    options: {
      chart: {
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { horizontal: true, columnWidth: "50%" },
      },
      xaxis: {
        categories,
        labels: { style: { fontSize: "12px", color: "#616161" } },
      },
      yaxis: {
        labels: { style: { fontSize: "12px", color: "#616161" } },
      },
      colors: ["#0f172a", "#1e293b", "#334155"],
      tooltip: { theme: "dark" },
      grid: {
        show: true,
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 250);
    return () => clearTimeout(timeout);
  }, [isSidebarOpen]);

  return (
    <Card className="w-full border border-md border-black bg-white/30 backdrop-blur-md hover:bg-white">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            {header}
          </Typography>
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            Visualisasi stacked bar untuk melihat komposisi nilai per anggota.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}