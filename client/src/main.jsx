import ReactDOM from 'react-dom/client'
import MapInterface from './components/App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
       <MapInterface />
  </Provider>
)
