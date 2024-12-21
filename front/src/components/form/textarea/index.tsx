import React from "react";

interface TextareaProps {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  rows?: number;
  errors?: Record<string, any>;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, register, placeholder, rows = 4, errors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default Textarea;
