import CountUp from "react-countup";

export default function CountCard({Detail, Count}){
    return(
        <div className="bg-gray-500 flex justify-center items-center w-full h-24 rounded-md">
            <h1 className="text-md font-base">{Detail} : <span><CountUp end={Count}/></span></h1>
        </div>
    )
}