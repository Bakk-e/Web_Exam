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
        </tr>
    )
}