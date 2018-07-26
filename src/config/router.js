import HomePage from '@/module/page/home/Container'
import DashboardPage from '@/module/page/dashboard/Container'
import SmartStakingPage from '@/module/page/smart-staking/Container'
import ListPackagePage from '@/module/page/list-package/Container'
import DetailPackagePage from '@/module/page/detail-package/Container'
import SettingPackagePage from '@/module/page/setting-package/Container'
import DepositPage from '@/module/page/deposit/Container'
import LoginPage from '@/module/page/login/Container'
import TermsConditionsPage from '@/module/page/terms/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/home',
        page: HomePage
    },
    {
        path: '/dashboard',
        page: DashboardPage
    },
    {
        path: '/smart-staking',
        page: SmartStakingPage
    },
    {
        path: '/deposit',
        page: DepositPage
    },
    {
        path: '/list-package',
        page: ListPackagePage
    },
    {
        path: '/setting-packages',
        page: SettingPackagePage
    },
    {
        path: '/list-package/:id',
        page: DetailPackagePage
    },
    {
        path: '/login/:contractAdress',
        page: LoginPage
    },
    {
        path: '/terms-conditions',
        page: TermsConditionsPage
    },
    {
        page: NotFound
    }
]
