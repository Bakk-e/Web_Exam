import Link from "next/link";

type athleteProps = {
    id: string,
    gender: string,
    sport: string
}

export default function Athlete(props: athleteProps) {
    const {id, gender, sport} = props;

    return (
        <tr>
            <td><Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${id}`}><a>{id}</a></Link></td>
            <td>{gender}</td>
            <td>{sport}</td>
            <td><Link legacyBehavior href="/sessions/[athleteId]" as={`/sessions/${id}`}><a>Klikk her</a></Link></td>
            <td><Link legacyBehavior href="/reports/[athleteId]" as={`/reports/${id}`}><a>Klikk her</a></Link></td>
        </tr>
    )
}