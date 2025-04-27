export default function CountCard({Detail, Count}){
    return(
        <div className="bg-gray-500 flex justify-center items-center w-full h-24 rounded-md">
            <h1 className="text-md font-base">Jumlah {Detail} : {Count}</h1>
        </div>
    )
}