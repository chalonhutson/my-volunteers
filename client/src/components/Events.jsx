import { Link } from 'react-router-dom'

export default function Events() {
    return (
        <div>
            <Link to="/">
                <button className="heroBtn">back to dashboard</button>
            </Link>
            <table>
                <tr>
                    <th scope="col">event</th>
                    <th scope="col">location</th>
                    <th scope="col">time</th>
                </tr>
                <tr>
                    <td scope="col">GOTV Door Knocking - LD15</td>
                    <td scope="col">Field Office</td>
                    <td scope="col">Saturday July 14, 2024</td>
                </tr>
            </table>
        </div>
    )
}
