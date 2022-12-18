import React, { ReactNode, useState } from "react";
import { InputHTMLAttributes } from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<FormTypes extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<FormTypes>;
  label?: string;
  type: "text" | "number" | "email" | "date" | "tel";
  placeholder?: string;
  register: UseFormRegister<FormTypes>;
  autoComplete?: string;
  errors: Partial<FieldErrorsImpl<FormTypes>>;
  pattern?: string;
}

export const Input = <FormTypes extends FieldValues>({
  name,
  placeholder,
  type,
  register,
  label,
  style,
  autoComplete,
  errors,
  pattern,
  ...rest
}: InputProps<FormTypes>) => {
  const error = errors[name];
  const [value, setValue] = useState("");
  return (
    <div className={type === "text" ? "col-span-3" : "col-span-6"}>
      <label
        className="w-full rounded-lg border-gray-200 text-sm shadow-sm"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={
          type === "text"
            ? "w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
            : "w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
        }
        {...register(name)}
        {...rest}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {error ? (
        <span role="alert" className="text-red-500 font-bold text-sm">
          {errors?.[name]?.type === "required" ? <p>Pole jest wymagane</p>: error.message as ReactNode}
        </span>
      ) : ""}
    </div>
  );
};
