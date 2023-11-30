import { AthleteMini } from "@/types"
import { useState } from "react";

type athleteSearchProps = {
    athletes: AthleteMini[],
    onSearch: any
}


//Aquired from Chat-gpt
export default function AthleteSearch(props: athleteSearchProps) {
    const {athletes, onSearch} = props;
    const [searchTerm, setSearchTerm] = useState("");

    function clearSearch(e: any) {
        e.preventDefault();

        setSearchTerm("");
        handleSearch(e, true);
    }

    function handleSearch(e: any, clear: boolean) {
        e.preventDefault();

        let filteredAthletes: AthleteMini[];

        if (!clear) {
            filteredAthletes = athletes.filter(athlete =>
                athlete.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        } else {
            filteredAthletes = athletes.filter(athlete =>
                athlete.id.toLowerCase().includes("")
            )
        }
        
        onSearch(filteredAthletes);
    }

    return (
        <form id="main-page-search">
            <input id="main-page-search-input" 
            type="text" 
            placeholder="Søk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
            <button id="main-page-search-clear" onClick={clearSearch}>x</button>
            <button id="main-page-search-button" onClick={(e) => handleSearch(e, false)}>Search</button>
        </form>
    )
}