import {createContainer} from '@/util'
import Component from './Component'
import ContractService from '@/service/ContractService'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
    return {
        ...state.user
    }
}, () => {
    const contractService = new ContractService()
    const userService = new UserService()

    return {
        //Basic Functions
        async getBalance() {
            return await userService.getBalance()
        },
        async getWallet() {
            return await userService.getWallet()
        },
        async callFunction(functionName, params) {
            return await contractService.callFunction(functionName, params)
        },

        //Owners Functions
        deposit(_amount) {
            return contractService.deposit(_amount)
        },
        addMember(_address) {
            return contractService.addMember(_address)
        },
        setFixedPercent(_percent) {
            return contractService.setFixedPercent(_percent)
        },
        ownerWithdraw(_amount) {
            return contractService.ownerWithdraw(_amount)
        },
        removeBonusAmount(_address, _isSpecific, _amountId) {
            return contractService.removeBonusAmount(_address, _isSpecific, _amountId)
        },

        //Members Functions
        memberWithdraw() {
            return contractService.memberWithdraw()
        },

        //Public Functions
        getLockedAmount(_address) {
            return contractService.getLockedAmount(_address)
        },
        getUnlockedAmount(_address) {
            return contractService.getUnlockedAmount(_address)
        },
        getWithdrawnAmount(_address) {
            return contractService.getWithdrawnAmount(_address)
        },
        getFixedHistory(_address) {
            return contractService.getFixedHistory(_address)
        },        
        getBonusHistory(_address, i) {
            return contractService.getBonusHistory(_address, i)
        },
        getHistoryLength(_address) {
            return contractService.getHistoryLength(_address)
        },
        getFixedPercent() {
            return contractService.getFixedPercent()
        },
        getExtraBonusPercent(_address) {
            return contractService.getFixedHistory(_address)
        },
        getMemberList() {
            return contractService.member()
        },
        getTotalAmount() {
            return contractService.getTotalAmount()
        },
        isOwner() {
            return contractService.isOwner()
        },
        getEventRemovedSuccess() {
            return contractService.getEventRemovedSuccess()
        }
    }
})
