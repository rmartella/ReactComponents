import React from "react";
import ReactTable from "react-table";
//import "react-table-v6/react-table.css" ;
import "antd/dist/antd.css";
import "./index.css";
import { Button, Divider } from "antd";
import Pagination from "./Pagination";
//import { Pagination } from "antd";
import { DeleteOutlined, UploadOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

//const httpsAgent = new https.Agent({ ca: fs.readFileSync(certPath) });
//const httsAgent = new https.Agent({ rejectUnauthorized: false });

class TableReactTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .post(
        "https://192.168.1.142:8443/docs_ws_revision/ws/consultaArticulos",
        {},
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        this.setState({ posts: response.data.entity });
        //console.log(response.data.entity);
      })
      /*.then(posts => {
          this.setState({ posts: posts.entity });
          console.log(posts.entity);
        })*/
      .catch(function(error) {
        console.log(error);
      });

    /*const url = "https://jsonplaceholder.typicode.com/posts";
      fetch(url, {
        method: "GET"
      })
        .then(response => response.json())
        .then(posts => {
          this.setState({ posts: posts });
        });*/
  }

  render() {
    const columns = [
      {
        Header: "No.",
        accessor: "id",
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "Documeto/Material",
        accessor: "nombre",
        style: {
          textAlign: "left",
          fontFamily: "Roboto",
          size: "200px"
        }
      },
      {
        Header: "Observaciones",
        accessor: "conObservaciones",

        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        Cell: v => {
          if (v.value) return <span>Sí</span>;
          else return <span>No</span>;
        }
      },
      {
        Header: "Emblema",
        accessor: "conEmblema",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        Cell: v => {
          if (v.value) return <span>Sí</span>;
          else return <span>No</span>;
        }
      },

      {
        Header: "Acciones",
        accessor: "acciones",
        Cell: v => {
          return (
            <div style={{ textAlign: "center" }}>
              {v.value.map((value, index) => {
                if (value.nombre === "Viz") {
                  return [
                    <Button
                      id="ilist"
                      type="primary"
                      shape="circle"
                      disabled={!value.isActivo}
                      icon={<EyeOutlined />}
                    />,
                    <Divider type="vertical" />
                  ];
                } else if (value.nombre === "Upload") {
                  return [
                    <Button
                      id="ilist"
                      type="primary"
                      shape="circle"
                      disabled={!value.isActivo}
                      icon={<UploadOutlined />}
                    />,
                    <Divider type="vertical" />
                  ];
                } else if (value.nombre === "Delete") {
                  return [
                    <Button
                      id="ilist"
                      type="primary"
                      shape="circle"
                      disabled={!value.isActivo}
                      icon={<DeleteOutlined />}
                    />,
                    <Divider type="vertical" />
                  ];
                } else return <span />;
              }, <Divider type="vertical" />)}
            </div>
          );
          /*return (
            <div>
              <Button
                id="ilist"
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
              />
              <Divider type="vertical" />
              <Button
                id="ilist"
                type="primary"
                shape="circle"
                icon={<UploadOutlined />}
              />
              <Divider type="vertical" />
              <Button
                id="ilist"
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </div>
          );*/
        },
        style: {
          color: "blue"
        },
        sortable: false,
        filterable: false
      }
    ];
    return (
      <ReactTable
        id="ilist"
        columns={columns}
        data={this.state.posts.articulos}
        filterable
        //defualtPageSize={1}
        showPagination={true}
        PaginationComponent={Pagination}
        noDataText={"Sin datos que mostrar"}
      />
    );
  }
}

export default TableReactTable;
