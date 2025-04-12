'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import './userform.css';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className="userform-container">
      <div className="userform-avatar">
        <EditableImage link={image} setLink={setImage} />
      </div>
      <form
        className="userform-form"
        onSubmit={ev =>
          onSave(ev, {
            name: userName, image, phone, admin,
            streetAddress, city, country, postalCode,
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
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        {loggedInUserData.admin && (
          <div>
            <label className="userform-checkbox-label" htmlFor="adminCb">
              <input
                id="adminCb"
                type="checkbox"
                checked={!!admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
