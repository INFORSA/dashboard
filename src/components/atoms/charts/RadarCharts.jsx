import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";

export default function RadarChart({ isSidebarOpen, data, detail }) {
  const categories = detail.map((d) => d.label);

  const series = useMemo(() => {
    return data.map((col) => ({
        name: col.nama_anggota,
        data: detail.map((item) => parseFloat(col[item.key]))
    }));
  }, [data, detail]);

  const chartConfig = {
    type: "radar",
    height: 400,
    series,
    options: {
        chart: { toolbar: { show: false } },
        xaxis: {
        categories,
        labels: { show: true, style: { colors: "#616161", fontSize: "12px" } },
        },
        colors: [
          "#0f172a",  // Aspek 1
          "#334155",  // Aspek 2
          "#1e293b",  // Aspek 3
          "#475569",  // Aspek 4
          "#64748b",  // Aspek 5
          "#94a3b8",  // Aspek 6
          "#cbd5e1",  // Aspek 7
        ],
        tooltip: { theme: "dark" },
        stroke: { width: 2 },
        fill: { opacity: 0.3 },
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
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Perbandingan Aspek Penilaian
          </Typography>
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            Radar chart untuk melihat perbandingan antar aspek penilaian.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}