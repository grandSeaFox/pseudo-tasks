import { useReadLocalStorage } from 'usehooks-ts';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTheme} from "../ThemeProvider";
import {AvailableIcons} from "../SVG/AvailableSvgs";
import {SVGComponent} from "../SVG";
import RepeatSelect from "../../InputSelect";


interface NavigationBarProps {
    toggleArchived: () => void;
    children: ReactNode
}

const NavigationBar = ({toggleArchived, children}: NavigationBarProps) => {
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
            <div className="buttonsLeft">
                <RepeatSelect onChange={() => {}}/>
            </div>
            {children}
            <div className="buttonsRight">
                <button
                    onClick={toggleArchived}
                >
                    <SVGComponent icon="archive"/>
                </button>
                <button
                    onClick={() => {
                        setDarkMode(!darkMode);
                    }}
                >
                    <SVGComponent icon={themeButton.icon}/>
                </button>
            </div>

        </div>
    );
};

export default NavigationBar;
