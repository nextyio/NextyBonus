import BaseService from '../model/BaseService'
import _ from 'lodash'
import Tx from 'ethereumjs-tx'
const SolidityFunction = require('web3/lib/web3/function')
import {WEB3} from '@/constant'

export default class extends BaseService {

    async callFunction(functionName, params) {
        const storeUser = this.store.getState().user
        let {contract, web3, wallet} = storeUser.profile
        
        const functionDef = new SolidityFunction('', _.find(WEB3.ABI, { name: functionName }), '')
        console.log("check" + wallet.getAddressString())
        const payloadData = functionDef.toPayload(params).data
        console.log("check" + wallet.getAddressString())

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
        console.log("check" + rawTx)
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

    async getMemberList() {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.FIXED_PERCENT().toString()
    }

    setFixedPercent(_percent) {
        const storeUser = this.store.getState().user
        let {contract} = storeUser.profile
        if (!contract) {
            return
        }
        return contract.setFixedPercent(_percent);
    }

}
