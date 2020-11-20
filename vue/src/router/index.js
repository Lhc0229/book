import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    name: "index",
    redirect:"/news_student",
    component: () =>
        import(/* webpackChunkName: "about" */ "../index.vue"),
    children:[
      {
        path: "news_student",
        name: "news_student",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/news/student.vue")
      },
      {
        path: "result_download",
        name: "result_download",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/result/download")
      },
      {
        path: "result_upload",
        name: "result_upload",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/result/upload")
      },
      {
        path: "result_img_download",
        name: "result_img",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/result/img")
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/login.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage['token']) {
    next({ name: 'Login' })
  }
  else next()
})
export default router;
