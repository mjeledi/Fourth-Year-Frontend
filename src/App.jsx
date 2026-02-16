import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import AdminLogin from './Login'
import CreateAccount from './CreateAccount'
import LoginPage from './LoginPage'
import AdminDashboard from './AdminDashboard'

function App() {

  const routes = createBrowserRouter([{
    path: '',
    element: <Layout/>,
    children: [
      { path: '', element: <LoginPage/> },
      { path: '/createaccount', element: <CreateAccount/> },
      { path: '/dashboard', element: <AdminDashboard/>}
    ]
  }])

  return <RouterProvider router={routes}/>
}

export default App