"use client"

import Link from "next/link";
import "@/styles/MainPageStyle.css"
import Athlete from "@/components/Athlete";
import { useEffect, useState } from "react";
import { AthleteMini } from "@/types";
import AthleteSearch from "@/components/AthleteSearch";
import Notifications from "@/components/Notifications";

export default function Home() {
  const [athleteInfos, setAthleteInfos] = useState<AthleteMini[]>([]);
  const [searchedAthlete, setSearchedAthletes] = useState<AthleteMini[]>([]);

  useEffect(() =>{
    const getAthleteInfos = async () => {
      const response = await fetch("/api/athletes", {
        method: "get",
      });
      const result = (await response.json()) as {data: AthleteMini[]};
      setAthleteInfos(result.data);
      setSearchedAthletes(result.data);
    }
    getAthleteInfos();
  }, []);

  function onSearch(filteredAthletes: AthleteMini[]) {
    setSearchedAthletes(filteredAthletes);
  }

  return (
    <div id="main-page">
      <header id="main-page-header">
        <p id="main-page-logo">Logo</p>
        <nav id="main-page-nav">
          <Link legacyBehavior href="/newSessionTemplate"><a id="goto-new-session-template">Ny økt mal</a></Link>
          <Link legacyBehavior href="/newQuestions"><a id="goto-new-questions">Opprett spørsmål</a></Link>
          <Link  legacyBehavior href="/newAthlete"><a id="goto-new-athlete">Ny utøver</a></Link>
          <Notifications></Notifications>
        </nav>
      </header>
      <div id="main-page-athlete-list">
            <AthleteSearch athletes={athleteInfos} onSearch={onSearch}></AthleteSearch>
            <table id="main-page-athlete-table">
              <thead>
                <tr>
                    <th>Id</th>
                    <th>Kjønn</th>
                    <th>Sport</th>
                    <th>Profil</th>
                    <th>Rapporter</th>
                </tr>
              </thead>
              <tbody>
                {searchedAthlete.map((athlete) => (
                  <Athlete id={athlete.id} gender={athlete.gender} sport={athlete.sport} key={athlete.id}></Athlete>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  )
}
