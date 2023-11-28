import { Session } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";
import DownloadSessionButton from "./SessionDownload";

type sessionProps = {
    session: Session
}

export default function Session(props: sessionProps) {
    const {session} = props;

    return (
        <tr>
            {session.date && (
                <td>{DateToString(session.date.toString())}</td>
            )}
            <td>{session.title}</td>
            <td>{session.type}</td>
            {session.tags && (
                <td>{session.tags.slice(0, 2).join(", ")}</td>
            )}
            <td>{session.report?.status}</td>
            {session.report?.status != "no" ? (
                <td><DownloadSessionButton session={session}></DownloadSessionButton></td>
            ): (
                <td>Klikk her</td>
            )}
            <td>Klikk her</td>
            <td>Klikk her</td>
            <td>Klikk her</td>
        </tr>
    )
}