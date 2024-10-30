'use client';
import ColorCode from '@foundation/ColorCode';
import Spacing from '@foundation/Spacing';
import React from 'react';

interface ColorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: keyof typeof ColorCode;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

/**
 * A color component with specified hex code, width, and height.
 *
 * @param {ColorProps} props - The props for the color component.
 * @returns {React.ReactElement} A React element representing the color component.
 */
const Color: React.FC<ColorProps> = ({
  color = 'primary',
  width = 'sm',
  height = 'sm',
  ...props
}: ColorProps): React.ReactElement => {
  const squareClassName = `dse-width-${width} dse-height-${height}`;
  const colorClassName = `dse-bg-color-${color}`;
  return (
    <div
      className={squareClassName + ' ' + colorClassName}
      {...props}
    >
      {''}
    </div>
  );
};

export { Color as default, type ColorProps };
