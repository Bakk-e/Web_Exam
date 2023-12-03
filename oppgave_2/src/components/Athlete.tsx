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
            <td>{id}</td>
            <td>{gender}</td>
            <td>{sport}</td>
            <td><Link legacyBehavior href="/athlete/[id]" as={`/athlete/${id}`}><a>Klikk her</a></Link></td>
            <td><Link legacyBehavior href="/reports/[athleteId]" as={`/reports/${id}`}><a>Klikk her</a></Link></td>
        </tr>
    )
}