import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';

const RegisterHarvest = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({ handleOpenRegister }));

    const [show, setShow] = useState(false);
    const handleOpenRegister = () => setShow(true);

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Colheita</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label> Usina: </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={props.millName} />
                                <Form.Control type="hidden" value={props.millId} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label> Código:  </Form.Label>
                                <Form.Control type="text" placeholder="Digite o código" autoComplete="off" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label> Data de Ínicio: </Form.Label>
                                <Form.Control type="date" placeholder="Data de Ínicio" required/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label> Data de Término: </Form.Label>
                                <Form.Control type="date" placeholder="Data de Término" required/>
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
});

export default RegisterHarvest;
