import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource/roboto/300.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
