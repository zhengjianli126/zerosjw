import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        //{ path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } }, // 用于展示动态路由
        //{ path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/product-center',
        icon: 'ios-folder',
        name: 'product-center',
        title: '产品中心',
        component: Main,
        children: [
            {
                path: 'management-expense',
                icon: 'ios-gear',
                name: 'management-expense',
                title: '费用管理',
                component: resolve => { require(['@/views/product-center/management-expense.vue'], resolve); }
            },
            {
                path: 'management-product',
                icon: 'ios-gear',
                name: 'management-product',
                title: '产品管理',
                component: resolve => { require(['@/views/product-center/management-product.vue'], resolve); }
            }
        ]
    },
    {
        path: '/order-details',
        icon: 'document-text',
        title: '订单详情',
        name: 'orderdetails',
        component: Main,
        children: [
            { path: 'order-details', title:'订单详情', name: 'order-details_index', component: resolve => { require(['@/views/order/order-details.vue'], resolve); } }
        ]
    },
    {
        path: '/turnover',
        icon: 'arrow-graph-up-right',
        title: '交易额统计',
        name: ' turnover',
        component: Main,
        children: [
            { path: 'turnover', title:'交易额统计', name: 'turnover_index', component: resolve => { require(['@/views/turnover/turnover.vue'], resolve); } }
        ]
    },
    {
        path: '/monthly-bill',
        icon: 'compose',
        title: '每月对账',
        name: 'monthly-bill',
        component: Main,
        children: [
            { path: 'monthly-bill', title:'每月对账', name: 'monthly-bill_index', component: resolve => { require(['@/views/bill/monthly-bill.vue'], resolve); } }
        ]
    },
    {
        path: '/orgons',
        icon: 'map',
        title: '机构管理',
        name: 'orgons',
        component: Main,
        children: [
            { path: 'orgons', title:'机构管理', name: 'orgons-manerment_index', component: resolve => { require(['@/views/orgons/orgons-manerment.vue'], resolve); } },
            { path: 'orgons-branch', title:'分部管理', name: 'orgons-branch_index', component: resolve => { require(['@/views/orgons/orgons-branch.vue'], resolve); } }            
        ]
    },
    {
        path: '/managing',
        icon: 'calculator',
        title: '理财师信息',
        name: 'managing',
        component: Main,
        children: [
            { path: 'managing', title:'理财师信息', name: 'managing_index', component: resolve => { require(['@/views/managing/managing.vue'], resolve); } }
        ]
    },
    {
        path: '/access',
        icon: 'key',
        title: '系统管理',
        name: 'access',
        component: Main,
        children: [
            { path: 'access-sheet', title:'权限表', name: 'access-sheet_index', component: resolve => { require(['@/views/access/access-sheet.vue'], resolve); } },
            { path: 'role-manerment', title:'角色管理', name: 'role-manerment_index', component: resolve => { require(['@/views/access/role-manerment.vue'], resolve); } },            
            { path: 'system-user', title:'系统用户', name: 'system-user_index', component: resolve => { require(['@/views/access/system-user.vue'], resolve); } }            
            
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
