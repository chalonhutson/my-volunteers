import { useRef } from "react"
import { Button, Dropdown, Form, FormCheck, FormLabel } from "react-bootstrap"
import CurrencyInput from "react-currency-input-field";

import "./AddDonor.css"
import { Link } from "react-router-dom";

export default function AddDonor() {

    const nameRef = useRef()
    const occupationRef = useRef()
    const employerRef = useRef()
    const statusRef = useRef()
    const expectedAmountRef = useRef()

    function handleFormSubmit(e) {
        e.preventDefault()
        console.log(expectedAmountRef.current.value)
    }


    return (
        <main className="addDonorContainer">

            <span className="addDonorNavLinks">
                <Link to={"/fundraising"}>dashboard</Link>
                <p> - </p>
                <Link to={"/fundraising/donors"}>donors</Link>
                <p> - </p>
                <p>add donor</p>
            </span>

            <div className="addDonorFormContainer">


                <h1>Add Donor</h1>



                <Form onSubmit={(e) => handleFormSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                        <FormCheck className="mt-3" type="checkbox" label="Business?" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" controlId="formBasicOccupation">
                        <div className="me-2">
                            <FormLabel>Occupation</FormLabel>
                            <Form.Control type="text" placeholder="Enter occupation" />
                        </div>
                        <div>
                            <Form.Label>Employer</Form.Label>
                            <Form.Control type="text" placeholder="Enter employer" />
                        </div>
                    </Form.Group>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Prospect</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Donor</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Super Donor</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="d-flex flex-column">
                        <Form.Label>Expected Donation?</Form.Label>
                        <CurrencyInput
                            id="input-example"
                            name="input-name"
                            placeholder="Enter amount"
                            defaultValue={0}
                            decimalsLimit={0}
                            ref={expectedAmountRef}
                            // onValueChange={(value) => handleExpectedAmountChange(value)}
                            prefix="$"
                        />
                    </div>
                    <p>You will be able to add emails, phone numbers, addresses, and notes after creating this donor.</p>
                    <Button className="mt-3" variant="primary" type="submit">Add Donor</Button>
                </Form>
            </div>

        </main>
    )
}
