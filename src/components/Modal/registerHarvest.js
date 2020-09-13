import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import api from '../../services/api';

const RegisterHarvest = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({ handleOpenRegister }));

    const [show, setShow] = useState(false);
    const handleOpenRegister = () => setShow(true);

    const handleClose = () => setShow(false);

    const [cod, setCod] = useState("");
    const [dt_start, setDt_start] = useState("");
    const [dt_end, setDt_end] = useState("");

    const submitData = (event) => {

        event.preventDefault();

        const values = {
            mill_id: props.mill_id,
            cod,
            dt_start,
            dt_end
        }
    
        // Validações dos campos

        api.post('/register/harvest/', values)
          .then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.error(error);
          });

        // fechar modal
        handleClose();
      }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Colheita</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitData}>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label> Usina: </Form.Label>
                                <Form.Control 
                                    plaintext
                                    readOnly 
                                    defaultValue={props.mill_name} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label> Código:  </Form.Label>
                                <Form.Control 
                                    name="cod"
                                    type="text"
                                    placeholder="Digite o código"
                                    autoComplete="off"
                                    value={cod}
                                    onChange={e => setCod(e.target.value)}
                                    required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label> Data de Ínicio: </Form.Label>
                                <Form.Control 
                                    name="dt_start"
                                    type="date"
                                    placeholder="Data de Ínicio"
                                    value={dt_start}
                                    onChange={e => setDt_start(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label> Data de Término: </Form.Label>
                                <Form.Control
                                    name="dt_end"
                                    type="date"
                                    placeholder="Data de Término"
                                    value={dt_end}
                                    onChange={e => setDt_end(e.target.value)}
                                    required />
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
