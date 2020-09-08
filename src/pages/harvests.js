import React, { useRef } from 'react';
import RegisterHarvest from '../components/Modal/registerHarvest';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FiPlus } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';

const Harvests = (props) => {

    const registerRef = useRef();

    const lista = [
        { "id": "1", "cod": "#123115409213", "dt_start": "01/12/2020", "dt_end": "10/10/2022" },
        { "id": "2", "cod": "#123115409213", "dt_start": "02/12/2020", "dt_end": "09/10/2022" },
        { "id": "3", "cod": "#123115409213", "dt_start": "03/12/2020", "dt_end": "08/10/2022" },
        { "id": "4", "cod": "#123115409213", "dt_start": "04/12/2020", "dt_end": "07/10/2022" },
        { "id": "5", "cod": "#123115409213", "dt_start": "05/12/2020", "dt_end": "06/10/2022" },
        { "id": "60", "cod": "#123115409213", "dt_start": "06/12/2020", "dt_end": "05/10/2022" },
        { "id": "7", "cod": "#123115409213", "dt_start": "07/12/2020", "dt_end": "04/10/2022" },
        { "id": "8", "cod": "#123115409213", "dt_start": "08/12/2020", "dt_end": "03/10/2022" },
        { "id": "9", "cod": "#123115409213", "dt_start": "09/12/2020", "dt_end": "02/10/2022" },
        { "id": "10", "cod": "#123115409213", "dt_start": "12/12/2020", "dt_end": "01/10/2022" },
    ];

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
            <h1 className="text-center"> Usina {props.id} </h1>
            <ToolkitProvider
                keyField='id'
                data={lista}
                columns={columns}
                bootstrap4={true}
                search>
                {
                    props => (
                        <Container fluid="md">
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={2}>
                                    <h5> Colheitas: </h5>
                                </Col>
                                <Col xs={10} style={{ textAlign: "right" }}>
                                    <RegisterHarvest ref={registerRef} millName="Usina blabala" millId="2" />
                                    <a href="./#">
                                        <FiPlus style={styleFiPlus} onClick={() => registerRef.current.handleOpenRegister()} />
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
