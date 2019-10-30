import React from 'react';
import LoggedInPage from '../LoggedInPage';
import moment from 'moment/moment'

import './style.scss'

import { Col, Row, Icon, Input, Breadcrumb, Table, Button, Modal, Notification, DatePicker  } from 'antd'
const Search = Input.Search;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';
const monthFormat = 'YYYY/MM';

import NumberFormat from 'react-number-format';

export default class extends LoggedInPage {
    componentDidMount() {
        this.setState({ 
            searchFrom : Number(moment('01/01/2018')),
            searchTo : Number(moment(new Date("DD/MM/YYYY")))
        });
        window.addEventListener('resize', this.handleWindowSizeChange); 
        this.props.getWallet().then((_wallet) => {
            this.setState({ searchWallet : _wallet });
            this.loadData(_wallet) //load data base on current wallet
        })
        this.setScroll(window.innerWidth)
    }

    handleWindowSizeChange = () => {
        this.setScroll(window.innerWidth)
    };

    setScroll(width){
        var scroll= 0;
        if (width < 600) scroll= 375;
        this.setState({ scroll : scroll });
    }

    loadData(_wallet) {
        this.props.callFunction('updateStatus', [_wallet])

        this.props.getFixedHistory(_wallet).then((_history) => {
            var dataSource = []
            var self = this
            var length = 0
            _history.map(function(row){
                    if (self.inRange(row, self.state.searchFrom, self.state.searchTo)) {
                        dataSource.push(row)
                        dataSource[length]['index'] = length
                        length++
                    }
                }
            );
            this.setState ({
                history: _history,
                searchHistory : dataSource
            })
        })
    }

    searchByAddress(address){
        this.setState({
            searchWallet : address
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
        return false;
    }

    comfirm(dataSource, index) {
        if (!this.props.is_admin) return false;
        var removeable= dataSource[index][4]; //get bool removeable from smart contract output
        if (!removeable) return false;
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
                this.onComfirm(dataSource[index]['amountId'])
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
        this.props.callFunction('removeBonusAmount', [this.state.searchWallet, true, parseInt(index)]).then((result) => {
             if (!result) {
                 Message.error('Cannot send transaction!')
             }

             var event= self.props.getEventRemovedSuccess()
             event.watch(function (err, response) {
                 //conssole.log(response.args._amount.toString())
                 if (response.event == 'RemovedSuccess') {
                    if (Number(response.args._amount) == 0) {
                        self.loadData(self.state.searchWallet);
                        return;
                    }
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
        var removeable= dataSource[index][4]; //get bool removeable from smart contract output
        //conssole.log(index)
        ////conssole.log(dataSource[index])
        if (removeable) 
        return (
            <div><Button type= "primary" className= "defaultWidth" >Remove</Button></div>
       )
        return (<div></div>);
    }

    renderDatetime(time, formatString) {
        return ( 
            <p>{moment.utc(time * 1000).format(formatString) }</p>
        )
    }

    renderAmount(amountString, decimalNumber, convert, dataSource, record) {
        var i= Number(record.index);
        if (i % 2 == 1) i--;
        //conssole.log(i, dataSource[i])
        var aPercent= Number(dataSource[i][5]);
        var bPercent= Number(dataSource[i+1][5]);
        
        var mul=1
        if (convert == 'toEther') mul= 1e-18
        if (convert == 'toWei') mul= 1e18
        return (
            <p>{(this.numberDisplay(amountString * mul))} NTY/{record.index % 2 == 0 ? aPercent : bPercent} %</p>
        )
    }
    

    inRange(row, from, to) {
        var fromDate = moment(from).format('YYYYMMDD')
        var toDate = moment(to).format('YYYYMMDD')
        var rowDate = moment(Number(row[0] * 1000)).format('YYYYMMDD')
        console.log(fromDate, toDate, rowDate)
        var inrange = (fromDate <= rowDate) && (toDate >= rowDate)
        ////conssole.log(this.state.searchFrom,this.state.searchTo,Number(row[0]) *1000, inrange)
        return inrange
        
    }

    renderTable() {

        var columns = [
            
            {
                title: 'Date',
                dataIndex: 0,
                key: 'time',
                render: (time) => {
                    return this.renderDatetime(time, 'DD/MM/YYYY')
                }
            }, 
            {
                title: 'End',
                dataIndex: 1,
                key: 'endTime',
                render: (endTime) => {
                    return this.renderDatetime(endTime, 'DD/MM/YYYY')
                }
            }, 
            {
                title: 'Amount',
                dataIndex: 2,
                key: 'amount',
                render: (amount, record) => {
                    console.log(record);
                    return this.renderAmount(amount, 2, 'toEther', this.state.searchHistory, record)
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

        //column for admin only
        if (this.props.is_admin)
        columns.push({ 
            title: 'Return',
            dataIndex: 'index',
            key: 'index',
            render: (record) => {
                return this.renderReturnButton(this.state.searchHistory, record)
            }
        })

        return (
            <Table   
                onRow={(record) => {
                    ////conssole.log(Number(this.state.searchFrom),record[0].toString())
                    //if ((Number(this.state.searchFrom) < 1000* Number(record[0])) && (Number(this.state.searchTo) > 1000* Number(record[0])))
                    return {
                        onClick: () => {this.comfirm(this.state.searchHistory, record.index)},       // click row, index =  rowNumber
                    };
                }} 
                rowClassName={(record, index) => index % 2 == 1 ? 'highlightRow' : '' }
                pagination={{ pageSize: 20 }} dataSource= {this.state.searchHistory} columns= {columns} scroll= { {x: this.state.scroll} } 
            />
        );
    }

    rangeChange(e) {
        var from = e[0] ? Number(moment(e[0])) : Number(moment('01/01/2018'))
        var to = e[1] ? Number(moment(e[1])) : Number(moment(new Date("DD/MM/YYYY")))
        this.setState({
            searchFrom : from,
            searchTo : to
        })
        var dataSource = []
        var self = this
        var length = 0
        if (this.state.history)
        this.state.history.map(function(row){
                if (self.inRange(row, from, to)) {
                    dataSource.push(row)
                    dataSource[length]['index'] = length
                    length++
                }
            }
        );
        this.setState ({
            searchHistory : dataSource
        })
        //conssole.log("datasource", dataSource)
        ////conssole.log(Number(moment(e[0])))
        ////conssole.log(Number(moment(e[1])))
    }

    ord_renderContent () {
        return (
            <Row>
                <Col xs={0} sm={0} md={0} lg={2} xl={3}/>
                <Col xs={24} sm={24} md={24} lg={20} xl={18}>
                {this.props.is_admin &&
                <Search 
                    placeholder= "Wallet address"
                    onSearch= {value => this.searchByAddress(value)}
                    style= { { width: 400 } }
                />
                }
                <RangePicker 
                    onChange = {this.rangeChange.bind(this)}
                    defaultValue={[moment('01/01/2018', dateFormat), moment(new Date(), dateFormat)]}
                    format={dateFormat}
                />
                    { this.renderTable() }
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

    numberDisplay(value) {
        return <NumberFormat value={Number(value).toFixed(2)} displayType={'text'} thousandSeparator={true} />
        //return Number(value).toFixed(2)
    }
}
