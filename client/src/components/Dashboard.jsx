import "../css/Dashboard.css"

import headshot_1 from "../assets/headshots/headshot_1.jpg"
import headshot_19 from "../assets/headshots/headshot_19.jpg"

export default function Dashboard() {
    return (
        <div>
            <div className="cardLarge">
                <h1>TOP VOLUNTEERS - JULY</h1>
                <div className="cardLargeItem">
                    <img className="headshotImage" src={headshot_1} alt="headshot_1" />
                    <div className="volunteerInfo">
                        <h3>Ashley Westgate</h3>
                        <p>180 doors</p>
                        <p>91 takes</p>
                    </div>
                </div>
                <div className="cardLargeItem">
                    <img className="headshotImage" src={headshot_19} alt="headshot_1" />
                    <div className="volunteerInfo">
                        <h3>Bradley Newborn</h3>
                        <p>157 calls</p>
                        <p>71 takes</p>
                    </div>
                </div>
                <button className="heroBtn">view volunteers</button>
            </div>
            <div className="cardLarge">
                <h1>UPCOMING EVENTS</h1>
                <div className="eventInfo">
                    <h3>GOTV Door Knocking - LD15</h3>
                    <p>Location: Field Office</p>
                    <p>Time: Saturday July 14, 2024</p>
                </div>
                <div className="eventInfo">
                    <h3>Pints & Policy - speaker Dave Smith</h3>
                    <p>Location: Dave & Busters</p>
                    <p>Time: Friday July 20, 2024</p>
                </div>
                <button className="heroBtn">view events</button>
            </div>
        </div>
    )
}
