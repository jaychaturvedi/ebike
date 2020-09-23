import themes from './themes'
import React from "react";
export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => { },
});