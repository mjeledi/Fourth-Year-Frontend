import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './LoginPage'
import AdminDashboard from './AdminDashboard'
import FacialRecognitionScanner from './FacialRecognitionScanner'
import AttendanceReports from './AttendanceReports'
import LecturerDashboard from './LecturerDashboard'
import StudentDashboard from './StudentDashboard'
import SuperAdmin from './SuperAdmin'

function App() {

  const routes = createBrowserRouter([{
    path: '',
    element: <Layout/>,
    children: [
      { path: '', element: <LoginPage/> },
      { path: '/dashboard/admin', element: <AdminDashboard/>},
      { path: '/recognition/:id', element: <FacialRecognitionScanner/>},
      { path: '/attendance', element: <AttendanceReports/>},
      { path: '/dashboard/lecturer' , element: <LecturerDashboard/>},
      { path: '/student' , element: <StudentDashboard/>},
      { path: '/dashboard/superadmin' , element: <SuperAdmin/>},
    ]
  }])

  return <RouterProvider router={routes}/>
}

export default App