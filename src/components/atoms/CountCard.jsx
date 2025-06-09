import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import CountUp from "react-countup";

export default function CountCard({ Detail, Count }) {
    return (
        <div className="relative border border-[#282666] bg-white shadow-sm rounded-xl p-4 hover:bg-[#282666] hover:text-white transition-colors duration-300 w-full h-full">
            {/* Titik tiga pojok kanan atas */}
            <div className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <EllipsisHorizontalIcon color="black" className="w-7 h-7"/>
            </div>

            {/* Detail */}
            <div className="text-sm font-thin text-gray-500 mb-1">
                {Detail}
            </div>

            {/* Count */}
            <div className="text-3xl font-bold">
                <CountUp end={Count} duration={2} />
            </div>
        </div>
    );
}