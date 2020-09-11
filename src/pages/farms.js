import React, { useRef, useState, useEffect } from 'react';
import api from '../services/api';
import RegisterFarm from '../components/Modal/registerFarm';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FiPlus } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';


const Farms = (props) => {

    const [harvest, setHarvest] = useState({});
    const [farm, setFarm] = useState([]);

    useEffect(() => {
        api.get(`/harvest/${props.match.params.id}/`)
            .then(response => {
                setHarvest({
                    id: response.data.id,
                    cod: response.data.cod,
                    dt_start: response.data.dt_start,
                    dt_end: response.data.dt_end
                });
                setFarm(response.data.farm);
            })
            .catch(error => {
                console.error(error);
            });
    },[props.match.params.id]);

    const registerRef = useRef();

    const GetActionFormat = (cell, row) => {
        return (
            <div className="text-center">
                <Link to={`/farms/${row.id}/`} className="btn btn-outline-primary">
                    <FaEye />
                </Link>
            </div>
        );
    }

    const columns = [
        {
            dataField: 'id', text: 'ID', sort: true,
            headerStyle: { width: '10%', textAlign: 'left' }
        },
        {
            dataField: 'cod', text: 'Código', sort: true,
            headerStyle: { width: '30%', textAlign: 'left' }
        },
        {
            dataField: 'name', text: 'Nome',
            headerStyle: { width: '50%', textAlign: 'left' }
        },
        {
            dataField: '', text: 'Visualizar', formatter: GetActionFormat,
            headerStyle: { width: '10%', textAlign: 'center' }
        }
    ];

    const { SearchBar } = Search;

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page: ' + page + ' of ' + sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page: ' + page + ' of ' + sizePerPage);
        }
    });

    return (
        <>
            <Navbar />
            <ToolkitProvider
                keyField='id'
                data={farm}
                columns={columns}
                bootstrap4={true}
                search>
                {
                    props => (
                        <Container fluid="md">
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={12}>
                                    <h5 className="text-center font-weight-bold"> Colheita { harvest.cod } </h5>
                                    <p className="text-center">
                                        <small>
                                            <b>Data de Ínicio: </b>
                                            { harvest.dt_start } - 
                                            <b> Data de Término: </b>
                                            { harvest.dt_end } 
                                        </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={2}>
                                    <h5> Fazendas: </h5>
                                </Col>
                                <Col xs={10} style={{ textAlign: "right" }}>
                                    <RegisterFarm ref={registerRef} harvest_cod={ harvest.cod } harvest_id={ harvest.id } />
                                    <a 
                                        href="./#"
                                        onClick={() => registerRef.current.handleOpenRegister()}
                                        >
                                        <FiPlus 
                                            className="table-link-new" />
                                    </a>
                                    <SearchBar
                                        {...props.searchProps}
                                        placeholder="Filtrar"
                                    />
                                </Col>
                            </Row>
                            <BootstrapTable
                                pagination={pagination}
                                {...props.baseProps}
                            />
                        </Container>
                    )
                }
            </ToolkitProvider>
            <Footer />
        </>
    );

}

export default Farms;