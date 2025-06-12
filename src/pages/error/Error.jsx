export default function Error(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Logo Organisasi */}
                <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    {/* Placeholder logo - ganti dengan logo organisasi Anda */}
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">LOGO</span>
                    </div>
                </div>
                </div>

                {/* 404 Text */}
                <div className="mb-6">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    404
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan. 
                    Mungkin halaman telah dipindahkan atau tidak tersedia.
                </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Coba Lagi
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-slate-600"
                >
                    Kembali
                </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute bottom-32 left-16 w-4 h-4 bg-blue-300 rounded-full animate-pulse opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
            </div>
        </div>
    )
}