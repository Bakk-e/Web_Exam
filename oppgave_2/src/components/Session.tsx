import { Session } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";

type sessionProps = {
    session: Session
}

export default function Session(props: sessionProps) {
    const {session} = props;

    return (
        <tr>
            {session.date && (
                <td>{DateToString(session.date)}</td>
            )}
            <td>{session.title}</td>
            <td>{session.type}</td>
            {session.tags && (
                <td>{session.tags[0]}, {session.tags[1]}</td>
            )}
            <td>{session.reportStatus?.status}</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
        </tr>
    )
}