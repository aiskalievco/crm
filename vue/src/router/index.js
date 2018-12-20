import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/RegistrationMain'
import VueCookie from 'vue-cookie'
import store from '../store'
import Error from '../components/Error'
import Course from '../components/CoursePage'
import Schedule from '../components/Schedule'
import Group from '../components/Group'
import Room from '../components/Room'
import Instructor from '../components/Instructor'
import Calendar from '../components/Calendar'

Vue.use(Router);
Vue.use(VueCookie);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/error',
      component: Error
    },
    {
      path: '*',
      redirect: '/error'
    },
    {
      path: '/course/:id',
      component: Course,
      children: [
        {
          path: 'schedule',
          component: Schedule,
          name: 'schedule'
        },
        {
          path: 'group',
          component: Group,
          name: 'group'
        },
        {
          path: 'room',
          component: Room,
          name: 'room'
        },
        {
          path: 'instructor',
          component: Instructor,
          name: 'instructor'
        }
      ]
    },
    {
      path: '/calendar/:id',
      component: Calendar,
      name: 'calendar',
      props: true
    }
  ],
  mode: 'history'
})
