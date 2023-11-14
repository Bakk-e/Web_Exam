import Link from "next/link";

type sessionProps = {
    sessionId: string
}

export default function Session(props: sessionProps) {
    const {sessionId} = props;

    return (
        <tr>
            <td>23.05.2024</td>
            <td>Legs</td>
            <td>Sykling</td>
            <td>Uphill, rough</td>
            <td>Ingen rapport</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
        </tr>
    )
}