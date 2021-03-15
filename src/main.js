import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import { auth } from "./firebase";

Vue.use(VueMeta);
Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: (h) => h(App),
        }).$mount("#app");
    }
    if (user && router.currentRoute.path != "/login") {
        store.dispatch("fetchProfile", user);
    }
});
