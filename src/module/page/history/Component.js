import React from 'react';
import LoggedInPage from '../LoggedInPage';
import Footer from '@/module/layout/Footer/Container'
import Tx from 'ethereumjs-tx'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

import './style.scss'

import { Col, Row, Icon, Input, Breadcrumb, Table, Button, Modal, Notification } from 'antd'
const Search = Input.Search;

export default class extends LoggedInPage {
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        this.props.getWallet().then((_wallet) => {
            this.setState({ searchWallet: _wallet });
            this.loadData(_wallet)
        })
        this.setScroll(window.innerWidth)
    }

    handleWindowSizeChange = () => {
        this.setScroll(window.innerWidth)
    };

    setScroll(width){
        var scroll=0;
        if (width<600) scroll=375;
        this.setState({ scroll: scroll });
    }

    loadData(_wallet) {
        this.props.callFunction('updateStatus', [_wallet])

        this.props.getWallet().then((_wallet) => {
            this.setState({ searchWallet: _wallet });
        })

        this.props.getFixedHistory(_wallet).then((_history) => {
            this.setState({
                history: _history
            })
        })
        
    }

    searchByAddress(address){
        this.setState({
            searchWallet: address
        })
        this.props.getFixedHistory(address).then((_history) => {
            this.setState({
                history: _history
            })
        })
        this.loadData(address)
    }

    statusDisplay(statusId){
        switch(statusId) {
            case 0:
              return "Locked"
            case 1:
                return "Unlocked"
            case 2:
                return "Withdrawn"
            case 3:
                return "Removed"
        }
    }

    comfirm(index) {
        const content = (
            <div>
                    This staff has been working very hard !!! 
            </div>
        );
        Modal.confirm({
            title: 'Are you sure?',
            content: content,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.onComfirm(index)
            },
            onCancel() {
            }
        })
    }

    onComfirm(index) {

        this.setState({
            isLoading: true
        });

        const self= this;
        this.props.callFunction('removeBonusAmount', [this.state.searchWallet, true, parseInt(index / 2)]).then((result) => {
             if (!result) {
                 Message.error('Cannot send transaction!')
             }

             var event= self.props.getEventRemovedSuccess()
             event.watch(function (err, response) {
                 if(response.event == 'RemovedSuccess') {
                     self.setState({
                         tx_success: true,
                         isLoading: false
                     });
                     self.loadData(self.state.searchWallet);
                     Notification.success({
                         message: 'Remove successfully!',
                     });
                     event.stopWatching()
                 }
             });
         })
    }

    renderReturnButton(dataSource, index){
        var removeable= dataSource[index][4];
        if (removeable) 
        return (
            <div><Button type= "primary" className= "defaultWidth" >Remove</Button></div>
       )
        return (<div></div>);
    }

    renderTable() {
        const dataSource = this.state.history;

        var columns = [
            
            {
                title: 'Date',
                dataIndex: 0,
                key: 'time',
                render: (time) => {
                    return <p>{moment.utc(time * 1000).format('DD/MM/YYYY') }</p>
                }
            }, 
            {
                title: 'End',
                dataIndex: 1,
                key: 'endTime',
                render: (endTime) => {
                    return <p>{moment.utc(endTime * 1000).format('DD/MM/YYYY') }</p>
                }
            }, 
            {
                title: 'Amount',
                dataIndex: 2,
                key: 'amount',
                render: (amount) => {
                    return <p>{Number(parseFloat(amount / 1e18).toFixed(2)).toLocaleString()} NTY</p>
                }
            },
            {
                title: 'Status',
                dataIndex: 3,
                key: 'status',
                render: (status) => {
                    return <p>{this.statusDisplay(Number(status))}</p>
                }
            }
        ];
        if (this.props.is_admin)
        columns.push({ 
            title: 'Return',
            dataIndex: 'index',
            key: 'index',
            render: (record) => {
                return this.renderReturnButton(dataSource, record)
            }
        })

        return (<Table   
                    onRow={(record) => {
                        return {
                            onClick: () => {this.comfirm(record.index)},       // click row
                        };
                    }} 
                    pagination = {false} dataSource={dataSource} columns={columns} scroll={{x: this.state.scroll}} 
                />);
    }

    ord_renderContent () {

        return (
            <Row>
                <Col xs={0} sm={0} md={0} lg={2} xl={3}/>
                <Col xs={24} sm={24} md={24} lg={20} xl={18}>
                <Search
                    placeholder="Wallet address"
                    onSearch={value => this.searchByAddress(value)}
                    style={{ width: 200 }}
                />
                    {this.renderTable()}
                </Col>
            </Row>
        )
    }

    ord_renderBreadcrumb() {
        return (
            <Breadcrumb style={{ 'marginLeft': '16px', 'marginTop': '16px', float: 'right' }}>
                <Breadcrumb.Item><Icon type="home" /> Home</Breadcrumb.Item>
                <Breadcrumb.Item> History</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}
