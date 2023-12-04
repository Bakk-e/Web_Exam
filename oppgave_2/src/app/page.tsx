"use client"

import Link from "next/link";
import "@/styles/MainPageStyle.css"
import AthleteProps from "@/components/AthleteProps";
import { useEffect, useState } from "react";
import { Athlete } from "@/types";
import AthleteSearch from "@/components/AthleteSearch";
import Notifications from "@/components/Notifications";

export default function Home() {
  const [athleteInfos, setAthleteInfos] = useState<Athlete[]>([]);
  const [searchedAthlete, setSearchedAthletes] = useState<Athlete[]>([]);

  useEffect(() =>{
    const getAthleteInfos = async () => {
      const response = await fetch("/api/athletes", {
        method: "GET",
      });
      const result = (await response.json()) as {data: Athlete[]};
      setAthleteInfos(result.data);
      setSearchedAthletes(result.data);
    }
    getAthleteInfos();
  }, []);

  function onSearch(filteredAthletes: Athlete[]) {
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
        <div className="search-bar-container">
          <AthleteSearch athletes={athleteInfos} onSearch={onSearch}></AthleteSearch>
        </div>
      <div id="main-page-athlete-list">
        <table id="main-page-athlete-table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Kjønn</th>
              <th>Sport</th>
              <th>Profil</th>
              <th>Rapporter</th>
            </tr>
          </thead>
          <tbody>
            {searchedAthlete.map((athlete) => (
              <AthleteProps userId={athlete.userId} gender={athlete.gender} sport={athlete.sport}></AthleteProps>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
