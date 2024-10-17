'use client';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      onClick={(e) => {
        console.log(e.currentTarget.labels);
      }}
      type='button'
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
