import { useParams } from "react-router-dom";

export default function Departement(){
    const { Name } = useParams();
    console.log(Name);

    return(
        <div>Ini Halaman {Name}</div>
    )
}