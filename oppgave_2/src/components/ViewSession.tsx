import { Session } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";
import DownloadSessionButton from "./SessionDownload";

type sessionProps = {
    athleteId: string,
    session: Session,
    toggleSession: any,
    isChecked: boolean,
    disabled: boolean
}

export default function ViewSession(props: sessionProps) {
    const {athleteId, session, toggleSession, isChecked, disabled} = props;
    
    function handleCheckmark() {
        toggleSession(session);
    }

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
            <td><Link legacyBehavior href="/session/[athleteId]/[sessionId]" as={`/session/${athleteId}/${session.id}`}><a>Klikk her</a></Link></td>
            {session.report ? (
                <td id="athlete-page-sessions-table-status">{session.report?.status}</td>
            ) : (
                <td>Ingen rapport</td>
            )}
            {session.report ? (
                <td></td>
            ) : (
                <td><Link legacyBehavior href="/newReport/[athleteId]/[sessionId]" as={`/newReport/${athleteId}/${session.id}`}><a>Klikk her</a></Link></td>
            )}
            {session.report ? (
                <td><DownloadSessionButton session={session}></DownloadSessionButton></td>
            ): (
                <td>Klikk her</td>
            )}
            <td>Klikk her</td>
            <td><Link legacyBehavior href="/editSession/[athleteId]/[sessionId]" as={`/editSession/${athleteId}/${session.id}`}><a>Klikk her</a></Link></td>
            <td>Klikk her</td>
            {(disabled && session.report) ? (
                <td></td>
            ) : (
                <td><input type="checkbox"
                    checked={isChecked} 
                    onChange={() => handleCheckmark()}/></td>
            )}
        </tr>
    )
}