import Vue from 'vue'
import VueRouter from 'vue-router'
const img = () => import("./components/img.vue");
const ball = () => import("./components/ball.vue");
const letter = () => import("./components/letter.vue");
const beat = () => import("./components/beat.vue");
const ball_line = () => import("./components/ball_line.vue");
const letter_line = () => import("./components/letter_line.vue");
const gradient = () => import("./components/gradient.vue");
const background = () => import("./components/background.vue");
const color = () => import("./components/color.vue");
const heart = () => import("./components/heart.vue");

Vue.use(VueRouter)
const routes = [
    { path: "/img", component: img},
    { path: "/ball", component: ball},
    { path: "/letter", component: letter},
    { path: "/beat", component: beat},
    { path: "/line", component: ball_line},
    { path: "/letter-line", component: letter_line},//完 跳转没有线条
    { path: "/gradient", component: gradient},//更好一些
    { path: "/background", component: background},
    { path: "/color", component: color},
    { path: "/heart", component: heart}
]

const router = new VueRouter({
    mode:location.href.indexOf('localhost') > -1 ? 'hash' : 'history',
    routes
});


export default router