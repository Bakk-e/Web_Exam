import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "@/styles/NotificationComponentStyle.css"
import { useState } from "react";
import NotificationCard from "./NotificationCard";
import { Session } from "@/types";


export default function Notifications() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Session[]>([
        {title: "Legs", date: new Date("2023-12-05"), type: "Cycling", tags: ["Rough", "Uphill", "Downhill", "Terrain"]},
        {title: "Chest", date: new Date("2024-02-24"), type: "Compund", tags: ["Rough", "Uphill", "Downhill", "Terrain", "Wavey"]},
        {title: "Back", date: new Date("2025-08-30"), type: "Rowing", tags: ["Rough", "Uphill", "Downhill", "Terrain"]},
    ]);

    function toggleDrawer() {
        //setUnreadCount(unreadCount + 1);
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div id="notification">
            <div id="notification-bell" onClick={toggleDrawer}>
                <FontAwesomeIcon id="notification-bell-icon" icon={faBell}/>
                {unreadCount > 0 && (
                    <div id="notification-count">{unreadCount}</div>
                )}
            </div>
            <div className={`notification-overlay ${isNotificationOpen ? 'open' : ''}`}  onClick={toggleDrawer}></div>
            <div className={`notification-drawer ${isNotificationOpen ? 'open' : ''}`}>
                <div id="notification-drawer-header">
                    <p id="notification-drawer-header-title">Varslinger</p>
                    <button id="notification-drawer-header-exit" onClick={toggleDrawer}>X</button>
                </div>
                <div id="notification-drawer-notifications">
                    {notifications.map((notification, index) => (
                        <NotificationCard key={notification.id} session={notification}></NotificationCard>
                    ))}
                    {notifications.length == 0 && (
                        <p>Ingen Varslinger</p>
                    )}
                </div>
            </div>
        </div>
    );
}