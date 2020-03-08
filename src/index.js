import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Input, Button, Upload, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";

const { Column } = Table;

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

class App extends React.Component {
  state = {
    searchText: "",
    searchedColumn: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Documento/Material",
        dataIndex: "articulo",
        key: "articulo",
        width: "50%",
        align: "left",
        ...this.getColumnSearchProps("articulo")
      },
      {
        title: "Observaciones",
        dataIndex: "obs",
        key: "obs",
        width: "15%",
        ...this.getColumnSearchProps("obs")
      },
      {
        title: "Emblema",
        dataIndex: "emb",
        key: "emb",
        width: "15%",
        ...this.getColumnSearchProps("emb")
      },
      {
        title: "Acciones",
        dataIndex: "acciones",
        key: "acciones",
        width: "20%",
        ...this.getColumnSearchProps("emblema")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

class ListaDocumentos extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    posts: []
  };
  render() {
    return (
      <Table dataSource={data}>
        <Column
          title="Documento/Mterial"
          dataIndex="articulo"
          key="articulo"
          width="50%"
        />
        <Column title="Observaciones" dataIndex="obs" key="obs" width="15%" />
        <Column title="Emblema" dataIndex="emb" key="emb" width="15%" />
        <Column
          title="Action"
          key="action"
          width="20%"
          render={(text, record) => (
            <span>
              <a style={{ marginRight: 16 }}>Invite {record.lastName}</a>
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}

class CargaDocumentos extends React.Component {
  render() {
    return (
      <div style={{ padding: 8 }}>
        <ListaDocumentos />
        <App />
      </div>
    );
  }
}

class AntDesignJSON extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchedColumn: "",
      posts: []
    };
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
      <Table dataSource={data}>
        <Column
          title="Documento/Material"
          dataIndex="articulo"
          key="articulo"
          width="50%"
        />
        <Column title="Observaciones" dataIndex="obs" key="obs" width="5%" />
        <Column title="Emblema" dataIndex="emb" key="emb" width="5%" />
        <Column
          colSpan="1"
          rowSpan="1"
          title="Action"
          key="acciones"
          width="40%"
          render={(text, record) => {
            //console.log("record doc:" + record.key);
            return [
              record.acciones.map((value, index) => {
                if (index === 1) {
                  return (
                    <span>
                      <Upload disabled={!value}>
                        <Button shape="circle" disabled={!value}>
                          <UploadOutlined />
                        </Button>
                      </Upload>
                    </span>
                  );
                } else if (index === 0) {
                  return (
                    <span>
                      <Button
                        icon={<EyeOutlined />}
                        shape="circle"
                        disabled={!value}
                      />
                    </span>
                  );
                } else if (index === 2) {
                  return (
                    <span>
                      <Button
                        icon={<DeleteOutlined />}
                        shape="circle"
                        disabled={!value}
                      />
                    </span>
                  );
                } else {
                  return <span />;
                }
              })
            ];
          }}
        />
      </Table>
    );
  }
}

import ReactTable from "react-table";
//import "react-table/react-table.css";
import PropTypes from "prop-types";

const defaultButton = props => <button {...props}>{props.children}</button>;

export default class Pagination extends React.Component {
  constructor(props) {
    super();

    this.changePage = this.changePage.bind(this);

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages)
    };
  }

  static propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages)
      });
    }

    this.changePage(nextProps.page + 1);
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;

    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });

    // this.props.onPageChange(page - 1);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page + 1;

    return (
      <div className="Table__pagination">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === 1) return;
              this.changePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
            {this.props.previousText}
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages.map((page, index, array) => {
            return (
              <PageButtonComponent
                key={page}
                className={
                  activePage === page
                    ? "Table__pageButton Table__pageButton--active"
                    : "Table__pageButton"
                }
                onClick={this.changePage.bind(null, page)}
              >
                {array[index - 1] + 2 < page ? `...${page}` : page}
              </PageButtonComponent>
            );
          })}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === this.props.pages) return;
              this.changePage(activePage + 1);
            }}
            disabled={activePage === this.props.pages}
          >
            {this.props.nextText}
          </PageButtonComponent>
        </div>
      </div>
    );
  }
}

class TableReactTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "userId",
        sortable: false,
        filterable: false
      },
      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        Cell: props => {
          return <button className="">Delete</button>;
        },
        sortable: false,
        filterable: false
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defualtPageSize={5}
        showPagination={true}
        PaginationComponent={Pagination}
        noDataText={"Por favor espere"}
      />
    );
  }
}

ReactDOM.render(<AntDesignJSON />, document.getElementById("container"));
