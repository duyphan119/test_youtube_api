import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import App from './App';
import store from './redux/store';
import './index.css';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>);