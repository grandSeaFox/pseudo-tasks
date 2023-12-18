import React from 'react';
import { AVAILABLE_SVGS, AvailableIcons } from './AvailableSvgs';
import classNames from 'classnames';
import { objectKeys } from '../../../utils';


export interface SVGComponentProps {
    icon: AvailableIcons | string;
    color?: string;
    strokeWidth?: number;
    size?: string | number;
    className?: string;
}

export const SVGComponent: React.FC<SVGComponentProps> = ({ icon, color, strokeWidth, size, className }) => {
    const svgElement = AVAILABLE_SVGS[icon as AvailableIcons];
    if (!objectKeys(AVAILABLE_SVGS).includes(icon as AvailableIcons))
        return (
            <i className={classNames(className, 'd-flex align-items-center justify-content-center')} style={{ pointerEvents: 'none' }}>
                {AVAILABLE_SVGS['addTag']}
            </i>
        );
    const applyColorRecursively = (element: React.ReactNode, color: string | undefined): React.ReactNode => {
        if (!React.isValidElement(element)) {
            return element;
        }

        const { type, props } = element;

        if (type === 'path' || type === 'circle') {
            // Apply color if it's an element that supports the "fill" prop
            return React.cloneElement(element as React.ReactElement, { fill: color || props.fill });
        }

        // For other elements, recursively process their children
        const childrenWithUpdatedColors = React.Children.map(props.children, child => applyColorRecursively(child, color));

        // Clone the element with updated children
        return React.cloneElement(element as React.ReactElement, {}, childrenWithUpdatedColors);
    };

    const modifiedSvg = applyColorRecursively(
        React.cloneElement(svgElement, {
            strokeWidth: strokeWidth || svgElement.props.strokeWidth,
            width: size || svgElement.props.width,
            height: size || svgElement.props.height,
        }),
        color,
    );

    return (
        <i style={{ pointerEvents: 'none', display: "flex", alignItems: "center", justifyContent: "center" }}>
            {modifiedSvg}
        </i>
    );
};
