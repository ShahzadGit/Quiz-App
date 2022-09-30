import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Difficulty } from './../API'

type Props = {
    show: boolean
    handleClick: (data: {noOfQs: number; difficulty:string}) => void 
}

const Dialog: React.FC<Props> = ({ show, handleClick }) => {
    const [noOfQs, setNoOfQs] = useState(0)
    const [difficulty, setDifficulty] = useState("easy")

    return (
        <>
            <Modal
                show={show}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Quiz App</Modal.Title>
                </Modal.Header>
                <Form>
                <Modal.Body>
                    Please select the relevant Information <br/>
                    <Form.Label>Number of Questions:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Number of Questions" onChange={(e)=>setNoOfQs(Number(e.target.value))} required/>
                    <Form.Label>Select Difficulty Level:</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e)=>setDifficulty(e.target.value)} required>
                        <option value={Difficulty.EASY}>Easy</option>
                        <option value={Difficulty.MEDIUM}>Medium</option>
                        <option value={Difficulty.HARD}>Hard</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>handleClick({noOfQs,difficulty})}>Submit</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Dialog;




