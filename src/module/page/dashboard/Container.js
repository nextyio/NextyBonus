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
        async getFund() {
            return await contractService.getFund()
        },
        async getFundBonus() {
            return await contractService.getFundBonus()
        },
        async getPackagesInfo() {
            return await contractService.getPackagesInfo()
        },
        async getBalance() {
            return await userService.getBalance()
        },
        async callFunction(functionName, params) {
            return await contractService.callFunction(functionName, params)
        },
        getMemberList() {
            return contractService.getMemberList()
        },
        setFixedPercent(_percent) {
            return contractService.setFixedPercent(_percent)
        },
    }
})
