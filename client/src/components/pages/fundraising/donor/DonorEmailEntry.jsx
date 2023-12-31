import { useState } from "react"

import { toast } from 'react-toastify'

import EditSymbol from "../../../../assets/icons/edit_symbol.svg"
import DoneSymbol from "../../../../assets/icons/done_symbol.svg"

export default function DonorEmailEntry({ email }) {



    const [emailEditable, setEmailEditable] = useState(false)

    const [updateEmail, setUpdateEmail] = useState(email.email_address)

    function attemptUpdateEmail() {
        setEmailEditable(false)
    }

    return (
        <div>
            {
                emailEditable
                    ?
                    <span className="d-flex">
                        <input
                            type="text"
                            value={updateEmail}
                            onChange={(e) => setUpdateEmail(e.target.value)}

                        />
                        <img
                            onClick={() => attemptUpdateEmail()}
                            src={DoneSymbol}
                            defaultValue={updateEmail}
                        />
                    </span>
                    :
                    <span className="d-flex">
                        <p>{updateEmail}</p>
                        <img
                            onClick={() => setEmailEditable(true)}
                            src={EditSymbol}
                        />
                    </span>
            }
        </div>
    )
}