import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from './context/ApiProvider.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApiProvider>
      <App/>
    </ApiProvider>
  </Provider>
)
