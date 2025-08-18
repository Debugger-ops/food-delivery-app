'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import './userform.css';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setStreetAddress] = useState(user?.address || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'address') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className="userform-container">
      
      <form
        className="userform-form"
        onSubmit={ev =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            address,
            city,
            country,
            postalCode,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={ev => setUserName(ev.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          disabled
          value={user.email}
          placeholder="email"
        />

        <AddressInputs
          addressProps={{ phone, address, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
