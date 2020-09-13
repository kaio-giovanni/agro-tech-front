import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import api from '../../services/api';

const RegisterFarm = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({ handleOpenRegister }));

    const [show, setShow] = useState(false);
    const handleOpenRegister = () => setShow(true);

    const handleClose = () => setShow(false);

    const [cod, setCod] = useState("");
    const [name, setName] = useState("");

    const submitData = (event) => {
        event.preventDefault();

        const values = {
            harvest_id: props.harvest_id,
            cod,
            name
        };


        api.post('/register/farm/', values)
          .then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.error(error);
          });

        // fechar modal
        handleClose();
        
        // refresh page
        window.location.reload();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Fazenda</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitData}>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label> Colheita: </Form.Label>
                                <Form.Control 
                                    plaintext
                                    readOnly
                                    defaultValue={props.harvest_cod}
                                    />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label> Código:  </Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Digite o código" 
                                    autoComplete="off"
                                    value={cod}
                                    onChange={e => setCod(e.target.value)}
                                    required />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group>
                            <Form.Label> Fazenda: </Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Digite o nome da fazenda" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required/>
                        </Form.Group>
                    
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

export default RegisterFarm;
