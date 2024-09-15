import AdminView from "@/layouts/admin/AdminView.vue";
import CourseFormView from "@/views/CourseFormView.vue";
import CourseView from "@/views/CourseView.vue";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/admin',
        component: AdminView,
        children: [
        
            {
                path: 'course/list',
                component: CourseView,
                name: 'CourseList',
                meta: { title: 'Course List' }
            },
            {
                path: 'course/add',
                component: CourseFormView,
                name: 'CourseAdd',
                meta: { title: 'Course Add' }
            },
            {
                path: 'course/update/:id',
                component: CourseFormView,
                name: 'CourseUpdate',
                meta: { title: 'Course Update' }
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// thay đổi title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'CRUD-AXIOS-APP';
    }
    next();
});
export default router;