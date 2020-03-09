import React from "react";
import { Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

class SelectDocumentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      muestraOpciones: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .post(
        //"https://10.35.12.102:8443/docs_ws_revision/ws/obtenTiposClasificacionEleccion",
        this.props.rutaWS,
        {},
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        this.setState({ posts: response.data.entity, muestraOpciones: true });
        console.log(response.data.entity);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        {!this.state.muestraOpciones ? (
          <Select
            defaultValue="Seleccione un valor"
            style={{ width: 120 }}
            disabled
          />
        ) : (
          <Select
            onChange={this.handleChange}
            defaultValue="lucy"
            style={{ width: 120 }}
          >
            {Object.entries(this.state.posts).map((value, index) => {
              return <Option value={value[0]}>{value[1]}</Option>;
            })}
          </Select>
        )}
      </div>
    );
  }
}

export default SelectDocumentos;
