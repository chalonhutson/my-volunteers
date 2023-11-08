import { useState, useEffect } from 'react'
import { useAuthHeader } from "react-auth-kit"
import { useNavigate } from 'react-router-dom'

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import "../css/ImgUpload.css"

export default function ImgUpload({ fetch_url, nav_url, show, setShow }) {

    const navigate = useNavigate()

    const authHeader = useAuthHeader()

    const [selectedFile, setSelectedFile] = useState(null)

    function handleFileChange(e) {
        const file = e.target.files[0]
        setSelectedFile(file)
    }

    function handleUpload() {
        const formData = new FormData()
        formData.append('file', selectedFile)

        console.log(formData)

        fetch(fetch_url, {
            method: 'POST',
            headers: {
                "Authorization": authHeader(),
            },
            body: formData

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // navigate(nav_url)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (selectedFile !== null) {
            console.log(selectedFile); // This will log the updated state after the state has been set
        }
    }, [selectedFile]); // This will only run when selectedFile changes



    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="uploadContainer" onSubmit={handleUpload}>
                        <input id="fileInput" type="file" onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="fileInput"
                            className="selectImageButton"
                        >Select Image</label>
                        {selectedFile && <p>{selectedFile.name}</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleUpload()} className="heroBtn">
                        Upload New Image
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
