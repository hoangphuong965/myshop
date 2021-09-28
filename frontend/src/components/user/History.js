import React, { useEffect } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Side from "./Side";
import ProtectedRoute from "../ProtectedRoute";
import { connect } from "react-redux";
import { myOrder } from "../../store/_actions/orderActions";
import { MDBDataTable } from "mdbreact";

const History = ({ myOrder, orders }) => {
  useEffect(() => {
    myOrder();
  }, [myOrder]);

  const handleProductName = (order) => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
          {order.orderItems.length} products purchased
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {order.orderItems.map((item) => {
            return (
              <Dropdown.Item
                key={item._id}
                href={`/product/${item.productId}`}
                target='_blank'>
                {item.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const renderOrders = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Total price",
          field: "totalPrice",
        },
        {
          label: "Status",
          field: "status",
        },
      ],
      rows: [],
    };

    orders
      .slice(0)
      .reverse()
      .map((order) => {
        return data.rows.push({
          name: handleProductName(order),
          date: order.createAt.substring(0, 10),
          totalPrice: `$${order.totalPrice}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "#18701E" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: " #550000" }}>{order.orderStatus}</p>
            ),
        });
      });
    return data;
  };

  return (
    <Container>
      <Row>
        <Side />
        <Col xs={10}>
          <h3>Purchase history</h3>
          <hr />
          <MDBDataTable
            striped
            bordered
            data={renderOrders()}
            searching={false}
            responsive
          />
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.myOrder,
  };
};
export default connect(mapStateToProps, { myOrder })(ProtectedRoute(History));
