import { lazy } from "react";

export const routes = [
    {
        path: '/',
        exact: true,
        component: lazy(() => import('./RedirectPage'))
    },
    {
        path: '/file',
        exact: true,
        component: lazy(() => import('./File')),
        isPrivate: true,
        permission: [2, 3, 5]
    },
    {
        path: '/home',
        exact: true,
        component: lazy(() => import('./RedirectPage')),
        isPrivate: true,
    },
    {
        path: '/move',
        exact: true,
        component: lazy(() => import('./Move')),
        isPrivate: true,
        permission: [3]
    },
    {
        path: '/login',
        exact: true,
        component: lazy(() => import('./Login')),
    },
    {
        path: '/search',
        exact: true,
        component: lazy(() => import('./Search')),
        isPrivate: true,
        permission: [2, 3, 5]
    },
    {
        path: '/partycell',
        exact: true,
        component: lazy(() => import('./PartyCell')),
        isPrivate: true,
        permission: [7]
    },
    {
        path: '/openevaluate',
        exact: true,
        component: lazy(() => import('./OpenEvaluate')),
        isPrivate: true,
        permission: [15]
    },
    {
        path: '/evaluate',
        exact: true,
        component: lazy(() => import('./Evaluate')),
        isPrivate: true,
        permission: [13]
    },
    {
        path: '/evaluatesubject',
        exact: true,
        component: lazy(() => import('./EvaluateSubject')),
        isPrivate: true,
        permission: [14]
    },
    {
        path: '/evaluatedepartment',
        exact: true,
        component: lazy(() => import('./EvaluateDepartment')),
        isPrivate: true,
        permission: [15]
    },
    {
        path: '/category',
        exact: true,
        component: lazy(() => import('./Category')),
        isPrivate: true,
    },
    {
        path: '/statistic',
        exact: true,
        component: lazy(() => import('./Statistic')),
        isPrivate: true,
        permission: [8]
    },
    {
        path: '/rewarddiscipline',
        exact: true,
        component: lazy(() => import('./RewardDiscipline')),
        isPrivate: true,
    },
    {
        path: '/decentralization',
        exact: true,
        component: lazy(() => import('./Decentralization')),
        isPrivate: true,
        permission: [5]
    },
    {
        path: '/createvoting',
        exact: true,
        component: lazy(() => import('./CreateVoting')),
        isPrivate: true,
        permission: [9]
    },
    {
        path: '/voting',
        exact: true,
        component: lazy(() => import('./Voting')),
        isPrivate: true,
    },
    {
        path: '/votingmanage',
        exact: true,
        component: lazy(() => import('./VotingManage')),
        isPrivate: true,
        permission: [10]
    },
    {
        path: '/myfile',
        exact: true,
        component: lazy(() => import('./MyFile')),
        isPrivate: true,
        permission: [1]
    },
    {
        path: '/grade',
        exact: true,
        component: lazy(() => import('./Grade')),
        isPrivate: true,
        permission: [4]
    },
    {
        path: '/accessdenied',
        exact: true,
        component: lazy(() => import('./AccessDenied')),
    },
]
