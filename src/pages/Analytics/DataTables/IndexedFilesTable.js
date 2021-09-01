import React from 'react';
import 'antd/dist/antd.css';
import "../../../assets/pages.css";
import PropTypes from 'prop-types';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class IndexedFilesTable extends React.Component {
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
                width: '25%',
                ...this.getColumnSearchProps('extension'),
            },
            {
                title: 'Indexable Items',
                dataIndex: 'indexable',
                key: 'indexable',
                width: '25%',
            },
            {
                title: 'Coverage',
                dataIndex: 'index_count',
                key: 'index_count',
                width: '25%',
            },
            {
                title: 'Coverage%',
                dataIndex: 'percentage',
                key: 'percentage',
                width: '25%',
                render: (percentage) => {
                    return percentage.toFixed(2) === 0 ? "<0.01%" : percentage.toFixed(2) + '%'
                }
            },
        ];
        const { items, loading, error} = this.props;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='table-content'>
                    <h2 className="table-title">Text</h2>
                    <Table
                        columns={columns}
                        dataSource={items}
                        rowKey={record => record.extension}
                        className="blueDonut"
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
                    />
                </div>
            );
        }
    }
}
IndexedFilesTable.propTypes = {
    items: PropTypes.array,
}
export default IndexedFilesTable
