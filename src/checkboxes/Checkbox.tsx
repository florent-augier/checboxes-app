import React from "react";

/**
 * Interface for checkbox's props
 *
 * @interface CheckboxProps -
 */

interface CheckboxProps {
  /** label {string} */ label: string;
  /** defaultChecked {boolean?} */ defaultChecked?: boolean;
  /** checkeck {boolean} */ checked: boolean;
  /** toggleStateInput(myKey) {function} */ toggleStateInput(
    myKey: number
  ): void;
  /** myKey {number} */ myKey: number;
  /** children {JSX.element | JSX.Element[]} */ children?:
    | JSX.Element
    | JSX.Element[];
}

/**
 * Component for handle label and input checkbox.
 *
 * @component  
 * @example
 * const label = item-1
 * const defaultChecked = true
 * checked = false;
 * toggleStateInput(mykey);
 * myKey = 1;
 * children = <Text />;
 * return (
 *   <Checkbox
            key={i}
            myKey={i}
            label={checkbox.label}
            defaultChecked={false}
            checked={checkbox.checked}
            toggleStateInput={toggleStateInput}
      />
 * )
 */

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  defaultChecked,
  toggleStateInput,
  checked,
  myKey,
}) => {
  return (
    <div className="container-input-label">
      <input
        id={label}
        type="checkbox"
        name={label}
        checked={checked}
        value={myKey}
        onChange={() => {
          toggleStateInput(myKey);
        }}
      />
      <label htmlFor={label}>{label.split("-").join(" ")}</label>
      <br />
    </div>
  );
};
