"use client"

import Link from "next/link";
import "@/styles/MainPageStyle.css"
import Athlete from "@/components/Athlete";
import { useEffect, useState } from "react";
import { AthleteMini } from "@/types";

export default function Home() {
  const [athleteInfos, setAthleteInfos] = useState<AthleteMini[]>([]);

  useEffect(() =>{
    const getAthleteInfos = async () => {
      const response = await fetch("/api/athletes", {
        method: "get",
      });
      const result = (await response.json()) as {data: AthleteMini[]};
      setAthleteInfos(result.data);
    }
    getAthleteInfos();
  }, []);

  return (
    <div id="main-page">
      <header id="main-page-header">
        <p id="main-page-logo">Logo</p>
        <nav id="main-page-nav">
          <Link legacyBehavior href="/newSessionTemplate"><a id="goto-new-session-template">Ny økt mal</a></Link>
          <Link legacyBehavior href="/newQuestions"><a id="goto-new-questions">Opprett spørsmål</a></Link>
          <Link  legacyBehavior href="/newAthlete"><a id="goto-new-athlete">Ny utøver</a></Link>
        </nav>
      </header>
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
                {athleteInfos.map((athlete) => (
                  <Athlete id={athlete.id} gender={athlete.gender} sport={athlete.sport}></Athlete>
                ))}
            </table>
        </div>
    </div>
  )
}
