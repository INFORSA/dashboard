import {
  HomeIcon,
  FlagIcon,
  ChartBarIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import inforsa from '../../assets/inforsa.png';

export default function MiniSidebars({role}) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <HomeIcon className="h-6 w-6" />, path: "/", label: "Dashboard" },
  ];
  if(role === "superadmin"){
        menuItems.push(
            { icon: <FlagIcon className="h-6 w-6" />, path: "/dept/hrd", label: "Dept" },
            { icon: <InboxIcon className="h-6 w-6" />, path: "/permission/user", label: "Permission" },
            { icon: <ChartBarIcon className="h-6 w-6" />, path: "/hasil-penilaian", label: "Performance" },
        );
    }

  return (
    <div className="fixed top-0 left-0 h-screen w-16 bg-gradient-to-br from-[#dfe3ec] via-[#f3f4f6] to-[#e2e8f0]
                    hidden lg:block border pl-2 border-black z-50 flex flex-col items-center py-4 shadow-md
                    self-start transition-all duration-300 ease-in-out">
      <div className="mb-2 mr-2">
        <img src={inforsa} alt="" className="w-20 text-center"/>
      </div>
      {menuItems.map((item, i) => (
        <Tooltip key={i} content={item.label} placement="right" className="z-50">
          <button
            onClick={() => navigate(item.path)}
            className={`p-3 my-2 rounded-lg hover:bg-blue-100 ${
              location.pathname === item.path ? "bg-blue-200" : ""
            }`}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}