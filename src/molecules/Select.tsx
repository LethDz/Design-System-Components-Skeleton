'use client';
import React, { useState } from 'react';

interface SelectProps {
  label?: string;
  options?: SelectOption[];
  onOptionsSelected?: (option: SelectOption, optionIndex: number) => void;
}

interface SelectOption {
  label: string;
  value: string;
}

/**
 * A molecule component that renders a select component.
 *
 * @param {SelectProps} props - The props for the select component.
 * @param {string} props.label - The label for the select component.
 * @param {SelectOption[]} props.options - The options for the select component.
 * @param {(option: SelectOption, optionIndex: number) => void} props.onOptionsSelected - The callback for when an option is selected.
 * @returns {React.ReactElement} The select component.
 */
const Select: React.FC<SelectProps> = ({
  label = 'Please select an option ...',
  options = [],
  onOptionsSelected: handler,
}: SelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOptionsSelected = (option: SelectOption, optionIndex: number): void => {
    setIsOpen(!isOpen);
    if (handler) {
      handler(option, optionIndex);
    }
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={onLabelClick}>{label}</button>
      {isOpen && (
        <ul>
          {options.map((option: SelectOption) => {
            return (
              <li
                key={option.label}
                onClick={() => onOptionsSelected(option, options.indexOf(option))}
              >
                {option.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { Select as default, SelectProps };
