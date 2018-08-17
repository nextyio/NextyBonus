import {createContainer} from '@/util'
import Component from './Component'
import ContractService from '@/service/ContractService'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
    return {
        ...state.user
    }
}, () => {
    const contractService= new ContractService()
    const userService= new UserService()

    return {
        //Basic Functions
        async getBalance() {
            return await userService.getBalance()
        },
        async callFunction(functionName, params) {
            return await contractService.callFunction(functionName, params)
        },

        //Owners Functions
        async ownerWithdraw(_amount) {
            return await contractService.ownerWithdraw(_amount)
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
        getBonusHistory(_address) {
            return contractService.getBonusHistory(_address)
        },
        getFixedPercent() {
            return contractService.getFixedPercent()
        },
        getMemberList() {
            return contractService.member()
        },
        async getTotalAmount() {
            return await contractService.getTotalAmount()
        },
        isOwner() {
            return contractService.isOwner()
        },
        getEventCreatedSuccess() {
            return contractService.getEventCreatedSuccess()
        },
        getEventChangePercentSuccess() {
            return contractService.getEventChangePercentSuccess()
        },
        
    }
})
