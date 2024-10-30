'use client';

import Side from '@foundation/Side';
import Spacing from '@foundation/Spacing';
import React from 'react';

interface MarginProps {
  side?: keyof typeof Side;
  space?: keyof typeof Spacing;
  children?: React.ReactNode;
}
/**
 * A functional component that renders a margin.
 *
 * @returns {React.ReactElement} A React element representing the margin component.
 */
const Margin: React.FC<MarginProps> = ({
  side,
  space = 'md',
  children,
}: MarginProps): React.ReactElement => {
  const className = `dse-margin${side ? `-${side}` : ''}-${space}`;
  return <div className={className}>{children}</div>;
};

export { Margin as default, type MarginProps };
