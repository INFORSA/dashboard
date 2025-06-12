export default function DepartCard({ Head, Detail }) {
    return (
        <div className="w-full h-24 p-4 rounded-xl border border-[#282666] bg-white/30 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <h2 className="text-sm text-gray-700 font-light truncate">{Head}</h2>
            <p className="text-md font-semibold text-gray-800 mt-1 truncate">{Detail}</p>
        </div>
    );
}