import { Session } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";

type reportProps = {
    session: Session,
    athleteId: string,
}

export default function ReportComponent(props: reportProps) {
    const {session, athleteId} = props;

    return (
        <tr>
            {session.date ? (
                <td>{DateToString(session.date?.toString())}</td>
            ) : (
                <td>null</td>
            )}
            <td>{session.title}</td>
            <td>{session.type}</td>
            <td>{session.report?.status}</td>
            <td><Link legacyBehavior href="/report/[athleteId]/[sessionId]" as={`/report/${athleteId}/${session.id}`}><a id="reports-page-goto-report">Klikk her</a></Link></td>
        </tr>
    )
}