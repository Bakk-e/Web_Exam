import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "@/styles/NotificationComponentStyle.css"
import { useState } from "react";
import NotificationCard from "./NotificationCard";
import { Activity } from "@/types";


export default function Notifications() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Activity[]>([
        {name: "Legs", date: new Date("2023-12-05"), type: "Cycling", tags: "Rough, Uphill, Downhill, Terrain"},
        {name: "Chest", date: new Date("2024-02-24"), type: "Compund", tags: "Rough, Uphill, Downhill, Terrain, Wavey"},
        {name: "Back", date: new Date("2025-08-30"), type: "Rowing", tags: "Rough, Uphill, Downhill, Terrain"},
    ]);

    function toggleDrawer() {
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
                    {notifications.map((notification) => (
                        <NotificationCard key={`${notification.id} + ${notification.name}`} session={notification}></NotificationCard>
                    ))}
                    {notifications.length == 0 && (
                        <p>Ingen Varslinger</p>
                    )}
                </div>
            </div>
        </div>
    );
}