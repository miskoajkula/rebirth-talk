import React from "react";

interface CheckboxProps {
  label: string;
  name: string;
  register: any;
  errors?: Record<string, any>;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, register, errors }) => {
  return (
    <div className="flex items-center">
      <input
        {...register(name)}
        type="checkbox"
        id={name}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default Checkbox;
