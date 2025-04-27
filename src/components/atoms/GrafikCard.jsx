export default function GrafikCard({Detail, Count}){
    return(
        <div className="bg-gray-500 flex justify-center items-center w-full h-60 rounded-md">
            <h1 className="text-md font-base">Grafik {Detail} : {Count}</h1>
        </div>
    )
}