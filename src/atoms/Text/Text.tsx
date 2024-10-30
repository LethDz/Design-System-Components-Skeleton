import FontSize from '@foundation/FontSize';
import React from 'react';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: keyof typeof FontSize;
}
/**
 * A text component with specified font size.
 *
 * @param {TextProps} props - The props for the text component.
 * @param {keyof typeof FontSize} [props.size=base] - The font size of the text.
 * @returns {React.ReactElement} A React element representing the text component.
 */
const Text: React.FC<TextProps> = ({ size = 'base', ...props }: TextProps): React.ReactElement => {
  const className = `dse-text-${size}`;
  return (
    <p
      className={className}
      {...props}
    >
      {props.children}
    </p>
  );
};

export { Text as default, type TextProps };
