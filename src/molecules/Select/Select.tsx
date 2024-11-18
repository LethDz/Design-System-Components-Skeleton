'use client';
import { Text } from '@atoms/Text';
import React, { KeyboardEventHandler, RefObject, useEffect, useRef, useState } from 'react';

interface SelectProps {
  label?: string;
  options?: SelectOption[];
  onOptionsSelected?: (option: SelectOption, optionIndex: number) => void;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendation: (overrideProps?: OverrideProps) => OverrideProps;
}

interface OverrideProps {
  className?: string;
  key?: React.Key | null | undefined;
  onClick?: () => void;
  ref?: RefObject<HTMLLIElement>;
  onMouseEnter?: () => void;
  tabIndex?: number;
}

const KEY_CODES = {
  ENTER: 'Enter',
  Space: '',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  ESC: 'Escape',
};

/**
 * A select component with label, options and a callback for when an option is
 * selected.
 *
 * @param {SelectProps} props - The props for the select component.
 * @param {string} [props.label='Please select an option ...'] - The label of the
 * select component.
 * @param {SelectOption[]} [props.options=[]] - The options to be displayed in the
 * select component.
 * @param {function} [props.onOptionsSelected] - The callback for when an option is
 * selected.
 * @param {function} [props.renderOption] - The customized rendering for the options.
 */
const Select: React.FC<SelectProps> = ({
  label = 'Please select an option ...',
  options = [],
  onOptionsSelected: handler,
  renderOption,
}: SelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const labelRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  const overlayRef: React.RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
  const [optionRefs, setOptionRefs] = useState<RefObject<HTMLLIElement>[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  /**
   * The callback for when an option is selected.
   *
   * @param {SelectOption} option - The selected option.
   * @param {number} optionIndex - The index of the selected option.
   */
  const onOptionsSelected = (option: SelectOption, optionIndex: number): void => {
    if (handler) {
      handler(option, optionIndex);
    }

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  /**
   * The callback for when the label is clicked.
   */
  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Set the index of the highlighted item.
   *
   * @param {number} optionIndex - The index of the highlighted item.
   */
  const highlightItem = (optionIndex: number) => {
    setHighlightIndex(optionIndex);
  };

  /**
   * Handles the keydown event for the label button.
   *
   * This function calls event.preventDefault() and checks for the following keys:
   * - Enter
   * - Space
   * - ArrowDown
   * If any of these keys are pressed, it sets the isOpen state to true.
   *
   * @param {React.KeyboardEvent<HTMLButtonElement>} event - The keyboard event.
   */
  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ([KEY_CODES.ENTER, KEY_CODES.ARROW_DOWN, KEY_CODES.Space].includes(event.key)) {
      setIsOpen(true);
      highlightItem(0);
    }
  };

  /**
   * Handles the keydown event for the select option.
   *
   * This function calls event.preventDefault() and checks for the following keys:
   * - ESC: sets the isOpen state to false.
   * - ArrowUp: sets the highlighted item to the previous item.
   * - ArrowDown: sets the highlighted item to the next item.
   *
   * @param {React.KeyboardEvent} event - The keyboard event.
   */
  const onOptionKeyDown: KeyboardEventHandler = (event: React.KeyboardEvent) => {
    if (event.key === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    if (event.key === KEY_CODES.ARROW_UP) {
      highlightItem(highlightIndex - 1 < 0 ? options.length - 1 : highlightIndex - 1);
      return;
    }

    if (event.key === KEY_CODES.ARROW_DOWN) {
      highlightItem(highlightIndex + 1 > options.length - 1 ? 0 : highlightIndex + 1);
      return;
    }
  };

  useEffect(() => {
    if (isOpen && overlayRef.current) {
      const overLayTop = (labelRef.current?.offsetHeight || 0) + 10;
      overlayRef.current.style.setProperty('top', overLayTop.toString());
    }
  }, [options.length]);

  useEffect(() => {
    if (isOpen && highlightIndex >= 0) {
      setOptionRefs(options.map(() => React.createRef<HTMLLIElement>()));
      const ref = optionRefs[0];
      ref?.current?.focus();
    }
  }, [isOpen, highlightIndex]);

  return (
    <div className='dse-select'>
      <button
        onKeyDown={onButtonKeyDown}
        className='dse-select__label'
        onClick={onLabelClick}
        ref={labelRef}
        aria-haspopup='true'
        aria-expanded={isOpen ? true : undefined}
        aria-controls='dse-select-list'
        type='button'
        data-testid='dse-select-label'
      >
        <Text className='dse-select__label--text'>
          {selectedIndex >= 0 ? options[selectedIndex].label : label}
        </Text>
        <span className='dse-select__label--icon'>
          <svg
            width='1rem'
            height='1rem'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul
          className='dse-select__overlay'
          ref={overlayRef}
          id='dse-select-list'
          role='menu'
        >
          {options.map((option: SelectOption, optionIndex: number) => {
            const isSelected = selectedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const isHighlighted = highlightIndex === optionIndex;
            const renderOptionProps: RenderOptionProps = {
              option,
              isSelected,
              getOptionRecommendation: (overrideProps = {}) => ({
                className: `dse-select__option 
                  ${isSelected ? 'dse-select__option--selected' : ''} 
                  ${isHighlighted ? 'dse-select__option--highlighted' : ''}`,
                onClick: () => onOptionsSelected(option, optionIndex),
                key: option.value,
                ref,
                tabIndex: isHighlighted ? -1 : 0,
                onMouseEnter: () => highlightItem(optionIndex),
                onMouseLeave: () => highlightItem(-1),
                onKeyDown: onOptionKeyDown,
                role: 'menuitemradio',
                'aria-checked': isSelected ? isSelected : undefined,
                'aria-label': option.label,
                ...overrideProps,
              }),
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              // eslint-disable-next-line react/jsx-key
              <li {...renderOptionProps.getOptionRecommendation()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    width={'1rem'}
                    height={'1rem'}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m4.5 12.75 6 6 9-13.5'
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { Select as default, SelectProps };
