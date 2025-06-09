export default function DepartCard({ Head, Detail }) {
    return (
        <div className="w-full h-24 p-4 rounded-xl border border-[#282666] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <h2 className="text-sm text-gray-500 font-light truncate">{Head}</h2>
            <p className="text-xl font-semibold text-gray-800 mt-1 truncate">{Detail}</p>
        </div>
    );
}