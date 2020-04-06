import React, { Component, useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Col, Row, Button } from 'reactstrap';
import ApiClient from '../../ApiClient';
import { AppSwitch } from '@coreui/react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";

export default props => {

  useEffect(() => {

    listTables();

  }, []);

  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const viewTableOrdersPage = (id) => "/tables/" + id;

  const viewCreateTablePage = "/tables/new";

  const listTables = () => {

    ApiClient.get('@store/tables')
      .then(res => {

        const { success, tables, message } = res;

        if (success) {

          setTables(tables.data);

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

        setIsLoading(false);

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });

  }

  const updateTable = (updatingTable) => {

    updateTables(updatingTable);

    var updatedTables = tables.map((table) => {

      if (table === updatingTable) {
        table.is_occupied = !table.is_occupied;
      }

      return table;

    });

    setTables(updatedTables);

  }

  const updateTables = (table) => {

    var body = {
      is_occupied: !table.is_occupied,
    };

    ApiClient.put('@store/tables/' + table.id, body)
      .then(res => {

        const { success, message } = res;

        if (!success) {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

      });

  }

  const tablesMarkup = tables && tables.map((table, index) => {
    return <Col key={index} xs="12" sm="6" md="2">
      <Card>
        <ToastContainer />
        <Link to={viewTableOrdersPage(table.id)} style={{ textDecoration: 'none' }}>
          <CardBody style={{
            backgroundColor: table.is_occupied ? 'lightGrey' : 'white',
          }}>
            <div style={styles.text}>
              <h4>Table</h4>
              <h1>{table.number}</h1>
            </div>
          </CardBody>
        </Link>
        <CardFooter style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: table.is_occupied ? "red" : "green"
        }}>
          <Row style={{ alignItems: "center" }}>
            <Col>{table.is_occupied ? "Occupied" : "Available"}</Col>
            <Col>
              <AppSwitch variant={'3d'} color={'danger'} checked={table.is_occupied} onClick={() => updateTable(table)} />
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col >
  })

  return (

    <div className="animated fadeIn" >
      <Row style={styles.button}>
        <Link to={viewCreateTablePage}>
          <Button color="primary">Add table</Button>
        </Link>
      </Row>
      {
        isLoading
          ? <Loading />
          : <Row>{tablesMarkup}</Row>
      }
    </div>

  );
}

const styles = {
  text: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'grey'
  },

  toggle: {
    margin: 0,
    padding: 0
  },

  button: {
    justifyContent: 'flex-end',
    marginBottom: "3vh",
    marginRight: "0.2vw"
  }
}
