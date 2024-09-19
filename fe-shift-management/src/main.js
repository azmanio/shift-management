import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./styles/style.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "jquery";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
