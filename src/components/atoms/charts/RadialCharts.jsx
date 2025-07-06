import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function RadialChart({ 
  isSidebarOpen, 
  data, 
  value,
  departmentName = "Departemen",
  month
}) {

  const chartConfig = {
    type: "radialBar",
    height: 300,
    series: [value],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: { enabled: true },
      },
      plotOptions: {
        radialBar: {
          startAngle: -100,
          endAngle: 100,
          hollow: { size: '60%' },
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5,
          },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: '32px',
              show: true,
              formatter: (val) => `${val}`,
            },
          },
        },
      },
      fill: { colors: ['#0f172a'] },
      labels: ['Progress'],
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
            Department of The Month
          </Typography>
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            {departmentName} - {month}
          </Typography>
        </div>
      </CardHeader>

      {/* Bagian Chart dan Review */}
      <CardBody className="flex flex-col md:flex-row gap-4 md:justify-between items-center w-full">
        {/* Chart + Emoji */}
        <div className="flex flex-col items-center w-1/2 border-r-2 border-gray-400">
          <Chart {...chartConfig} />
          <div className="flex gap-2 mt-2 text-2xl">
            <span>😊</span>
            <span>🙏</span>
            <span>👍</span>
            <span>🔥</span>
            <span>💙</span>
            <span>+{data.length}</span>
          </div>
        </div>

        {/* Chat Bubble */}
        <div className="flex flex-col w-1/2 md:w-2/3">
          {data.map((item, index) => (
            <div key={index} className="flex gap-4 p-4">
              <Typography variant="small" className="font-bold mb-1">{item.nama}</Typography>
              <Typography variant="small" className="font-bold mb-1 text-gray-500">-</Typography>
              <Typography variant="small" color="gray">{item.ulasan}</Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}