import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './LoginPage'

import LecturerDashboard from './LecturerDashboard'
import StudentDashboard from './StudentDashboard'
import AttendanceOTP from './Otp'
import LecturerQRGenerator from './GenerateQr'
import AttendSession from './AttendSession'
import QrCodeScanner from './QrCodeScanner/QrCodeScanner'


function App() {

  const routes = createBrowserRouter([{
    path: '',
    element: <Layout/>,
    children: [
      { path: '', element: <LoginPage/> },
      { path: '/verification/:id', element: <AttendanceOTP/>},
      { path: '/generate/:id', element: <LecturerQRGenerator/>},
      { path: '/scan', element: <QrCodeScanner/>},

      // { path: '/dashboard/admin', element: <AdminDashboard/>},
      // { path: '/recognition/:id', element: <FacialRecognitionScanner/>},
      // { path: '/attendance', element: <AttendanceReports/>},
      { path: '/dashboard/lecturer' , element: <LecturerDashboard/>},
      { path: '/student' , element: <StudentDashboard/>},
      { path: '/attend/session' , element: <AttendSession/>},
      // { path: '/dashboard/superadmin' , element: <SuperAdmin/>},
    ]
  }])

  return <RouterProvider router={routes}/>
}

export default App