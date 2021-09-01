import React from 'react';
import 'antd/dist/antd.css';
import "../../../assets/pages.css"
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';


class LanguageTypeDataTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageSize:5,
            page: 1,
        };
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },

        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const columns = [
            {
                title: 'Type',
                dataIndex: 'extension',
                key: 'extension',
                width: '30%',
                ...this.getColumnSearchProps('extension'),
            },
            {
                title: 'Number of  Items',
                dataIndex: 'count',
                key: 'count',
                width: '30%',
            },
            {
                title: 'Coverage%',
                dataIndex: 'percentage',
                key: 'percentage',
                width: '30%',
                render: (percentage) => {
                    return (percentage*100).toFixed(2) === "0.00" ? "<0.01%" : (percentage*100).toFixed(2) + '%'
                }
            },
        ];
        const { items ,loading, error} = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='table-content'>
                    <h2 className="table-title">English</h2>
                    <Table columns={columns}
                           dataSource={ items }
                           rowKey={ record => record.extension }
                           pagination={{
                               showSizeChanger:  true,
                               current: this.state.page,
                               pageSize: this.state.pageSize,
                               pageSizeOptions: [2, 5, 15, 25],
                               onChange: (page, pageSize) => {
                                   this.setState({
                                       pageSize: pageSize,
                                       page: page,
                                   })
                               }
                           }}
                           className="lightBlueTable"/>
                </div>
            );
        }
    }
}
LanguageTypeDataTable.propTypes = {
    items: PropTypes.array,
}
export default LanguageTypeDataTable
