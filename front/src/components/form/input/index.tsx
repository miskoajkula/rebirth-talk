import React from "react";
import classNames from 'classnames';

interface InputProps {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  errors?: Record<string, any>;
  type?: string;
}


const Input: React.FC<InputProps> = ({ label, name, register, placeholder, errors, type = "text" }) => {
  const hasError = !!errors?.[name];

  const inputClasses = classNames(
    'mt-1 p-2 block w-full text-gray-600 border rounded-md shadow-sm transition-colors duration-200',
    {
      'focus:border-red-500  focus:outline-none border-1 border-solid border-red-500': hasError,
      'border-gray-300 focus:ring-blue-500 focus:border-blue-500': !hasError,
    }
  );

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={inputClasses}
      />
      {hasError && (
        <p id={`${name}-error`} className="text-red-500 text-sm absolute top-9 right-2">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};


export default Input;
