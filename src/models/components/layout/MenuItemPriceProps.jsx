import ChevronDown from "@/components/icons/Down";
import ChevronUp from "@/components/icons/Up";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import { useState } from "react";
import './menuprice.css'; // Make sure this path matches your structure

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps(oldProps => [...oldProps, { name: '', price: 0 }]);
  }

  function editProp(ev, index, prop) {
    let newValue = ev.target.value;

    if (prop === 'price') {
      // Convert to number but allow empty input temporarily
      newValue = newValue === '' ? '' : parseFloat(newValue);
    }

    setProps(prevProps => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    });
  }


  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="price-prop-container">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="toggle-button"
        type="button"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'prop-list open' : 'prop-list'}>
        {props?.length > 0 && props.map((prop, index) => (
          <div key={index} className="prop-item">
            <div className="prop-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Extra price"
                value={prop.price === 0 ? '' : prop.price || ''}
                onChange={ev => editProp(ev, index, 'price')}
              />

            </div>
            <div className="prop-field">
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={prop.price}
                onChange={ev => editProp(ev, index, 'price')}
              />
            </div>
            <button
              type="button"
              onClick={() => removeProp(index)}
              className="delete-button"
            >
              <Trash />
            </button>
          </div>
        ))}
        <button type="button" onClick={addProp} className="add-button">
          <Plus className="plus-icon" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
