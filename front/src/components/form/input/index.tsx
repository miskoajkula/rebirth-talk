import React from "react";

interface InputProps {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  errors?: Record<string, any>;
}

const Input: React.FC<InputProps> = ({ label, name, register, placeholder, errors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default Input;
