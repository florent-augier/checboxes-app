/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Checkboxes.css";
import { Checkbox } from "./Checkbox";

/**
 * Component for showing all checkboxes with a select/unselect all checkboxes on top.
 *
 * @component
 * @example
 * return (
 *  <form>
 *    <input type="checkbox" id="select-all" />
 *    {checkboxes.map(checkbox => <Checkbox .../>)}
 *  </form>
 * )
 *
 */

export default function Checkboxes(): React.ReactElement {
  /**
   * @typedef {Object} selectAllChecked
   */

  /**
   * @callback setSelectAllChecked
   * @param {selectAllChecked} state
   * @returns {void}
   */

  const [
    /**
     * @type {selectAllChecked}
     */
    selectAllChecked,
    /**
     * @type {ReferenceStateSetter}
     */
    setSelectAllChecked,
  ] = useState(false);

  /**
   * @typedef {Object} checkboxes
   */

  /**
   * @callback setCheckboxes
   * @param {checkboxes} state
   * @returns {void}
   */

  const [
    /**
     * @type {checkboxes}
     */
    checkboxes,
    /**
     * @type {setCheckboxes}
     */
    setCheckboxes,
  ] = useState<any[]>([]);

  /**
   * Switch state of all checkboxes
   *
   * @function switchStateOfAllCheckboxes
   * @returns {setCheckboxes}
   *
   */

  useEffect(() => {
    if (checkboxes && Array.isArray(checkboxes)) {
      let newCheckboxesArr: any[] = [];
      for (let i = 1; i < 5; i++) {
        newCheckboxesArr.push({ label: `item-${i}`, checked: false });
      }
      if (newCheckboxesArr.length === 4) {
        setCheckboxes(newCheckboxesArr);
      }
    }
    return () => setCheckboxes([]);
  }, []);

  function switchStateOfAllCheckboxes(): void {
    const setValue = checkboxes.map((checkbox, i) => {
      if (selectAllChecked) {
        return { ...checkbox, checked: false };
      } else {
        return { ...checkbox, checked: true };
      }
    });
    setCheckboxes(setValue);
  }

  /**
   * Function that handle on checkbox state
   *
   * @function toggleStateInput - Switch state
   * @param {number} myKey
   * @returns {setCheckboxes}
   */

  function toggleStateInput(myKey: number) {
    const setValue = checkboxes.map((checkbox, i) => {
      let checkValue = checkboxes[myKey].checked;
      if (i === myKey) {
        return { ...checkbox, checked: !checkValue };
      }
      return checkbox;
    });

    setCheckboxes(setValue);
  }

  /**
   * Function that check if all item are checked
   *
   * @function checkIfAllSelected
   * @returns {boolean}
   */

  const checkIfAllSelected = () => {
    let result = checkboxes.every(function (e) {
      return e.checked === true;
    });
    return result;
  };

  useEffect(() => {
    if (checkboxes.length === 4) {
      if (checkIfAllSelected()) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }
    }
  }, [checkboxes]);

  return (
    <form>
      <div className="container-input-label" id="select-all-container">
        <input
          id="select-all"
          type="checkbox"
          name="selectAll"
          checked={selectAllChecked}
          value="selectAll"
          onChange={() => switchStateOfAllCheckboxes()}
        />
        <label htmlFor="select-all">
          {selectAllChecked ? "Unselect all" : "Select all"}
        </label>
      </div>
      {checkboxes.map((checkbox, i) => {
        return (
          <Checkbox
            key={i}
            myKey={i}
            label={checkbox.label}
            defaultChecked={false}
            checked={checkbox.checked}
            toggleStateInput={toggleStateInput}
          />
        );
      })}
    </form>
  );
}
