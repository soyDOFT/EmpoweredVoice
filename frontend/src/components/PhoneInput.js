'use client';

import { useState } from "react";

export default function PhoneInput() {
    const [checked, setChecked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState(null);

    function handleChange(e) {
      e.preventDefault();
      const input = e.target.value;
      setPhoneNumber(input);

      if (!input.match(/\d{10}$/g)) {
        const errors = { phoneNumber: 'Please enter a 10-Digit USA Phone Number' };
        setErrors(errors);
      } else {
        setErrors(null);
      }
    }

  return (
    <>
        <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
                <input id="election-sms" name="election-sms" type="checkbox" checked={checked} onChange={() => {setChecked(!checked)}} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
            </div>
            <div className="text-sm leading-6">
                <label htmlFor="election-sms" className="font-medium text-gray-900">Election dates through SMS</label>
                <p className="text-gray-500">Get notified for important election dates.</p>
            </div>
        </div>
        { checked &&
        <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
            name="phoneNumber"
            id="phoneNumber"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-5/6 shadow-sm rounded-sm"
            value={phoneNumber}
            onChange={handleChange}/>
        </div>
        }
        {console.log('sub state', errors)}
        {errors && (
            <ul>
                {Object.keys(errors).map((err) => <li className='text-red-600' key={err}>{errors[err]}</li>)}
            </ul>
        )}
    </>
  )
}
