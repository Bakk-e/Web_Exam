import { Session } from '@/types';
import * as XLSX from 'xlsx'
import { GetCurrentDate } from './Functions';

//Chat-GPT
//Need to create a new type for session which is a flattend version (no nested objects, or arrays) maybe?
//try to add more info to object before (intervals and questions)

function FlattenObject(object: any,): Record<string, any> {
    const result: Record<string, any> = {};

    function recursive(current: any, prop: string) {
        if (current instanceof Date) {
            result[prop] = current;
        } else if (typeof current === "object") {
            for (const p in current) {
                if (current.hasOwnProperty(p)) {
                    recursive(current[p], prop + "." + p);
                }
            }
        } else {
            result[prop] = current;
        }
    }

    for (const p in object) {
        if (object.hasOwnProperty(p)) {
            recursive(object[p], p);
        }
    }

    return result;
}

function ConvertSessionToExcel(session: Session) {
    const sessionCopy = {...session};

    const flattendSesion = FlattenObject(sessionCopy);
    const flattendQuestions = FlattenObject(sessionCopy.questions);
    const flattendIntervals = FlattenObject(sessionCopy.intervals);

    const sessionSheet = XLSX.utils.json_to_sheet([flattendSesion]);
    const questionsSheet = XLSX.utils.json_to_sheet([flattendQuestions]);
    const intervalsSheet = XLSX.utils.json_to_sheet([flattendIntervals]);

    const sessionBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(sessionBook, sessionSheet, "Session");
    XLSX.utils.book_append_sheet(sessionBook, questionsSheet, "Questions");
    XLSX.utils.book_append_sheet(sessionBook, intervalsSheet, "Intervals");
    const excelBuffer = XLSX.write(sessionBook, {bookType: "xlsx", type: "array"});
    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

    return blob;
}

type downloadSessionButtonProps = {
    session: Session
}

export default function DownloadSessionButton(props: downloadSessionButtonProps) {
    const { session } = props;
    function DownloadSessionAsExcel() {
        const blob = ConvertSessionToExcel(session);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${GetCurrentDate()}_${session.title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <button onClick={DownloadSessionAsExcel}>Klikk her</button>
    )
}
