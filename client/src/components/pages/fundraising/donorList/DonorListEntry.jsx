import { useNavigate } from "react-router-dom"
import { FormCheck } from "react-bootstrap"

export default function DonorListEntry({ donor, callback }) {

    const navigate = useNavigate()

    return (
        <span onClick={() => {
            navigate(`/fundraising/donors/${donor.id}`)
        }} className="donorListEntryContainer highlightable">
            <FormCheck onClick={() => {
                callback((prevDonors) => {
                    return prevDonors.map((prevDonor) => {
                        if (prevDonor.id === donor.id) {
                            prevDonor.selected = !prevDonor.selected
                        }
                        return prevDonor
                    })
                })
            }} defaultChecked={donor.selected} className="donorListEntryCheckbox" type="checkbox" />
            <p className="donorListEntryName">{donor.name}</p>
            <FormCheck defaultChecked={donor.business} className="donorListEntryCheckbox" type="checkbox" />
            <p className="donorListEntryStatus">{donor.status}</p>
            <p className="donorListEntryAmount">${donor.expected_amount}</p>
            <p className="donorListEntryAmount">{donor.email}</p>
            <p className="donorListEntryAmount">{donor.phone}</p>

        </span>
    )
}
