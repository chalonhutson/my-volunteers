import React from 'react'
import { FormCheck } from 'react-bootstrap'

export default function DonorListEntry({ donor }) {
    return (
        <span className="donorListEntryContainer">
            <p className="donorListEntryName">{donor.name}</p>
            <FormCheck defaultChecked={donor.business} className="donorListEntryCheckbox" type="checkbox" />
            <p className="donorListEntryStatus">{donor.status}</p>
            <p className="donorListEntryAmount">${donor.expected_amount}</p>

        </span>
    )
}
