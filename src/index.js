import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import TableReactTable from "./TableReactTable";
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

    this.state = {
      consulta: false
    };
  }

  render() {
    return (
      <div>
        <Title>Cargas de documentos</Title>
        <Divider type="horizontal" />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={(value, object) => {
            console.log(object.id);
            this.setState({ consulta: true });
          }}
        >
          <Option id="0" value="jack">
            Jack
          </Option>
          <Option id="1" value="lucy">
            Lucy
          </Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
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
