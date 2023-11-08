import AthleteList from "@/components/AthleteList";
import Link from "next/link";
import "@/styles/MainPageStyle.css"

export default function Home() {
  return (
    <div id="main-page">
      <header id="main-page-header">
        <p id="main-page-logo">Logo</p>
        <nav id="main-page-nav">
          <Link legacyBehavior href="/newSessionTemplate"><a id="goto-new-session-template">Ny økt mal</a></Link>
          <Link legacyBehavior href="/newQuestions"><a id="goto-new-questions">Nye spørsmål</a></Link>
          <Link  legacyBehavior href="/newAthlete"><a id="goto-new-athlete">Ny utøver</a></Link>
        </nav>
      </header>
      <AthleteList></AthleteList>
    </div>
  )
}
