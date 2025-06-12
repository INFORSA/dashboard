import inforsa from '../../assets/inforsa.png';

export default function Loading(){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                {/* Logo yang berputar seperti koin */}
                <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center shadow-2xl animate-spin-coin">
                    {/* Placeholder logo - ganti dengan logo organisasi Anda */}
                    <div className="flex justify-center rounded-full">
                        <img src={inforsa} alt="" className="w-36 text-center"/>
                    </div>
                </div>
                {/* Efek cahaya */}
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 animate-pulse"></div>
                </div>
                
                {/* Teks Loading dengan animasi titik */}
                <div className="text-white text-xl font-semibold">
                Loading
                <span className="inline-block animate-dots">
                    <span className="animate-dot1">.</span>
                    <span className="animate-dot2">.</span>
                    <span className="animate-dot3">.</span>
                </span>
                </div>
            </div>
        </div>
    )
}