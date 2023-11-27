import { ReportIntervalInfo } from "@/types"

type reportPageIntervalProps = {
    reportIntervalInfo: ReportIntervalInfo,
}

export default function ReportPageInterval(props: reportPageIntervalProps) {
    const {reportIntervalInfo} = props;

    return (
        <div className="report-page-interval-card">
            <div className="report-page-interval-card-expected">
                <p>Forventet =</p>
                <p>Tid: {reportIntervalInfo.durationExpected}</p>
                <p>Intensitet: {reportIntervalInfo.intensityZone}</p>
            </div>
            <div className="report-page-interval-card-intensity">
                <p>Intensitet =</p>
                <p>Min: {reportIntervalInfo.minIntensity}</p>
                <p>Max: {reportIntervalInfo.maxIntensity}</p>
                <p>Avg: {reportIntervalInfo.avrageIntensity}</p>
            </div>
            <div className="report-page-interval-card-heartrate">
                <p>Puls =</p>
                <p>Min: {reportIntervalInfo.minHeartRate}</p>
                <p>Max: {reportIntervalInfo.maxHeartRate}</p>
                <p>Avg: {reportIntervalInfo.avrageHeartRate}</p>
            </div>
            <div className="report-page-interval-card-speed">
                <p>Fart =</p>
                <p>Min: {reportIntervalInfo.minSpeed}</p>
                <p>Max: {reportIntervalInfo.maxSpeed}</p>
                <p>Avg: {reportIntervalInfo.avrageSpeed}</p>
            </div>
            <div className="report-page-interval-card-wattage">
                <p>Watt =</p>
                <p>Min: {reportIntervalInfo.minWattage}</p>
                <p>Max: {reportIntervalInfo.maxWattage}</p>
                <p>Avg: {reportIntervalInfo.avrageWattage}</p>
            </div>
            <p className="report-page-interval-card-time-used">Tid brukt: {reportIntervalInfo.durationAchieved}</p>
        </div>
    )
}