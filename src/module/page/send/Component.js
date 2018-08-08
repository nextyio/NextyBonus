import React from 'react';
import LoggedInPage from '../LoggedInPage';
import Footer from '@/module/layout/Footer/Container'
import Tx from 'ethereumjs-tx'
import { Link } from 'react-router-dom'

import './style.scss'

import { Col, Row, Icon, Form, Notification, Button, Breadcrumb, InputNumber, Input, Modal } from 'antd'
const FormItem= Form.Item;

let SHA3 = require('crypto-js/sha3');
let sha3 = (value) => {
    return SHA3(value, {
        outputLength: 256
    }).toString();
    }

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobi l e') !== -1);
};

const isMobile= isMobileDevice();
const EPSILON= 1e-10

export default class extends LoggedInPage {
    componentDidMount() {
        this.loadData()
    }

    loadData() {
    
        //this.props.deposit(1)
        this.setState({
            addressError: "invalid walletAddress",
            amountError: "invalid input",
            amount: 0,
            toWallet: '',
        })

        this.props.isOwner().then((_isOwner) => {
            console.log("isOwner ?  " + _isOwner)
        })

        this.props.getFixedPercent().then((_percent) => {
            this.setState({
                currentPercent: _percent,
                setPercent: 100
            })
            console.log("Percent " + _percent)
        })

        this.props.getTotalAmount().then((_totalAmount) => {
            this.setState({
                totalAmount: _totalAmount * 1e-18
            })
            console.log("Total Amount " + _totalAmount)
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
                    <Row className= "defaultPadding">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Balance:
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.numberDisplay(this.state.totalAmount)} NTY
                        </Col>
                    </Row>

                    <Row className= "defaultPadding">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Staff's wallet address:
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <Input
                                className= "defaultWidth"
                                defaultValue= {''}
                                value= {this.state.toWallet}
                                onChange= {this.onToWalletChange.bind(this)}
                            />
                        </Col>
                    </Row>

                    <Row className= "defaultPadding">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Amount:
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumber 
                                className= "defaultWidth"
                                defaultValue= {0}
                                value= {this.state.amount}
                                onChange= {this.onAmountChange.bind(this)}
                            />
                        </Col>
                    </Row>

                    <Row className= "defaultPadding">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            Fixed percent:
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumber 
                                className= "defaultWidth"
                                min={0}
                                max={100}
                                formatter={value => `${parseInt(value)}`}
                                defaultValue= {Number(this.state.currentPercent)}
                                //defaultValue= {100}
                                value= {this.state.setPercent}
                                onChange= {this.onPercentChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Col xs={24} sm={24} md={12} lg={24} xl={24} className= "centerDraw defaultWidth defaultPadding">
                        <Button type= "primary" onClick= {this.confirm.bind(this)} className= "defaultWidth" >Send</Button>
                    </Col>
                    
                </Col>
            </div>
        )
    }

    ord_renderBreadcrumb() {
        return (
            <Breadcrumb style={{ 'marginLeft': '16px', 'marginTop': '16px', float: 'right' }}>
                <Breadcrumb.Item><Icon type="home" /> Home</Breadcrumb.Item>
                <Breadcrumb.Item> Send</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    validValue(value) {
        var deciPart= (value + ".").split(".")[1];
      //   console.log(deciPart)
        if (deciPart.length > 2) {return value.toFixed(2)} else {return value};
    }

    isChecksumAddress (address) {
        // Check each case
        address = address.replace('0x','');
        let addressHash = sha3(address.toLowerCase());
    
        for (let i = 0; i < 40; i++ ) {
            // The nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
                (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };

    isWalletAddress(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return this.isChecksumAddress(address);
        }
    };

    onToWalletChange(e) {
        //console.log(this.isWalletAddress(e.target.value))
        if (!this.isWalletAddress(e.target.value)) {
            this.setState({
                addressError: "invalid walletAddress",
            })
        } else
        this.setState({
            addressError: null
        })
        

        this.setState({
            toWallet: e.target.value,
            txhash: null,
        })
    }

    onPercentChange(value) {
        console.log(value);
        if ((value != parseInt(value)) || (value < 0) || (value >100)) {
            this.setState({
                percentError: "Percent must be a posivtive integer number in range [0,100]",
            })
        } else
        this.setState({
            percentError: null
        })

        this.setState({
            setPercent: value,
            txhash: null,
        })
    }

    onAmountChange(value) {
        if (isNaN(value)) {
            this.setState({
                amountError: "Amount must be a number",
            })
        } else 
        if (value <= 0 ) {
            this.setState({
                amountError: "Amount must be greater than 0",
            })
        } else
        if (this.state.totalAmount + EPSILON < value ) {
            this.setState({
                amountError: "Amount cannot be exceeded current balance",
            })
        } else
        this.setState({
            amountError: null
        })

        this.setState({
            amount: this.validValue(value),
            txhash: null,
        })
    }

    confirm() {
        var error = false;
        if (this.state.percentError) {
            Notification.error({
                message: this.state.percentError,
            });
            error = true;
        }
        if (this.state.addressError) {
            Notification.error({
                message: this.state.addressError,
            });
            error = true;
        }
        if (this.state.amountError) {
            Notification.error({
                message: this.state.amountError,
            });
            error = true;
        }

        if (error) return false;

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
        console.log(this.state.toWallet + " " +this.state.amount + " " + this.state.setPercent)
        this.props.callFunction('createLockedAmount', [this.state.toWallet, this.state.amount*1e18]).then((result) => {
            console.log("called Create func")
            if (!result) {
                Message.error('Cannot send transaction!')
            }

            var event= self.props.getEventCreatedSuccess()
            event.watch(function (err, response) {
                if(response.event == 'CreatedSuccess') {
                    self.setState({
                        tx_success: true,
                        isLoading: false
                    });
                    self.loadData();
                    Notification.success({
                        message: 'Sent successfully!',
                    });
                    event.stopWatching()
                }
            });
        })
    }

    numberDisplay(value) {
        return Number(value).toFixed(2)
    }
}
