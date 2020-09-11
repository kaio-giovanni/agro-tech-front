import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Alert } from 'react-bootstrap';
import config from '../../config/constants';

const AlertInfo = (props) => {
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIO(config.API_URL);

        socket.on("new mill", data => {
            setResponse(data);
            setShow(true);
        });
    }, []);

    return (
        <Alert variant="dark" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading> Novo </Alert.Heading>
            <p>
                {response.name}
            </p>
        </Alert>
    );
}

export default AlertInfo;