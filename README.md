# Checkboxes App

This is a little basic checkboxes app (not optimized) showing how to manage `<ìnput type="checkbox" />` state throught the power of [React](https://github.com/facebook/create-react-app)

If you want to go to the app directly, go to the [Checkboxes App]()

## Table of contents

1. [Instructions](#instructions)
2. [Approach](#approach)
3. [Code](#code)
4. [Improvements](#improvements)
5. [Conclusion](#conclusion)

### Instructions

Create React App with 5 checkboxes (1 for select/unselect all checkboxes and 4 independants checkboxes representing items).

1. Display 5 checkboxes
2. The first one will select/unselect every checkboxes
3. The others will select themselves
4. Checking all items will select the "select all" checkbox automatically

### Approach

When I write some code with **React**, I think that all `html` things can be component. Just because component can be reusable anytime as we want.

The benefit of React is to be able to manage the state of components very easily.

In addition, the JSX syntax makes it easy to couple HTML and JavaScript code.

In this way we save a lot of time and make our code lighter and more readable.

### Code

In first, I create a simple checkbox component with his properties using Typescript @interface to check the props and their types.

The interface

```javascript
interface CheckboxProps {
  label: string;
  defaultChecked?: boolean;
  checked: boolean;
  toggleStateInput(myKey: number): void;
  myKey: number;
  children?: JSX.Element | JSX.Element[];
}
```

The component

```javascript
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
```

Secondly, I create a `Checkboxes` component that render an array of `<Checkbox />`.
I decide to create a state with useState hook for handling the state of this array.

```javascript
  const [checkboxes, setCheckboxes] = useState<any[]>([]);
```

```javascript
{
  checkboxes.map((checkbox, i) => {
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
  });
}
```

Note, one of parameters: `toggleStateInput` is a function that handle single input.

After, I have to fill the `checkboxes` state throught useEffect hook on mounting and create functions that set the state of it.

To manage single input, I create `toggleStateInput` with `myKey` parameter refer to the key of item in checkboxes array. I check if the index is similar to the parameter value. If true, I set value of `checked` property of current object. Else it returns the object without changes.

```javascript
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
```

To handle select/unselect all input, I create `switchStateOfAllCheckboxes` function. It update the checkboxes state.

```javascript
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
```

Next step is to check if all the checkboxes is checked. To do this, I use useEffect hook to handle this if checkboxes state is updated.

```javascript
const checkIfAllSelected = () => {
  let result = checkboxes.every(function (e) {
    return e.checked === true;
  });
  return result;
};
```

```javascript
useEffect(() => {
  if (checkboxes.length === 4) {
    if (checkIfAllSelected()) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }
}, [checkboxes]);
```

### Improvements

I can optimize tha accessibilty by manage focus input state.
The app can be splitted more and more. Like `<Input />, <Label/> and their text with <Text /> custom component.`

It is not my choice. But if the app grow, I must create litte reusable components.

## Conclusion

It's a very good exercise to manage state in React and it's fun to do this.
