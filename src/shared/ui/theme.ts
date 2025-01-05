import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
    interface Theme {
        text: {
            colors: {
                colorText: string
                colorMutedText: string
                colorAccent: string
            }
        }
        tags: {
            colors: {
                colorJavascript: string
                colorHtml: string
                colorCss: string
            }
        }
        background: {
            colors: {
                colorBackground: string
                colorSecondaryBackground: string
            }
        }
        border: {
            colors: {
                colorBorder: string
            }
            setting: {
                borderRadius: string
                borderSize: string
            }
        }
        animation: {
            timeoutAnimation: string
        }
    }
    interface ThemeOptions {
        text?: {
            colors?: {
                colorText?: string
                colorMutedText?: string
                colorAccent?: string
            }
        }
        tags?: {
            colors?: {
                colorJavascript?: string
                colorHtml?: string
                colorCss?: string
            }
        }
        background?: {
            colors?: {
                colorBackground?: string
                colorSecondaryBackground?: string
            }
        }
        border?: {
            colors?: {
                colorBorder?: string
            }
            setting?: {
                borderRadius?: string
                borderSize?: string
            }
        }
        animation?: {
            timeoutAnimation?: string
        }
    }
    interface Mixins {
        beforeBackground: <GBackground extends string, GOpacity extends string>(
            background: GBackground,
            opacity: GOpacity,
        ) => {
            position: 'absolute'
            top: 0
            left: 0
            width: '100%'
            height: '100%'
            backgroundColor: GBackground
            borderRadius: 'inherit'
            opacity: GOpacity
        }
    }
    interface MixinsOptions {
        beforeBackground?: <GBackground extends string, GOpacity extends string>(
            background: GBackground,
            opacity: GOpacity,
        ) => {
            position: 'absolute'
            top: 0
            left: 0
            width: '100%'
            height: '100%'
            backgroundColor: GBackground
            borderRadius: 'inherit'
            opacity: GOpacity
        }
    }
}

const COLOR_TEXT = '#333333'
const COLOR_MUTED_TEXT = '#888888'
const COLOR_SECONDARY_BACKGROUND = '#f5f5f5'

export const theme = createTheme({
    text: {
        colors: {
            colorText: COLOR_TEXT,
            colorMutedText: COLOR_MUTED_TEXT,
            colorAccent: '#007bff',
        },
    },
    tags: {
        colors: {
            colorJavascript: '#f7df1e',
            colorHtml: '#e34c26',
            colorCss: '#2965f1',
        },
    },
    background: {
        colors: {
            colorBackground: '#ffffff',
            colorSecondaryBackground: COLOR_SECONDARY_BACKGROUND,
        },
    },
    border: {
        colors: {
            colorBorder: '#e0e0e0',
        },
        setting: {
            borderRadius: '4px',
            borderSize: '1.5px',
        },
    },
    animation: {
        timeoutAnimation: '0.1s',
    },
    typography: { fontFamily: 'Arial, sans-serif' },
    palette: {
        text: {
            primary: COLOR_TEXT,
            secondary: COLOR_MUTED_TEXT,
        },
        background: {
            paper: COLOR_SECONDARY_BACKGROUND,
        },
    },
    mixins: {
        beforeBackground: (background, opacity) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: background,
            borderRadius: 'inherit',
            opacity: opacity,
        }),
    },
})
