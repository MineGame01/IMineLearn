import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './shared/ui/indexStyle.scss'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import { store } from './app/model'
import { ThemeProvider } from '@mui/material'
import { theme } from '@shared/ui'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <IconContext.Provider value={{ size: '20px' }}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Provider>
        </IconContext.Provider>
    </React.StrictMode>,
)
