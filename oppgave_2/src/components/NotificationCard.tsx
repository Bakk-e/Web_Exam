import { Activity } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";

type notificationCardProp = {
    session: Activity,
}

export default function NotificationCard(props: notificationCardProp) {
    const {session} = props;

    return(
        <Link href="/">
            <div className="notification-card">
                <div className="notification-card-header">
                    <p className="notification-card-header-title">{session?.name}</p>
                    {session.date && (
                        <p className="notification-card-header-date">{DateToString(session.date.toISOString())}</p>
                    )}
                </div>
                <div className="notification-card-main">
                    <p className="notification-card-main-type">Type: {session.type}</p>
                    {session.tags && session.tags?.split(", ").length > 4 ? (
                        <p className="notification-card-main-tags">Tags: {session.tags?.split(", ").slice(0, 4).join(", ")}, ...</p>
                    ) : (
                        <p className="notification-card-main-tags">Tags: {session.tags?.split(", ").slice(0, 4).join(", ")}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}