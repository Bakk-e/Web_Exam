import { ReportIntervalInfo } from "@/types"

type reportPageIntervalProps = {
    reportIntervalInfo: ReportIntervalInfo,
}

export default function ReportPageInterval(props: reportPageIntervalProps) {
    const {reportIntervalInfo} = props;

    return (
        <div className="report-page-interval">
            <div className="report-page-interval-expected">
                <table className="report-page-interval-expected-table">
                    <tr className="report-page-interval-expected-point">
                        <th></th>
                        <th>Tid</th>
                        <th>Intensitet</th>
                    </tr>
                    <tr className="report-page-interval-expected-point">
                        <th>Forventet</th>
                        <td>{reportIntervalInfo.durationExpected}</td>
                        <td>{reportIntervalInfo.intensityZone}</td>
                    </tr>
                </table>
            </div>
            <div className="report-page-interval-achived">
                <table className="report-page-interval-achived-table">
                    <tr className="report-page-interval-achived-point">
                        <th></th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Avg</th>
                    </tr>
                    <tr className="report-page-interval-achived-point">
                        <th>Intensitet</th>
                        <td>{reportIntervalInfo.minIntensity}</td>
                        <td>{reportIntervalInfo.maxIntensity}</td>
                        <td>{reportIntervalInfo.avrageIntensity}</td>
                    </tr>
                    <tr className="report-page-interval-achived-point">
                        <th>Puls</th>
                        <td>{reportIntervalInfo.minHeartRate}</td>
                        <td>{reportIntervalInfo.maxHeartRate}</td>
                        <td>{reportIntervalInfo.avrageHeartRate}</td>
                    </tr>
                    <tr className="report-page-interval-achived-point">
                        <th>Fart</th>
                        <td>{reportIntervalInfo.minSpeed}</td>
                        <td>{reportIntervalInfo.maxSpeed}</td>
                        <td>{reportIntervalInfo.avrageSpeed}</td>
                    </tr>
                    <tr className="report-page-interval-achived-point">
                        <th>Watt</th>
                        <td>{reportIntervalInfo.minWattage}</td>
                        <td>{reportIntervalInfo.maxWattage}</td>
                        <td>{reportIntervalInfo.avrageWattage}</td>
                    </tr>
                    <tr className="report-page-interval-achived-point">
                        <th></th>
                        <td>Tid brukt</td>
                        <td>{reportIntervalInfo.durationAchieved}</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}