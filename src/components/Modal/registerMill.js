import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

const RegisterMill = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({ handleOpenRegister }));

  const [show, setShow] = useState(false);
  const handleOpenRegister = () => setShow(true);

  const handleClose = () => setShow(false);

  const [mill, setMill] = useState("");
  
  const submitData = (event) => {

    event.preventDefault();

    const values = {
      name: mill,
    }

    // Validações dos campos

    // enviando os dados
    api.post('/register/mill/', values)
      .then((response) => {
        console.log(response);
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
          <Modal.Title>Cadastrar Usina</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <Form.Group>
              <Form.Label> Usina: </Form.Label>
              <Form.Control 
                type="text"
                placeholder="Digite o nome da usina"
                autoComplete="off"
                required={true}
                value={mill}
                onChange={e => setMill(e.target.value)}
                />
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
