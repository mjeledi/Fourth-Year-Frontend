import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import AdminLogin from './Login'
import CreateAccount from './CreateAccount'
import LoginPage from './LoginPage'
import AdminDashboard from './AdminDashboard'
import FacialRecognitionScanner from './FacialRecognitionScanner'
import AttendanceReports from './AttendanceReports'
import LecturerDashboard from './LecturerDashboard'

function App() {

  const routes = createBrowserRouter([{
    path: '',
    element: <Layout/>,
    children: [
      { path: '', element: <LoginPage/> },
      { path: '/createaccount', element: <CreateAccount/> },
      { path: '/dashboard', element: <AdminDashboard/>},
      { path: '/recognition', element: <FacialRecognitionScanner/>},
      { path: '/attendance', element: <AttendanceReports/>},
      { path: '/lecturer' , element: <LecturerDashboard/>}
    ]
  }])

  return <RouterProvider router={routes}/>
}

export default App