import React from 'react';

type LabelProps = {
  id: string;
  label: string;
};

export const Label = ({ label, id }: LabelProps) => {
  return (
    <label className="block pb-1 text-sm text-slate-400" htmlFor={id}>
      {label}
    </label>
  );
};
