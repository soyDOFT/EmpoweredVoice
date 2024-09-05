"use client";

import { useState } from "react";
import { updateClient } from "@/app/_lib/actions";
import SubmitButton from "@/components/SubmitButton";

export default function AccountUpdateForm({ client }) {
  const [count, setCount] = useState();

  const { first_name, last_name, email, state, city } = client;

  return (
    <form
      action={updateClient}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>First Name</label>
        <input
          disabled
          defaultValue={first_name}
          name="firstName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label>Last Name</label>
        <input
          disabled
          defaultValue={last_name}
          name="lastName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          value={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
      </div>

      <div className="space-y-2">
          <label htmlFor="state">What state are you from?</label>
          <input
            defaultValue={state}
            name="state"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
      </div>

      <div className="space-y-2">
          <label htmlFor="city">What city are you from?</label>
          <input
            value={city}
            name="city"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton />
      </div>
    </form>
  );
}