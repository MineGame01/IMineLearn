import React from 'react'
import { Header } from './widgets/Header'
import { HomePage } from './pages/Home/ui'

export const SUPABASE_URL = 'https://yecypkutfcknvzpofmsc.supabase.co'
export const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllY3lwa3V0ZmNrbnZ6cG9mbXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDYzMDUsImV4cCI6MjA0NzYyMjMwNX0.2zBWmq3JO77EbY8npxhEPCf-61ZjzK9tnsFL2M74ovU'

export const App: React.FC = () => {
    return (
        <>
            <Header />
            <HomePage />
        </>
    )
}
