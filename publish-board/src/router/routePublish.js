export default [
    {
        //dashboard
        path: "dashboard",
        component: () => import("@/pages/dashboard/MainDashBoard.vue"),
    },
    {
        // 메인
        path: "main",
        name: "main",
        component: () => import("@/pages/dashboard/jiheon/MainDashBoard.vue"),
        children: [
            {
                path: "/main/child/:id",
                name: "AppPaging",
                component: () =>
                    import("@/pages/dashboard/jiheon/AppPaging.vue"),
            },
        ],
    },
    {
        //테스트
        path: "main/test",
        name: "test",
        component: () => import("@/pages/dashboard/jiheon/AppTest.vue"),
    },
    {
        //글 쓰기
        path: "main/write",
        name: "write",
        component: () => import("@/pages/dashboard/jiheon/AppWrite.vue"),
    },
    {
        //상세 보기
        path: "main/update",
        name: "update",
        component: () => import("@/pages/dashboard/jiheon/AppUpdate.vue"),
        props: true,
    },

    {
        //상세 보기
        path: "main/detail",
        name: "Detail",
        component: () => import("@/pages/dashboard/jiheon/AppDetail.vue"),
        props: true,
    },
];
