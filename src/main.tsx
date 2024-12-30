import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './shared/ui/indexStyle.scss'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import { store } from './app/model'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <IconContext.Provider value={{ size: '20px' }}>
            <Provider store={store}>
                <App />
            </Provider>
        </IconContext.Provider>
    </React.StrictMode>,
)
