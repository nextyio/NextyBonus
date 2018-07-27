import React from 'react';
import LoggedInPage from '../LoggedInPage';
import Footer from '@/module/layout/Footer/Container'
import Tx from 'ethereumjs-tx'
import { Link } from 'react-router-dom'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Dropdown, Breadcrumb } from 'antd'
const FormItem = Form.Item;

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobi l e') !== -1);
};

const isMobile = isMobileDevice();

export default class extends LoggedInPage {
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.props.deposit(10)
        this.props.getFixedPercent().then((_percent) => {
            console.log("Percent " + _percent)
        })

        this.props.getBalance().then((_balance) => {
            console.log("balance" + _balance)
        })
    }

    ord_renderContent () {
        let {wallet, web3} = this.props.profile
        if (!wallet || !web3) {
            return null;
        }

        const balance = parseFloat(web3.fromWei(wallet.balance, 'ether'))
        const address = wallet.getAddressString()

        return (
            <div> test </div>
        )
    }

    ord_renderBreadcrumb() {
        return (
            <Breadcrumb style={{ 'marginLeft': '16px', 'marginTop': '16px', float: 'right' }}>
                <Breadcrumb.Item><Link to="/dashboard"><Icon type="home" /> Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item> Dashboard</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}