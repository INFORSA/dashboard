export default function Banner() {
    // const today = new Date();
    // const formattedDate = today.toLocaleDateString("id-ID", {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });

    return (
        <div className="mt-3 border-b-4 border-gray-500 pb-4 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-semibold text-gray-800">
                    INFORSA <span className="font-thin">DASHBOARD</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Bersatu Untuk Berjaya!
                </p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
                <p className="text-sm text-gray-700 font-medium">Selamat datang kembali 👋</p>
            </div>
        </div>
    );
}