"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const [ updated , setUpdated ] = useState();

  function updateHandler() {
    setUpdated(true);
    setTimeout(() => setUpdated(false));
    return false;
  }
  return (
    <>
      { pending && (() => updateHandler()) }
      {updated && <p>Update Successful</p>}
      <button
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending}
        >
        {pending ? "Updating..." : 'Update Profile'}
      </button>
    </>
  );
}