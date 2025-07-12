import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { toast } from "react-toastify";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAddReviewMutation, useDeleteReviewMutation, useGetDeptQuery } from "../../../services/dept";
import { useGetCurrentUserQuery } from "../../../services/login";
import { useGetUserByNamaQuery } from "../../../services/user";
import { TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

export default function RadialChart({ 
  isSidebarOpen, 
  title,
  data, 
  value,
  departmentName = "Departemen",
  month,
  refetch
}) {
  const user = useGetCurrentUserQuery();
  const username = user?.data.username;
  const role = user?.data.role;
  const {data:userData} = useGetUserByNamaQuery(username);
  const userLogin = userData ? userData[0].id_user : "";
  const {data:deptData} = useGetDeptQuery();
  const deptList = deptData?.data ?? []; // fallback ke array kosong
  const deptId = deptList.find((item) => item.nama === departmentName);
  const deptTarget = deptId?.id_depart;
  const [reviewText, setReviewText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [addReview] = useAddReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleSubmitReview = async () => {
    try {
      const payload = {
        userLogin,      // pastikan ini adalah user yang sedang login
        deptTarget,       // id departemen yang sedang direview
        month,           // dalam bentuk nama bulan (misal: "Juli")
        isi: reviewText  // isi review yang diketik user
      };

      await addReview(payload);
      // console.log("Kirim Review:", payload);
      setReviewText(""); // kosongkan setelah submit
      refetch();
      toast.success("Review berhasil dikirim!");
    } catch (error) {
      console.error("Gagal kirim review:", error);
      toast.error("Gagal mengirim review.");
    }
  };

  const handleDeleteReview = async(id) => {
    const ok = await Swal.fire({
        title: "Hapus Review?",
        text: `Yakin hapus review?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then((r) => r.isConfirmed);

    if (!ok) return;
    try {
        await deleteReview(id);
        refetch();
        toast.success("Review berhasil dihapus");
      } catch (err) {
        toast.error("Gagal menghapus review");
        console.error("Delete error:", err);
      }
  };
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
  const getEmojiFeedback = (value) => {
    if (value < 50) {
      return { emoji: "💪", label: "Ayo Semangat!" };
    } else if (value < 65) {
      return { emoji: "🙂", label: "Lumayan Bagus, Tingkatkan!" };
    } else if (value < 81) {
      return { emoji: "😊", label: "Bagus, Bisa Ditingkatkan lagi!" };
    } else {
      return { emoji: "🔥", label: "Sangat Bagus, Pertahankan!" };
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 250);
    return () => clearTimeout(timeout);
  }, [isSidebarOpen]);

  return (
    <Card className="w-full h-full border border-md border-black bg-white/30 backdrop-blur-md hover:bg-white">
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
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            {departmentName} - {month}
          </Typography>
        </div>
      </CardHeader>

      {/* Bagian Chart dan Review */}
      <CardBody className={`flex flex-col md:flex-row gap-4 md:justify-between ${role !== "superadmin" ? "items-center" : "items-end"} w-full h-full`}>
        {/* Chart + Emoji */}
        <div className="flex flex-col items-center w-1/2 border-r-2 border-gray-400">
          <Chart {...chartConfig} />
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="text-3xl">{getEmojiFeedback(value).emoji}</div>
            <Typography variant="small" className="text-gray-700 text-sm">
              {getEmojiFeedback(value).label}
            </Typography>
          </div>
        </div>

        {/* Chat Bubble */}
        <div className="flex flex-col w-1/2 md:w-2/3">
          <div className="flex flex-col gap-2 h-30 overflow-y-auto scrollbar-none">
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const isUserReview = item.nama_reviewer === username;
                return(
                  <div key={index} className="grid grid-cols-[120px,12px,1fr] gap-4 py-1 px-4" onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)} >
                    <Typography variant="small" className="font-bold w-26 mb-1 truncate">
                      {item.nama_reviewer || item.nama_staff}
                    </Typography>
                    <Typography variant="small" className="font-bold mb-1 text-gray-500 w-2">-</Typography>
                    <div className="flex gap-2">
                      <Typography variant="small" color="gray" className="w-full">
                        {item.isi}
                      </Typography>
                      {hoveredIndex === index && isUserReview && (
                        <TrashIcon
                          className="w-[18px] h-[18px] text-red-500 transform cursor-pointer"
                          onClick={() => handleDeleteReview(item.id_review)}
                        />
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex gap-4 p-4 justify-center items-center">
                <Typography variant="small" className="font-bold mb-1">
                  Belum ada review
                </Typography>
              </div>
            )}
          </div>
          {/* Input review */}
          { role === "superadmin" && 
            <div className="flex items-center gap-2 mt-4 p-4 border-t border-gray-300">
              <input
                type="text"
                placeholder="Tulis review kamu..."
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                onClick={handleSubmitReview}
                disabled={!reviewText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Kirim
              </button>
            </div>
          }
        </div>
      </CardBody>
    </Card>
  );
}