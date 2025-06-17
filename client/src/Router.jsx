import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Signup from './pages/Signup'

function Router() {
    const routes = new createBrowserRouter([
        {
            path: '/',
            element: <App />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        }
    ])

    return <RouterProvider router={routes} />
}

export default Router