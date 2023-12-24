import React from 'react'
import { FormCheck } from 'react-bootstrap'

export default function DonationListEntry({ donation, callback }) {
    return (
        <span onClick={() => {
            navigate(`/fundraising/donation/${donation.id}`)
        }} className="donationListEntryContainer highlightable">
            <FormCheck onClick={() => {
                callback((prevDonation) => {
                    return prevDonation.map((prevDonation) => {
                        if (prevDonation.id === donation.id) {
                            prevDonation.selected = !prevDonation.selected
                        }
                        return prevDonation
                    })
                })
            }} defaultChecked={donation.selected} className="donationListEntryCheckbox" type="checkbox" />
            <p className="donationListEntryName">{donation.name}</p>
            <p className="donationListEntryAmount">{donation.date}</p>
            <p className="donationListEntryAmount">${donation.amount}</p>

        </span>
    )
}
