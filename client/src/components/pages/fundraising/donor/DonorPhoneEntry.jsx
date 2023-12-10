import { useState } from "react"

import { toast } from 'react-toastify'

import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import { formatPhoneNumber, parsePhoneNumber } from "react-phone-number-input"
import PhoneInput from "react-phone-number-input/input"
// https://www.npmjs.com/package/react-phone-number-input
// Documentation for future reference

import EditSymbol from "../../../../assets/icons/edit_symbol.svg"
import DoneSymbol from "../../../../assets/icons/done_symbol.svg"

export default function DonorPhoneEntry({ phone }) {



    const [phoneEditable, setPhoneEditable] = useState(false)

    const [updatePhoneNumber, setUpdatePhoneNumber] = useState(phone.phone_number)

    console.log(parsePhoneNumber(updatePhoneNumber))

    function attemptUpdatePhoneNumber() {
        if (updatePhoneNumber.length == 12) {
            toast.success("Good phone number.")
            setPhoneEditable(false)
        } else {
            toast.error("Please make sure number is 10 digits.")
        }
    }

    return (
        <div>
            {
                phoneEditable
                    ?
                    <span className="d-flex">
                        <PhoneInput
                            country="US"
                            value={updatePhoneNumber}
                            onChange={setUpdatePhoneNumber}
                        />
                        <img
                            onClick={() => attemptUpdatePhoneNumber()}
                            src={DoneSymbol}
                            defaultValue={updatePhoneNumber}
                        />
                    </span>
                    :
                    <span className="d-flex">
                        <p>{formatPhoneNumber(phone.phone_number)}</p>
                        <img
                            onClick={() => setPhoneEditable(true)}
                            src={EditSymbol}
                        />
                    </span>
            }
        </div>
    )
}
