import Link from "next/link"

import { Activity } from "@/types"
import { DateToString } from "./Functions"
import DownloadSessionButton from "./SessionDownload"

type sessionProps = {
  athleteId: string
  activity: Activity
}

export default function ViewSession(props: sessionProps) {
  const { athleteId, activity } = props

  return (
    <tr>
      {activity.date && <td>{DateToString(activity.date.toString())}</td>}
      <td>
        <Link
          legacyBehavior
          href="/activity/[athleteId]/[activityId]"
          as={`/activity/${athleteId}/${activity.id}`}
        >
          <a>{activity.title}</a>
        </Link>
      </td>
      <td>{activity.type}</td>

      <td>
        {activity.tags && Array.isArray(activity.tags)
          ? activity.tags.slice(0, 2).join(", ")
          : ""}
      </td>

      {activity.report ? (
        <td id="athlete-page-sessions-table-status">
          {activity.report?.status}
        </td>
      ) : (
        <td>Ingen rapport</td>
      )}

      {activity.report ? (
        <td></td>
      ) : (
        <td>
          <Link
            legacyBehavior
            href="/newReport/[athleteId]/[activityId]"
            as={`/newReport/${athleteId}/${activity.id}`}
          >
            <a>Klikk her</a>
          </Link>
        </td>
      )}
      {activity.report ? (
        <td>
          <DownloadSessionButton session={activity}></DownloadSessionButton>
        </td>
      ) : (
        <td>Klikk her</td>
      )}
      <td>Klikk her</td>
      <td>
        <Link
          legacyBehavior
          href="/editSession/[athleteId]/[activityId]"
          as={`/editSession/${athleteId}/${activity.id}`}
        >
          <a>Klikk her</a>
        </Link>
      </td>
      <td>Klikk her</td>
    </tr>
  )
}
