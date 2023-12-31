import { useState } from "react"

import NavLinks from "../../../NavLinks"

export default function Donation() {
    return (
        <div>
            <NavLinks links={[
                { name: "dashboard", path: "/fundraising", active: true },
                { name: "donations", path: "/fundraising/donations", active: true },
                { name: "donation", path: "/fundraising/donation", active: false }
            ]} />
            <h1>Donation</h1>
        </div>
    )
}
