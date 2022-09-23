import React from "react";
import { Container, Col, Row } from "reactstrap";
import { ADMIN__DATA } from "../../../asssets/data/data.js";
import AdminCard from "../AdminCard/AdminCard.jsx";
import "./AdminList.css";

function AdminList() {
  return (
    <section>
      <Container>
        {ADMIN__DATA.slice(0, 8).map((item) => (
          <AdminCard key={item.id} item={item} />
        ))}
      </Container>
    </section>
  );
}

export default AdminList;
