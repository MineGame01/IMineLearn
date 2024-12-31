import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        base: mode === "production" ? "https://minegame01.github.io/IMineLearn" : "./",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@entities': path.resolve(__dirname, './src/entities'),
                '@shared': path.resolve(__dirname, './src/shared'),
                '@features': path.resolve(__dirname, './src/features'),
                '@widgets': path.resolve(__dirname, './src/widgets'),
                '@pages': path.resolve(__dirname, './src/pages'),
            },
        },
    }
})
