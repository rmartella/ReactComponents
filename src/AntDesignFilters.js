import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

class AntDesignFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchedColumn: "",
      data: []
    };

    this.state.data = props.data;
  }

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
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}
