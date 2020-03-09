import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import TableReactTable from "./TableReactTable";
import SelectDocumentos from "./SelectDocumentos";
import Pagination from "./Pagination";
import AntDesignJSON from "./AntDesignTable";
import { Typography, Divider, Select, Button } from "antd";

import axios from "axios";

const { Option } = Select;
const { Title } = Typography;

const data = [
  {
    key: "1",
    articulo: "Boleta (de cada elección)",
    obs: "No",
    emb: "Sí",
    acciones: [false, true, false]
  },
  {
    key: "2",
    articulo: "Actas de jornada electoral",
    obs: "Sí",
    emb: "Sí",
    acciones: [false, true, false]
  },
  {
    key: "3",
    articulo: "Acta de escrutinio y cómputo",
    obs: "Sí",
    emb: "Sí",
    acciones: [false, true, false]
  },
  {
    key: "4",
    articulo: "Hoja de incidentes",
    obs: "Sí",
    emb: "Sí",
    acciones: [false, false, false]
  }
];

/*function handleChange(value) {
  console.log(`selected ${value}`);
}*/

class CargasDocumentos extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      consulta: false,
      seleccion: 0
    };
  }

  handleSelect(value) {
    this.setState({ seleccion: value, consulta: true });
  }

  render() {
    return (
      <div>
        <Title>Cargas de documentos</Title>
        <Divider type="horizontal" />
        <SelectDocumentos
          onChange={this.handleSelect}
          rutaWS="https://10.35.12.102:8443/docs_ws_revision/ws/obtenTiposClasificacionEleccion"
        />
        <Divider type="horizontal" />
        {this.state.consulta ? <TableReactTable /> : null}
        <Divider type="horizontal" />
        <div className="alineacion-div">
          {this.state.consulta ? (
            <Button type="primary">Notificar</Button>
          ) : null}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<CargasDocumentos />, document.getElementById("container"));
