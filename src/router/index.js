import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import AddHouse from "@/views/AddHouse.vue";
import EditHouse from "@/views/EditHouse.vue";
import HouseDetail from "@/components/HouseDetail.vue";
import About from "@/components/About.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "houses",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/create-house",
      name: "create-house",
      component: AddHouse,
    },
    {
      path: "/house/detail/:id",
      name: "detail",
      component: HouseDetail,
    },
    {
      path: "/edit-house/:id",
      name: "edit-house",
      component: EditHouse,
    }
  ],
});

export default router;
