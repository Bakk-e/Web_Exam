import { Interval } from "@/types"

type answerIntervalProps = {
    interval: Interval
}

export default function AnswerInterval(props: answerIntervalProps) {
    const {interval} = props;

    return (
        <div>
            <div id="expected">
                <table>
                    <tr>
                        <th></th>
                        <th>Tid</th>
                        <th>Sone</th>
                    </tr>
                    <tr>
                        <th>Forventet</th>
                        <td>{interval?.duration}</td>
                        <td>{interval?.intensityZone}</td>
                    </tr>
                </table>
            </div>
            <div id="achived">
                <table>
                    <tr>
                        <th></th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Avg</th>
                    </tr>
                    <tr>
                        <th>Intensitet</th>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <th>Puls</th>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <th>Fart</th>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <th>Watt</th>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                    </tr>
                </table>
                <p>Tid: </p>
            </div>
        </div>
    )
}