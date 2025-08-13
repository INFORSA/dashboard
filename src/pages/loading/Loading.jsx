import inforsa from '../../assets/inforsa.png';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,200,255,0.6)] animate-flip">
            <img src={inforsa} alt="Logo" className="w-28 h-28 object-contain" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-40 blur-lg animate-pulse"></div>
        </div>
        <div className="text-white text-2xl font-bold tracking-wider animate-bounce-in">
          Loading
          <span className="inline-block animate-pulse-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}