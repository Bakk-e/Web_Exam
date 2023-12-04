import { AthleteMini, Athlete} from "@/types"
import { useState } from "react";

type athleteSearchProps = {
    //athletes: AthleteMini[],
    athletes: Athlete[],
    onSearch: any
}


//Aquired from Chat-gpt
export default function AthleteSearch(props: athleteSearchProps) {
    const {athletes, onSearch} = props;
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearch(e: any) {
        e.preventDefault();
        
        const filteredAthletes = athletes.filter(athlete =>
            athlete.userId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        onSearch(filteredAthletes);
    }

    return (
        <form id="main-page-search">
            <input id="main-page-search-input" 
            type="text" 
            placeholder="Søk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
            <button id="main-page-search-button" onClick={handleSearch}>Search</button>
        </form>
    )
}