import React, { ReactNode, useContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type ThemeContextState = {
    darkMode: boolean;
    setDarkMode(theme: boolean): void;
};

const ThemeContext = React.createContext<ThemeContextState>({
    darkMode: false,
    setDarkMode: () => {},
});

const ThemeProvider = ({ children, initialDarkMode }: { children: ReactNode; initialDarkMode: boolean }) => {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', initialDarkMode);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div>{children}</div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

export const useTheme = () => {
    return useContext(ThemeContext);
};
