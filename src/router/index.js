import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            preventByAuth: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
        meta: {
            preventByAuth: true,
        },
    },
    {
        path: "/register/success",
        name: "RegisterSuccess",
        component: () => import("@/views/RegisterSuccess.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
