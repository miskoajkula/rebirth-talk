import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  register: any;
  options: Option[];
  errors?: Record<string, any>;
}

const Select: React.FC<SelectProps> = ({ label, name, register, options, errors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name)}
        className="mt-1 text-black p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default Select;
