import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Toast, Badge } from 'react-bootstrap';
import config from '../../config/constants';
import './style.css';

const AlertInfo = (props) => {
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIO(config.API_URL);
        let txt = "";

        socket.on("new mill", data => {
            txt = "A usina " + data.name + " foi cadastrada !";
            setResponse(txt);
            setShow(true);
        });

        socket.on("new harvest", data => {
            txt = "A colheita " + data.cod + " foi cadastrada !";
            setResponse(txt);
            setShow(true);
        });

        socket.on("new farm", data => {
            txt = "A fazenda " + data.name + " foi cadastrada !";
            setResponse(txt);
            setShow(true);
        });

        socket.on("new field", data => {
            txt = "O campo " + data.cod + " foi cadastrado !";
            setResponse(txt);
            setShow(true);
        });

    }, []);

    return (
        <Toast className="my-toast" show={show} onClose={() => setShow(false)} delay={3000} autohide>
            <Toast.Header>
                <strong className="mr-auto">
                    <Badge variant="primary">NEW</Badge> Novo item
                </strong>
                <small>now</small>
            </Toast.Header>
            <Toast.Body style={{ display: "flex"}}>
                <p>
                    {response}
                </p>
            </Toast.Body>
        </Toast>
    );
}

export default AlertInfo;