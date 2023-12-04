import { Interval } from "@/types"

type viewIntervalProps = {
    interval: Interval,
}

export default function ViewInterval(props: viewIntervalProps) {
    const {interval} = props;
    return (
        <>
            <tr className="session-page-intervals-point">
                <th>Tid: </th>
                <td>{interval.duration}</td>
            </tr>
            <tr className="session-page-intervals-point">
                <th>Intensitet: </th>
                <td>{interval.intensityZone}</td>
            </tr>
        </>
    )
}