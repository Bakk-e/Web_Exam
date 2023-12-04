import { Interval, Activity } from "@/types"

type answerIntervalProps = {
    session: Activity,
    interval: Interval
}

export default function AnswerInterval(props: answerIntervalProps) {
    const {session, interval} = props;

    return (
        <div id="new-report-page-interval">
            <div id="new-report-page-interval-expected">
                <table id="new-report-page-interval-expected-table">
                    <thead>
                        <tr className="new-report-page-interval-expected-point">
                            <th></th>
                            <th>Tid</th>
                            <th>Intensitet</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="new-report-page-interval-expected-point">
                            <th>Forventet</th>
                            <td>{interval?.duration}</td>
                            <td>{interval?.intensityZone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="new-report-page-interval-achived">
                <table id="new-report-page-interval-achived-table">
                    <thead>
                        <tr className="new-report-page-interval-achived-point">
                            <th></th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Avg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {session && session.parameters && session.parameters?.includes("intensity") && (
                            <tr className="new-report-page-interval-achived-point">
                                <th>Intensitet</th>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                            </tr>
                        )}
                        {session && session.parameters && session.parameters?.includes("heartbeat") && (
                            <tr className="new-report-page-interval-achived-point">
                                <th>Puls</th>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                                <td><input className="new-report-page-interval-achived-point-input"/></td>
                            </tr>
                        )}
                        {session && session.parameters && session.parameters?.includes("speed") && (
                        <tr className="new-report-page-interval-achived-point">
                            <th>Fart</th>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                        </tr>
                        )}
                        {session && session.parameters && session.parameters?.includes("wattage") && (
                        <tr className="new-report-page-interval-achived-point">
                            <th>Watt</th>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                        </tr>
                        )}
                        <tr>
                            <th></th>
                            <th>Tid</th>
                            <td><input className="new-report-page-interval-achived-point-input"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}