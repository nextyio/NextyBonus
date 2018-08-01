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
        const payloadData = functionDef.toPayload(params).data

        const nonce = web3.eth.getTransactionCount(wallet.getAddressString())
        const rawTx = {
            nonce: nonce,
            from: wallet.getAddressString(),
            value: '0x0',
            to: contract.address,
            data: payloadData
        }
        
        //const gas = this.estimateGas(rawTx)
        const gas = 6000000
        rawTx.gas = gas

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
        return contract.ownerWithdraw(amount*1e18)
    }

    async setFixedPercent(percent) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.setFixedPercent(percent)
    }

    async createLockedAmount(address, amount, fixedPercent) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.createLockedAmount(address, web3.toWei(amount, "ether"), fixedPercent)
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

    async updateStatus(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.updateStatus(address)
    }

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

        var historyLength = contract.getHistoryLength(address)
        var history = []

        for (let i = 0; i < historyLength; i++) {
            var bonusHistoryById = contract.getBonusHistory(address, i)
            var fixedHistoryById = contract.getFixedHistory(address, i)

            history.push({
                index: i*2,
                ...fixedHistoryById
            })
            history.push({
                index: i*2 + 1,
                ...bonusHistoryById
            })
        }

        return history;
    }

    async getBonusHistory(address, i) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getBonusHistory(address, i)
    }

    async getHistoryLength(address) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.getHistoryLength(address)
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
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.OwnerDepositSuccess()
    }

    getEventOwnerWithdraw() {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.OwnerWithdrawSuccess()
    }

    getEventCreatedSuccess() {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.CreatedSuccess()
    }

    getEventMemberWithdraw() {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.MemberWithdrawSuccess()
    }

    getEventRemovedSuccess() {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        return contract.RemovedSuccess()
    }

}
