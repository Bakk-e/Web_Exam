import { Activity, Report } from '@/types';
import * as XLSX from 'xlsx'
import { GetCurrentDate } from './Functions';

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

function ConvertSessionToExcel(session: Activity) {
    const sessionCopy = {...session};
    
    const flattendQuestions = FlattenObject(sessionCopy.questions);
    const flattendIntervals = FlattenObject(sessionCopy.intervals);
    const questionsSheet = XLSX.utils.json_to_sheet([flattendQuestions]);
    const intervalsSheet = XLSX.utils.json_to_sheet([flattendIntervals]);

    delete sessionCopy.questions
    delete sessionCopy.intervals

    const flattendSesion = FlattenObject(sessionCopy);
    const sessionSheet = XLSX.utils.json_to_sheet([flattendSesion]);


    const sessionBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(sessionBook, sessionSheet, "Session");
    XLSX.utils.book_append_sheet(sessionBook, questionsSheet, "Questions");
    XLSX.utils.book_append_sheet(sessionBook, intervalsSheet, "Intervals");
    const excelBuffer = XLSX.write(sessionBook, {bookType: "xlsx", type: "array"});
    const mrBlobby = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

    return mrBlobby;
}

type downloadSessionButtonProps = {
    session: Activity
}

export default function DownloadSessionButton(props: downloadSessionButtonProps) {
    const { session } = props;
    function DownloadSessionAsExcel() {
        const mrBlobby = ConvertSessionToExcel(session);
        const url = URL.createObjectURL(mrBlobby);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${GetCurrentDate()}_${session.name}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <button onClick={DownloadSessionAsExcel}>Klikk her</button>
    )
}
