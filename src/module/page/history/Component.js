import React from 'react';
import LoggedInPage from '../LoggedInPage';
import Footer from '@/module/layout/Footer/Container'
import Tx from 'ethereumjs-tx'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

import './style.scss'

import { Col, Row, Icon, Input, Breadcrumb, Table } from 'antd'
const Search = Input.Search;

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobi l e') !== -1);
};

const isMobile = isMobileDevice();

export default class extends LoggedInPage {
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        this.loadData()
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

    loadData() {
        //this.props.deposit(1)
        this.props.getWallet().then((_wallet) => {
            console.log("Wallet  " + _wallet +"test")
           /* this.props.callFunction('getWithdrawnAmount', [_wallet]).then((_withdrawnAmount) => {
                console.log("lockedAmount1" + _withdrawnAmount)
            })*/
            this.props.getLockedAmount(_wallet).then((_amount) => {
                console.log("Locked Amount " + _amount)
            })

            this.props.getUnlockedAmount(_wallet).then((_amount) => {
                console.log("Unlocked Amount " + _amount)
            })

            this.props.getWithdrawnAmount(_wallet).then((_amount) => {
                console.log("Withdrawn Amount " + _amount)
            })

            this.props.getHistoryLength(_wallet).then((_length) => {
                console.log("History Length " + _length)
            })

            this.props.getFixedHistory(_wallet).then((_history) => {
                console.log("Fixed history" + JSON.stringify(_history))
                this.setState({
                    history: _history
                })
            })

           /*this.props.getContributionsInfo().then((data) => {
            
                this.setState({
                    packages: data.sort((a, b) => this.state.sortByDate * (a.date - b.date))
                })
            })*/
/*
            this.props.getBonusHistory(_wallet).then((_history) => {
                console.log("Bonus history" + _history.toString())
            })
            */
        })

        this.props.isOwner().then((_isOwner) => {
            console.log("isOwner ?  " + _isOwner)
        })

        this.props.getTotalAmount().then((_totalAmount) => {
            console.log("Total Amount " + _totalAmount)
        })

        this.props.getFixedPercent().then((_percent) => {
            console.log("Percent " + _percent)
        })

        this.props.getBalance().then((_balance) => {
            console.log("balance" + _balance)
        })
    }

    searchByAddress(address){
        this.props.getFixedHistory(address).then((_history) => {
            console.log("Fixed history" + JSON.stringify(_history))
            this.setState({
                history: _history
            })
        })
    }

    statusDisplay(statusId){
        console.log(statusId)
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

    renderTable() {
        const dataSource = this.state.history;

        const columns = [
            
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
                title: 'lockStatus',
                dataIndex: 3,
                key: 'status',
                render: (status) => {
                    return <p>{this.statusDisplay(Number(status))}</p>
                }
            }
        ];

        return (<Table pagination={false} dataSource={dataSource} columns={columns} scroll={{x: this.state.scroll}} />);
    }

    ord_renderContent () {
        let {wallet, web3} = this.props.profile
        if (!wallet || !web3) {
            return null;
        }

        const balance = parseFloat(web3.fromWei(wallet.balance, 'ether'))
        const address = wallet.getAddressString()

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
