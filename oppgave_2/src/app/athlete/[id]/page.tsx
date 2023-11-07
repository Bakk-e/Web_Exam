import "@/styles/AthletePageStyle.css"

export default function AthletePage({ params }: { params: { id: string }}) {

    return (
        <div id="athlete-page">
            <header id="athlete-page-header">
                <a id="athlete-page-logo">Logo</a>
                <p id="athlete-page-id">1</p>
            </header>
            <div id="athlete-page-info">
                <p id="athlete-page-info-gender">Kjønn: male</p>
                <p id="athlete-page-info-sport">Sport: cycling</p>
                <p id="athlete-page-info-heartrate">Maks puls: 120</p>
                <p id="athlete-page-info-wattage">Terskel watt: 23</p>
                <p id="athlete-page-info-speed">Terskel fart: 32kmh</p>
                <div id="athlete-page-inteval-zones">
                    <p id="athlete-page-inteval-zones-title">Intervall soner:</p>
                    <table id="athlete-page-inteval-zones-table">
                        <tr>
                            <th></th>
                            <th>50%</th>
                            <th>60%</th>
                            <th>70%</th>
                            <th>80%</th>
                            <th>90%</th>
                        </tr>
                        <tr>
                            <th>Puls</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                        <tr>
                            <th>Watt</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                        <tr>
                            <th>Fart</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}