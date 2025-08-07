import inforsa from '../../assets/inforsa.png';

export default function Error(){
    return(
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Logo Organisasi */}
                <div className="mb-8">
                    <div className="flex justify-center rounded-full">
                        <img src={inforsa} alt="" className="w-36 text-center"/>
                    </div>
                </div>

                {/* 404 Text */}
                <div className="mb-6">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500 mb-4">
                    404
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan. 
                    Mungkin halaman telah dipindahkan atau tidak tersedia.
                </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-blue-500 to-red-600 hover:from-blue-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Coba Lagi
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="w-full bg-green-300 hover:bg-green-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-slate-600"
                >
                    Kembali
                </button>
                </div>

                {/* Decorative Elements */}
                {/* <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute bottom-32 left-16 w-4 h-4 bg-blue-300 rounded-full animate-pulse opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-50"></div> */}
            </div>
        </div>
    )
}