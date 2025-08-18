'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import './userform.css';




export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setImage(user.image || '');
      setPhone(user.phone || '');
      setStreetAddress(user.address || '');
      setPostalCode(user.postalCode || '');
      setCity(user.city || '');
      setCountry(user.country || '');
    }
  }, [user]);

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
          value={user?.email || ''}
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

