import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Input, Button, Column } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";

export default class AntDesignJSON extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchedColumn: "",
      posts: [],
      data: []
    };

    this.state.data = props.data;
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    axios
      .post(
        "https://localhost:8443/docs_ws_revision/ws/consultaArticulos",
        {},
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  render() {
    return (
      <Table dataSource={this.state.data}>
        <Column
          //title="Documento/Material"
          title={() => {
            return (
              <div style={{ textAlign: "center" }}>
                <div>Documento/Material</div>
                <Input placeholder="Search" />
              </div>
            );
          }}
          dataIndex="articulo"
          key="articulo"
          width="60%"
          filtered="true"
          sorter="true"
        />
        <Column //title="Observaciones"
          title={() => {
            return (
              <div style={{ textAlign: "center" }}>
                <div>Observaciones</div>
                <Input placeholder="Si/No" />
              </div>
            );
          }}
          dataIndex="obs"
          key="obs"
          width="10%"
        />
        <Column //title="Emblema"
          title={() => {
            return (
              <div style={{ textAlign: "center" }}>
                <div>Emblema</div>
                <Input placeholder="Si/No" />
              </div>
            );
          }}
          dataIndex="emb"
          key="emb"
          width="10%"
        />
        <Column
          title="Acciones"
          key="acciones"
          width="20%"
          render={(text, record) => {
            return (
              <span>
                {record.acciones.map((value, index) => {
                  if (index === 1) {
                    return (
                      /*<Upload
                        disabled={!value}
                        multiple={false}
                        showUploadList={true}
                      >*/
                      <Button
                        icon={<UploadOutlined />}
                        shape="circle"
                        disabled={!value}
                      />
                      //</Upload>
                    );
                  } else if (index === 0) {
                    return (
                      <Button
                        icon={<EyeOutlined />}
                        shape="circle"
                        disabled={!value}
                      />
                    );
                  } else if (index === 2) {
                    return (
                      <Button
                        icon={<DeleteOutlined />}
                        shape="circle"
                        disabled={!value}
                      />
                    );
                  } else {
                    return <span />;
                  }
                })}
              </span>
            );
          }}
          /*render={(text, record) => {
            return [
              record.acciones.map((value, index) => {
                if (index === 1) {
                  return (
                    <Upload disabled={!value}>
                      <Button shape="circle" disabled={!value}>
                        <UploadOutlined />
                      </Button>
                    </Upload>
                  );
                } else if (index === 0) {
                  return (
                    <Button
                      icon={<EyeOutlined />}
                      shape="circle"
                      disabled={!value}
                    />
                  );
                } else if (index === 2) {
                  return (
                    <Button
                      icon={<DeleteOutlined />}
                      shape="circle"
                      disabled={!value}
                    />
                  );
                } else {
                  return <span />;
                }
              })
            ];
          }}*/
        />
      </Table>
    );
  }
}
