import React, { useRef } from 'react';
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

    const registerRef = useRef();

    const lista = [
        { "id": 1, "name": "Usina 1" },
        { "id": 2, "name": "Usina 2" },
        { "id": 3, "name": "Usina 3" },
        { "id": 4, "name": "Usina 4" },
        { "id": 5, "name": "Usina 5" },
        { "id": 6, "name": "Usina 6" },
        { "id": 7, "name": "Usina 7" },
        { "id": 8, "name": "Usina 8" },
        { "id": 9, "name": "Usina 9" },
        { "id": 10, "name": "Usina 10" },
        { "id": 11, "name": "Usina 11" },
        { "id": 12, "name": "Usina 12" },
        { "id": 13, "name": "Usina 13" },
        { "id": 14, "name": "Usina 14" },
        { "id": 15, "name": "Usina 15" },
    ];

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

    const styleFiPlus = {
        marginRight: "15px",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        background: "var(--primary)",
        color: "var(--white)"
    };

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
                data={lista}
                columns={columns}
                bootstrap4={true}
                search>
                {
                    props => (
                        <Container fluid="md">
                            <Row style={{ marginTop: "10px" }}>
                                <Col xs={12} style={{ textAlign: "right" }}>
                                    <RegisterMill ref={registerRef} />
                                    <a href="./#" onClick={() => registerRef.current.handleOpenRegister()}>
                                        <FiPlus style={styleFiPlus} />
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