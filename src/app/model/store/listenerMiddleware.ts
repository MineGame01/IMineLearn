import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { TDispatch, TState } from './type.ts'
import { authListener } from '@/widgets/LoginModal/model/authListener'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<TState, TDispatch>()
export type TStartAppListening = typeof startAppListening

export const addAppListener = addListener.withTypes<TState, TDispatch>()
export type TAddAppListener = typeof addAppListener

authListener(startAppListening)
