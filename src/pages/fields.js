import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from '../config/constants';
import IconMarker from '../assets/images/farm.png';

const Fields = (props) => {

    const [farm, setFarm] = useState({});
    const [field, setField] = useState([]);
    const [location, setLocation] = useState({});
    const [cod, setCod] = useState("");
    const [markers, setMarkers] = useState({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      });

    useEffect(() => {
        api.get(`/farm/${props.match.params.id}/`)
            .then(response => {
                setFarm({
                    farm_id: response.data.id,
                    farm_name: response.data.name,
                    farm_cod: response.data.cod
                });
                setField(response.data.field);
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.match.params.id]);

    const submitData = (event) => {
        event.preventDefault();

        if(location.lat === undefined || location.lng === undefined){
            window.alert("Por favor, selecione um local no mapa para salvar");
        }else{
            const values = {
                cod,
                latitude: location.lat,
                longitude: location.lng,
                farm_id: farm.farm_id
            }

            api.post('/register/field/', values)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const containerStyle = {
        position: 'absolute',
        width: '95%',
        marginRight: '30px',
        marginLeft: '30px',
        marginBottom: '30px'
    }

    const getLngLat = (map, c) => {
        setLocation({ lat: c.lat(), lng: c.lng() });
        map.panTo(c);
    }

    const onMarkerClick = (props, marker, e) => {
        setMarkers({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    const filterField = (event) => {
        //field.filter(); filtro dos campos no mapa (não concluido)
    }


    return (
        <>
            <Navbar />
            <Container fluid="md">
                <Row style={{ marginTop: "20px" }}>
                    <p className="text-center">
                        <b>Fazenda: </b>{farm.farm_name}
                    </p>
                </Row>
                <Row>
                    <Col xs={7}>
                        <Form onSubmit={submitData} style={{ float: "left" }}>
                            <Form.Row className="align-items-center" style={{ float: "right"}}>
                                <Col xs="auto">
                                    <Form.Control
                                        placeholder="Digite o código do campo"
                                        type="text"
                                        autoComplete="off"
                                        value={cod}
                                        onChange={e => setCod(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="primary" type="submit">
                                        Cadastrar
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col xs={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Filtrar Campo"
                            autoComplete="off"
                            onChange={(e) => filterField(e)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <small> Latitude: <b> { location.lat } </b> </small>
                    </Col>
                    <Col xs={6}>
                        <small> Longitude: <b> { location.lng } </b> </small>
                    </Col>
                </Row>
            </Container>
            <Map
                google={props.google}
                zoom={4}
                center={{ lat: "-17.031029", lng: "-48.819000" }}
                containerStyle={containerStyle}
                onClick={(t, map, c) => getLngLat(map, c.latLng)}>

                {
                    field.map((item) => (
                        <Marker
                            key={item.id}
                            title={`Campo ${item.cod}`}
                            name={`Campo ${item.cod}`}
                            onClick={onMarkerClick}
                            position={{ lat: item.latitude, lng: item.longitude }}
                            icon={IconMarker}
                        />
                    ))
                }

                <InfoWindow 
                    marker={markers.activeMarker}
                    visible={markers.showingInfoWindow}
                >
                    <div>
                        <p> Nome: { farm.farm_name } </p>
                        <p> Codigo: { farm.farm_cod } </p>
                    </div>
                </InfoWindow>
            </Map>
        </>
    );
}

const loadingContainer = (props) => (
    <Spinner
        animation="grow"
        variant="primary"
        style={{ position: 'relative', top: '50%', left: '50%' }} />
);

export default GoogleApiWrapper({
    apiKey: (config.API_KEY_MAPS),
    LoadingContainer: loadingContainer
})(Fields)