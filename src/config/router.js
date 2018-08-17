import DepositPage from '@/module/page/deposit/Container'
import WithdrawPage from '@/module/page/withdraw/Container'
import AdminSendPage from '@/module/page/send/Container'
import SetPercentPage from '@/module/page/percent/Container'
import HistoryPage from '@/module/page/history/Container'
import ReturnPage from '@/module/page/return/Container'
import ClaimPage from '@/module/page/claim/Container'
import LoginPage from '@/module/page/login/Container'
import TermsConditionsPage from '@/module/page/terms/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
    {
        path: '/',
        page: LoginPage
    },
    {
        path: '/deposit',
        page: DepositPage
    },
    {
        path: '/withdraw',
        page: WithdrawPage
    },
    {
        path: '/send',
        page: AdminSendPage
    },
    {
        path: '/history',
        page: HistoryPage
    },
    {
        path: '/return',
        page: ReturnPage
    },
    {
        path: '/claim',
        page: ClaimPage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/percent',
        page: SetPercentPage
    },
    {
        path: '/terms-conditions',
        page: TermsConditionsPage
    },
    {
        page: NotFound
    }
]
