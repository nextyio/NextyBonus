import HomePage from '@/module/page/home/Container'
import AdminSendPage from '@/module/page/send/Container'
import HistoryPage from '@/module/page/history/Container'
import ReturnPage from '@/module/page/return/Container'
import ClaimPage from '@/module/page/claim/Container'
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
