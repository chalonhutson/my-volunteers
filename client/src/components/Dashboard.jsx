import "../css/Dashboard.css"

export default function Dashboard() {
    return (
        <div>
            <div className="cardLarge">
                <h1>TOP VOLUNTEERS - JULY</h1>
                <div className="volunteerCardLarge">
                    <h3>Ashley Westgae</h3>
                    <p>180 doors</p>
                    <p>91 takes</p>
                </div>
                <div className="volunteerCardLarge">
                    <h3>Bradley Newborn</h3>
                    <p>157 calls</p>
                    <p>71 takes</p>
                </div>
                <button className="heroBtn">view volunteers</button>
            </div>
        </div>
    )
}
