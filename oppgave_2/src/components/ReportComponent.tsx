import { Activity } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";

type reportProps = {
    session: Activity,
    athleteId: string,
}

export default function ReportComponent(props: reportProps) {
    const {session, athleteId} = props;

    return (
        <tr>
            {session.date ? (
                <td className="reports-page-reports-text">{DateToString(session.date?.toString())}</td>
            ) : (
                <td>null</td>
            )}
            <td className="reports-page-reports-text">{session.name}</td>
            <td className="reports-page-reports-text">{session.type}</td>
            <td className="reports-page-reports-text">{session.report?.status}</td>
            <td className="reports-page-reports-link"><Link legacyBehavior href="/report/[athleteId]/[sessionId]" as={`/report/${athleteId}/${session.id}`}><a id="reports-page-goto-report">Klikk her</a></Link></td>
        </tr>
    )
}