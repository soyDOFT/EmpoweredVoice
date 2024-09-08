"use client";
import { useState } from "react";
import { useFormStatus } from 'react-dom'

export default function AccountUpdateForm({ client }) {
  const [ firstName, setFirstName ] = useState(client.first_name);
  const [ lastName, setLastName ] = useState(client.last_name);
  const [ state, setState ] = useState(client.state || '');
  const { pending } = useFormStatus();

  async function updateHandler(e) {
    e.preventDefault();    
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update/account?firstName=${firstName}&lastName=${lastName}&state=${encodeURIComponent(state)}&email=${client.email}`;
        const result = await fetch(url);
        const answer = await result.json();
    } catch (err) {
        throw new Error("Profile could not be updated");
    }
  }

  const usaStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming"
  ];

  return (
    <form
      onSubmit={updateHandler}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          disabled
          defaultValue={client.email}
          name="email"
          id="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="firstName">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lastName">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          id="lastName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
          <label htmlFor="state">What state are you from?</label>
          <select 
            value={state}
            onChange={(e) => setState(e.target.value)}
            name="state"
            id="state"
            className="px-5 py-3 bg-white text-primary-800 w-full shadow-sm rounded-sm"
            >
              <option className="text-primary-800 font-semibold font-sans" value={null}>Select a Country</option>
            {usaStates.map((state) => 
              <option className="text-primary-800 font-sans" key={state} value={state}>{state}</option>
            )}
          </select>
      </div>

      <div className="flex justify-end items-center gap-6">
        <input
        type="submit"
        className="btn bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending}
        value={pending ? "Updating..." : 'Update Profile'}
        />
      </div>
    </form>
  );
}