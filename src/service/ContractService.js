import BaseService from '../model/BaseService'
import _ from 'lodash'
import Tx from 'ethereumjs-tx'
const SolidityFunction = require('web3/lib/web3/function')
import {WEB3} from '@/constant'

export default class extends BaseService {

    //Basic Functions
    async callFunction(functionName, params) {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        
        const functionDef = new SolidityFunction('', _.find(WEB3.ABI, { name: functionName }), '')
        //const payloadData = functionDef.toPayload(params).data
        //console.log("check" + wallet.getAddressString())

        const nonce = web3.eth.getTransactionCount(wallet.getAddressString())
        const rawTx = {
            nonce: nonce,
            from: wallet.getAddressString(),
            value: '0x0',
            to: contract.address,
            data: payloadData
        }
        
        const gas = this.estimateGas(rawTx)
        rawTx.gas = gas
        //console.log("check" + rawTx)
        return this.sendRawTransaction(rawTx)
    }

    sendRawTransaction(rawTx) {
        const storeUser = this.store.getState().user
        let {web3, wallet} = storeUser.profile

        const privatekey = wallet.getPrivateKey()
        const tx = new Tx(rawTx)
        tx.sign(privatekey)
        const serializedTx = tx.serialize()

        return web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'))
    }

    estimateGas(rawTx) {
        const storeUser = this.store.getState().user
        let {web3} = storeUser.profile
        let gas

        try {
            gas = web3.eth.estimateGas(rawTx)
        } catch (err) {
            gas = 100000
        }

        return gas
    }

    //Owner Functions

    async deposit(amount) {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile

        //const functionDef = new SolidityFunction('', _.find(WEB3.ABI, { name: 'deposit' }), '')
        //const payloadData = functionDef.toPayload([packageId]).data
        const nonce = web3.eth.getTransactionCount(wallet.getAddressString())

        const rawTx = {
            nonce: nonce,
            from: wallet.getAddressString(),
            value: web3.toWei(amount, "ether"),
            to: contract.address,
            //data: payloadData
            data: null
        }

        const gas = this.estimateGas(rawTx)
        rawTx.gas = gas

        return this.sendRawTransaction(rawTx)
    }

    async addMember(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.addMember(address)
    }

    async ownerWithdraw(amount) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.ownerWithdraw(amount)
    }

    async setFixedPercent(percent) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.setFixedPercent(percent)
    }

    async createLockedAmount(address, amount) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.createLockedAmount(address, amount)
    }

    async removeBonusAmount(address, isSpecific, amountId) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.removeBonusAmount(address, isSpecific, amountId)
    }

    //Members Functions

    async memberWithdraw() {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.memberWithdraw()
    }

    //Public Functions

    async getLockedAmount(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getLockedAmount(address)
    }

    async getUnlockedAmount(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getUnlockedAmount(address)
    }

    async getWithdrawnAmount(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getWithdrawnAmount(address)
    }

    async getFixedHistory(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getFixedHistory(address)
    }

    async getBonusHistory(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getBonusHistory(address)
    }

    async getFixedPercent() {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.FIXED_PERCENT()
    }

    async getTotalAmount() {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.totalAmount().toString()
    }

    async isOwner() {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.isOwner()
    }

    //Events

    getEventOwnerDeposit() {
        console.log("ok")
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.OwnerDepositSuccess()
    }

    getEventOwnerWithdraw() {
        console.log("ok")
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.OwnerWithdrawSuccess()
    }

}
