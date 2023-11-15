export function DateToString(date: Date) {
    const day = date.toString().slice(8, 10);
    const month = date.toString().slice(5, 7);
    const year = date.toString().slice(0, 4);

    return `${day}.${month}.${year}`;
}


/*
function ToCSV(data) {
    const header = Object.keys()
}

export function DownloadSessionAsExcel() {

}
*/
