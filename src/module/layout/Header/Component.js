import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Row, Col, Layout, Menu, Icon, Badge, Avatar, Modal, Dropdown, Button } from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'
import './style.scss'

import { USER_ROLE } from '@/constant'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {
    componentDidMount() {
        document.title = "Smart Bonus"
        this.props.getWallet().then((_wallet) => {
            this.setState({ wallet : _wallet });
        })
    }

    buildAcctDropdown() {

        const isLogin = this.props.isLogin
        const hasAdminAccess = [USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(this.props.role)

        return (
            <Menu onClick={this.clickItem.bind(this)}>
                {isLogin ?
                    <Menu.Item key="profile">
                        {I18N.get('0200')}
                    </Menu.Item> :
                    <Menu.Item key="login">
                        {I18N.get('0201')}
                    </Menu.Item>
                }
                {isLogin && hasAdminAccess &&
                    <Menu.Item key="admin/tasks">
                        {I18N.get('0203')}
                    </Menu.Item>
                }
                {isLogin &&
                    <Menu.Item key="logout">
                        {I18N.get('0204')}
                    </Menu.Item>
                }
            </Menu>
        )
    }

    renderHeader() {
        const isLogin = this.props.isLogin;
        if (isLogin) {
            return (
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                        <span className="wallet"> {this.state.wallet}
                        </span>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button className="right-side" onClick={this.logout.bind(this)} >
                            <Icon type="logout" />{I18N.get('0204')}
                        </Button>
                    </Col>
                </Row>
            )
        } else {
            return (
                <div className="xlogo" style={{background:'#0d47a1'}}>
                    <img src='/assets/images/logo.png' />
                </div>

            )
        }
    }

    ord_render() {

        const isLogin = this.props.isLogin

        return (
            <Header style={{ background: '#0d47a1', padding: 0 }}>
                {this.renderHeader()}

            </Header>
        )
    }

    logout(e) {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.logout()
            },
            onCancel() {
            }
        })

    }
}
