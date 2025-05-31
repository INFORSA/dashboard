export default function DepartCard({Head, Detail}){
    return(
        <div className="bg-gray-500 flex justify-center items-center w-full h-24 rounded-md">
            <h1 className="text-md font-base">{Head} : {Detail}</h1>
        </div>
    )
}