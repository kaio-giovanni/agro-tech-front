import React, { useRef, useState, useEffect } from 'react';
import api from '../services/api';
import RegisterMill from '../components/Modal/registerMill';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FiPlus } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';

const Mills = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/mill/')
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    const registerRef = useRef();

    const GetActionFormat = (cell, row) => {
        return (
            <div className="text-center">
                <Link to={`/mills/${row.id}/`} className="btn btn-outline-primary">
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
            dataField: 'name', text: 'Usinas', sort: true,
            headerStyle: { width: '80%', textAlign: 'left' }
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
                data={data}
                columns={columns}
                bootstrap4={true}
                search>
                {
                    props => (
                        <Container fluid="md">
                            <Row style={{ marginTop: "10px" }}>
                                <Col xs={2}>
                                    <h5> Usinas: </h5>
                                </Col>
                                <Col xs={10} style={{ textAlign: "right" }}>
                                    <RegisterMill ref={registerRef} />
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

export default Mills;