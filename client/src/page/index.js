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
        component: lazy(() => import('./Home')),
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
    },
    {
        path: '/partycell',
        exact: true,
        component: lazy(() => import('./PartyCell')),
    },
    {
        path: '/category',
        exact: true,
        component: lazy(() => import('./Category')),
    },
    {
        path: '/statistic',
        exact: true,
        component: lazy(() => import('./Statistic')),
    },
    {
        path: '/rewarddiscipline',
        exact: true,
        component: lazy(() => import('./RewardDiscipline')),
    },
    {
        path: '/decentralization',
        exact: true,
        component: lazy(() => import('./Decentralization')),
    },
    {
        path: '/voting',
        exact: true,
        component: lazy(() => import('./Voting')),
    },
    {
        path: '/myfile',
        exact: true,
        component: lazy(() => import('./MyFile')),
    },
]
