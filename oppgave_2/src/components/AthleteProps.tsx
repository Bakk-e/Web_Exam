import Link from "next/link";

type athleteProps = {
    userId: string,
    gender: string,
    sport: string
}

export default function Athlete(props: athleteProps) {
    const {userId, gender, sport} = props;

    return (
        <tr>
            <td><Link legacyBehavior href="/athlete/[userId]" as={`/athlete/${userId}`}><a>{userId}</a></Link></td>
            <td>{gender}</td>
            <td>{sport}</td>
            <td><Link legacyBehavior href="/reports/[athleteId]" as={`/reports/${userId}`}><a>Klikk her</a></Link></td>
        </tr>
    )
}