import { useState } from "react"
import { useParams } from "react-router-dom"

export default function Donor() {

    const { donorId } = useParams()

    const [donor, setDonor] = useState({
        name: "Keanu Reeves",
        business: false,
        status: "prospect",
        expected_dontation: 10000,
    })

    return (
        <div>
            <div className="donorCoreInfo">
                <p>{donor.name}</p>
                <p>{donor.business}</p>
                <p>{donor.status}</p>
                <p>${donor.expected_dontation}</p>
            </div>
        </div>
    )
}
