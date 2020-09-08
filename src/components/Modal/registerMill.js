import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const RegisterMill = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({ handleOpenRegister }));

  const [show, setShow] = useState(false);
  const handleOpenRegister = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Usina</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label> Usina: </Form.Label>
              <Form.Control type="text" placeholder="Digite o nome da usina" autoComplete="off" required={true}/>
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

export default RegisterMill;
