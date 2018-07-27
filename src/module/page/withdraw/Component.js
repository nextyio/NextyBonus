import React from 'react';
import LoggedInPage from '../LoggedInPage';
import Footer from '@/module/layout/Footer/Container'
import Tx from 'ethereumjs-tx'
import { Link } from 'react-router-dom'

import './style.scss'

import { Col, Row, Icon, Form, Notification, Button, Breadcrumb, InputNumber, Modal } from 'antd'
const FormItem= Form.Item;

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobi l e') !== -1);
};

const isMobile= isMobileDevice();

export default class extends LoggedInPage {
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        //this.props.deposit(1)
        this.setState({
            amount: 0
        })

        this.props.isOwner().then((_isOwner) => {
            console.log("isOwner ?  " + _isOwner)
        })

        this.props.getTotalAmount().then((_totalAmount) => {
            this.setState({
                totalAmount: _totalAmount * 1e-18
            })
            console.log("Total Amount " + _totalAmount)
        })

        this.props.getFixedPercent().then((_percent) => {
            console.log("Percent " + _percent)
        })

        this.props.getBalance().then((_balance) => {
            this.setState({
                balance: _balance
            })
            console.log("balance" + _balance)
        })
    }

    ord_renderContent () {
        let {wallet, web3} = this.props.profile
        if (!wallet || !web3) {
            return null;
        }

        return (
            <div>
                <Col xs={1} sm={1} md={6} lg={6} xl={6}>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12} xl={12}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Your balance
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.numberDisplay(this.state.balance)} NTY
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Total amount
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.numberDisplay(this.state.totalAmount)} NTY
                        </Col>
                    </Row>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <InputNumber 
                            className= "defaultWidth"
                            defaultValue= {0}
                            value= {this.state.amount}
                            onChange= {this.onAmountChange.bind(this)}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type= "primary" onClick= {this.confirm.bind(this)} className= "defaultWidth" >Withdraw</Button>
                    </Col>
                    
                </Col>
            </div>
        )
    }

    ord_renderBreadcrumb() {
        return (
            <Breadcrumb style={{ 'marginLeft': '16px', 'marginTop': '16px', float: 'right' }}>
                <Breadcrumb.Item><Icon type="home" /> Home</Breadcrumb.Item>
                <Breadcrumb.Item> Deposit</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    validValue(value) {
        var deciPart= (value + ".").split(".")[1];
      //   console.log(deciPart)
        if (deciPart.length > 2) {return value.toFixed(2)} else {return value};
    }

    onAmountChange(value) {
        if (this.state.totalAmount + EPSILON < value ) {
          this.setState({
              notEnoughNTY: "Your balance is not enough",
          })
        } else
        this.setState({
            notEnoughNTY: null
        })

        this.setState({
            amount: this.validValue(value),
            txhash: null,
        })
    }

    confirm() {
        const content = (
            <div>
                <div>
                    Amount: {this.state.amount} NTY
                </div>
            </div>
        );
        Modal.confirm({
            title: 'Are you sure?',
            content: content,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.onConfirm()
            },
            onCancel() {
            }
        })
    }

    onConfirm() {
        this.setState({
            isLoading: true
        });

        const self= this;
        this.props.ownerWithdraw(Number(this.state.amount) - EPSILON).then((result) => {
            if (!result) {
                Message.error('Cannot send transaction!')
            }
            self.loadData();
            Notification.success({
                message: 'Withdraw successfully!',
            });

            var event= self.props.getEventOwnerWithdraw()
            event.watch(function (err, response) {
                console.log("withdraw success")
                if(response.event == 'OwnerWithdrawSuccess') {
                    self.setState({
                        tx_success: true,
                        isLoading: false
                    });
                    self.loadData();
                    Notification.success({
                        message: 'Withdraw successfully!',
                    });
                    event.stopWatching()
                }
            });
        })
        //setTimeout(this.loadData.bind(this), 6000);
    }

    numberDisplay(value) {
        return Number(value).toFixed(2)
    }
}
