import { Session } from "@/types";
import Link from "next/link";
import { DateToString } from "./Functions";

type notificationCardProp = {
    session: Session,
}

export default function NotificationCard(props: notificationCardProp) {
    const {session} = props;

    return(
        <Link href="/">
            <article className="notification-card">
                <div className="notification-card-header">
                    <p className="notification-card-header-title">{session?.title}</p>
                    {session.date && (
                        <p className="notification-card-header-date">{DateToString(session.date.toISOString())}</p>
                    )}
                </div>
                <div className="notification-card-main">
                    <p className="notification-card-main-type">Type: {session.type}</p>
                    {session.tags && session.tags?.length > 4 ? (
                        <p className="notification-card-main-tags">Tags: {session.tags?.slice(0, 4).join(", ")}, ...</p>
                    ) : (
                        <p className="notification-card-main-tags">Tags: {session.tags?.slice(0, 4).join(", ")}</p>
                    )}
                </div>
            </article>
        </Link>
    )
}