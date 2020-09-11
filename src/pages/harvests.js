import React, { useRef, useState, useEffect } from 'react';
import api from '../services/api';
import RegisterHarvest from '../components/Modal/registerHarvest';
import { Link } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FiPlus } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';

const Harvests = (props) => {

    const [mill, setMill] = useState({});
    const [harvest, setHarvest] = useState([]);

    useEffect(() => {
        api.get(`/mill/${props.match.params.id}/`)
            .then(response => {
                setMill({ mill_id: response.data.id, mill_name: response.data.name });
                setHarvest(response.data.harvest);
            })
            .catch(error => {
                console.error(error);
            });

    },[props.match.params.id])

    const registerRef = useRef();

    const GetActionFormat = (cell, row) => {
        return (
            <div className="text-center">
                <Link to={`/harvests/${row.id}/`} className="btn btn-outline-primary">
                    <FaEye />
                </Link>
            </div>
        );
    }

    const columns = [
        {
            dataField: 'id', text: 'ID', sort: true,
            headerStyle: { width: '5%', textAlign: 'left' }
        },
        {
            dataField: 'cod', text: 'Código', sort: true,
            headerStyle: { width: '55%', textAlign: 'left' }
        },
        {
            dataField: 'dt_start', text: 'Início',
            headerStyle: { width: '15%', textAlign: 'left' }
        },
        {
            dataField: 'dt_end', text: 'Término',
            headerStyle: { width: '15%', textAlign: 'left' }
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
                data={harvest}
                columns={columns}
                bootstrap4={true}
                search>
                {
                    props => (
                        <Container fluid="md">
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={12}>
                                    <h5 className="text-center font-weight-bold"> { mill.mill_name } </h5>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={2}>
                                    <h5>Colheitas: </h5>
                                </Col>
                                <Col xs={10} style={{ textAlign: "right" }}>
                                    <RegisterHarvest
                                        ref={registerRef}
                                        mill_id={ mill.mill_id }
                                        mill_name={ mill.mill_name } />
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

export default Harvests;
