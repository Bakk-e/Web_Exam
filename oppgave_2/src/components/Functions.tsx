export function DateToString(date: Date) {
    const day = date.toString().slice(8, 10);
    const month = date.toString().slice(5, 7);
    const year = date.toString().slice(0, 4);

    return `${day}.${month}.${year}`;
}

export function GetCurrentDate() {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    return `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`
}