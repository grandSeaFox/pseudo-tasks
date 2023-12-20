import { useReadLocalStorage } from 'usehooks-ts';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTheme} from "../ThemeProvider";
import {AvailableIcons} from "../SVG/AvailableSvgs";
import {SVGComponent} from "../SVG";


interface NavigationBarProps {
    children: ReactNode
}

const NavigationBar = ({children}: NavigationBarProps) => {
    const darkMode = useReadLocalStorage('darkMode');
    const { setDarkMode } = useTheme();
    const [themeButton, setThemeButton] = useState<{ icon: AvailableIcons; color: string }>({
        icon: 'moon',
        color: '#36382e',
    });

    useEffect(() => {
        if (darkMode) setThemeButton({ icon: 'sun', color: '#dadad9' });
        if (!darkMode) setThemeButton({ icon: 'moon', color: '#36382e' });
    }, [darkMode]);

    return (
        <div className="navigation">
            {children}
            <button
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
            >
                <SVGComponent icon={themeButton.icon}/>
            </button>
        </div>
    );
};

export default NavigationBar;