import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/unbreakable-form",
      name: "Unbreakable Form",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "unbreakable-form" */ "./views/UnbreakableForm.vue")
    },
    {
      path: "/dynamic-form",
      name: "Dynamic Form",
      component: () =>
        import(/* webpackChunkName: "dynamic-form" */ "./views/DynamicForm.vue")
    },
    {
      path: "/talkative-form",
      name: "Talkative Form",
      component: () =>
        import(/* webpackChunkName: "dynamic-form" */ "./views/TalkativeForm.vue")
    },
    {
      path: "/talkative-form-too",
      name: "Talkative Form Too",
      component: () =>
        import(/* webpackChunkName: "dynamic-form" */ "./views/TalkativeFormToo.vue")
    }
  ]
});
