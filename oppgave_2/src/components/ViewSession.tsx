import Link from "next/link"

import { Activity } from "@/types"
import { DateToString } from "./Functions"
import DownloadSessionButton from "./SessionDownload"

type sessionProps = {
    athleteId: string,
    session: Activity,
    toggleSession: any,
    isChecked: boolean,
    disabled: boolean
}

export default function ViewSession(props: sessionProps) {
    const {athleteId, session, toggleSession, isChecked, disabled} = props;
    
    function handleCheckmark() {
        toggleSession(session);
    }

    console.log(session.name)

    return (
        <tr>
            {session.date && (
                <td>{DateToString(session.date.toString())}</td>
            )}
            <td>{session.name}</td>
            <td>
                {session.tags ? 
                (session.tags.split(",")[0]) 
                : ""
                }
            </td>
            <td>
                {session.tags ? 
                 (session.tags.split(",").join(", "))
                : ""
                }
            </td>

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
            {(disabled || session.report === undefined) ? (
                <td></td>
            ) : (
                <td><input type="checkbox"
                    checked={isChecked} 
                    onChange={() => handleCheckmark()}/></td>
            )}
        </tr>
    )
}
