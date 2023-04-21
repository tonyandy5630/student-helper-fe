import { CSSInterpolation, ThemeProvider, createTheme } from "@mui/material"
import { isDarkModeUI } from "constants/localStorage"
import React, { createContext, useEffect, useState } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

type IThemeType = { setDarkMode: () => void; isDarkMode: boolean }

const initialState: IThemeType = {
  setDarkMode: () => {},
  isDarkMode: true
}

const ThemeContext = createContext(initialState)

export default ThemeContext

export const ThemeContextProvider = (props: any) => {
  const [isDarkMode, setIsDarkMode] = useState(initialState.isDarkMode)

  const MUItheme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Montserrat, sans-serif"
      }
    },
    palette: {
      primary: {
        main: "#8CD867"
      },
      secondary: {
        main: "#ED7D3A"
      },
      success: {
        main: "#2FBF71"
      },
      warning: {
        main: "#ED7D3A"
      },
      error: {
        main: "#EF2D56"
      },
      mode: isDarkMode ? "dark" : "light"
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: isDarkMode ? "#121212" : "#fff"
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            backgroundImage: isDarkMode && "linear - gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))"
          } as CSSInterpolation
        }
      }
    }
  })

  function handleChangeDarkMode() {
    const toChangeMode = !isDarkMode //* to set in local storage
    localStorage.setItem(isDarkModeUI, toChangeMode.toString())
    setIsDarkMode((prev) => {
      return !prev
    })
  }

  useEffect(() => {
    const isDarkModeLocal = localStorage.getItem(isDarkModeUI)
    if (isDarkModeLocal) {
      setIsDarkMode(isDarkModeLocal.toLowerCase() === "true")
    }
  }, [])

  return (
    <ThemeProvider theme={MUItheme}>
      <ThemeContext.Provider value={{ isDarkMode, setDarkMode: handleChangeDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}
