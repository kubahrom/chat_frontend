import React from 'react';
import { Listbox } from '@headlessui/react';

import { CheckmarkIcon } from '../icons/CheckmarkIcon';
import { Controller, UseControllerProps } from 'react-hook-form';

export type SelectOption = {
  value: number | string;
  label: string;
};

type Props = {
  options: SelectOption[];
} & UseControllerProps<any>;

export function Select({ options, control, name }: Props) {
  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox value={value} onChange={onChange} multiple>
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-slate-500 px-5 py-3 text-left text-slate-200 outline-none focus:ring-2 focus:ring-slate-400">
              <>
                {value.length === 0 ? (
                  <span className="text-slate-400">Select users</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {value.map((option: string) => (
                      <span
                        className="rounded-lg bg-slate-600/30 px-2 py-[2px] text-sm"
                        key={option}
                      >
                        {options.find((o) => o.value === option)?.label}
                      </span>
                    ))}
                  </div>
                )}
              </>
            </Listbox.Button>
            <Listbox.Options className="scrollbar absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-800 bg-slate-900 py-1 text-base text-slate-300 shadow-md focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                      active ? 'bg-slate-800/40' : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-100">
                          <CheckmarkIcon className="h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        )}
      />
    </div>
  );
}
