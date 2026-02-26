import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './LoginPage'
import AdminDashboard from './AdminDashboard'
import FacialRecognitionScanner from './FacialRecognitionScanner'
import AttendanceReports from './AttendanceReports'
import LecturerDashboard from './LecturerDashboard'
import StudentDashboard from './StudentDashboard'

function App() {

  const routes = createBrowserRouter([{
    path: '',
    element: <Layout/>,
    children: [
      { path: '', element: <LoginPage/> },
      { path: '/dashboard/admin', element: <AdminDashboard/>},
      { path: '/recognition', element: <FacialRecognitionScanner/>},
      { path: '/attendance', element: <AttendanceReports/>},
      { path: '/dashboard/lecturer' , element: <LecturerDashboard/>},
      { path: '/student' , element: <StudentDashboard/>}
    ]
  }])

  return <RouterProvider router={routes}/>
}

export default App