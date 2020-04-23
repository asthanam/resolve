import App from './components/App'
import Home from './components/Home'
import UserBlog from './components/UserBlog'

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/blog/:id',
        component: UserBlog
      }
    ]
  }
]