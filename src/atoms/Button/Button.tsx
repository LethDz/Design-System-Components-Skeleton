'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

/**
 * A functional component that renders a button.
 *
 * @param {ButtonProps} props - The props for the button component.
 * @returns {React.ReactElement} A React element representing the button component.
 */
const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.labels);
      }}
      {...props}
    >
      {label}
    </button>
  );
};

export { Button as default, type ButtonProps };
