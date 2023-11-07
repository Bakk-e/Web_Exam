import Athlete from "./Athlete";

export default function AthleteList() {
    return (
        <div id="main-page-athlete-list">
            <form id="main-page-search">
                <input id="main-page-search-input" type="text" placeholder="Søk"/>
                <button id="main-page-search-button">Search</button>
            </form>
            <table id="main-page-athlete-table">
                <tr>
                    <th>Id</th>
                    <th>Kjønn</th>
                    <th>Sport</th>
                    <th>Rapporter</th>
                </tr>
                <Athlete id="ola-nor-123" gender="Hankjønn" sport="Sykling"></Athlete>
                <Athlete id="ale-bar-432" gender="Hankjønn" sport="Roing"></Athlete>
                <Athlete id="nor-hem-465" gender="Hunkjønn" sport="Slalom"></Athlete>
                <Athlete id="noa-ble-783" gender="Hankjønn" sport="Skihopp"></Athlete>
            </table>
        </div>
    )
}