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
    },
    {
        path: '/partycell',
        exact: true,
        component: lazy(() => import('./PartyCell')),
        isPrivate: true,
    },
    {
        path: '/openevaluate',
        exact: true,
        component: lazy(() => import('./OpenEvaluate')),
        isPrivate: true,
    },
    {
        path: '/evaluate',
        exact: true,
        component: lazy(() => import('./Evaluate')),
        isPrivate: true,
    },
    {
        path: '/evaluatesubject',
        exact: true,
        component: lazy(() => import('./EvaluateSubject')),
        isPrivate: true,
    },
    {
        path: '/evaluatedepartment',
        exact: true,
        component: lazy(() => import('./EvaluateDepartment')),
        isPrivate: true,
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
    },
    {
        path: '/createvoting',
        exact: true,
        component: lazy(() => import('./CreateVoting')),
        isPrivate: true,
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
    },
    {
        path: '/myfile',
        exact: true,
        component: lazy(() => import('./MyFile')),
        isPrivate: true,
    },
    {
        path: '/grade',
        exact: true,
        component: lazy(() => import('./Grade')),
        isPrivate: true,
    },
]
