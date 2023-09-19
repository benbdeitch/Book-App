import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './static/css/index.css'
import AuthProvider from './contexts/UserProvider.tsx'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>

        <DndProvider backend={HTML5Backend}>
        <App />
        </DndProvider>
    </AuthProvider>
  </React.StrictMode>,
)
