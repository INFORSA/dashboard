export default function DepartCard({Head, Detail}){
    return(
        <div className="border border-black flex justify-center items-center w-full h-24 gap-1 rounded-md p-3 text-center">
            <h1 className="text-md font-base">{Head ?? null}</h1>
            <h1 className="text-md font-base">{Detail}</h1>
        </div>
    )
}