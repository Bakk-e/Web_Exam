import { Interval } from "@/types"

type viewIntervalProps = {
    interval: Interval,
}

export default function ViewInterval(props: viewIntervalProps) {
    const {interval} = props;
    return (
        <div>
            <p>Tid: {interval.duration}</p>
            <p>Intensitets sone: {interval.intensityZone}</p>
        </div>
    )
}