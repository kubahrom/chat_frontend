import React, { FC, Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

import { CrossIcon } from '../icons/CrossIcon';

type Props = PropsWithChildren<{
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  title?: string;
}>;

export const Modal: FC<Props> = ({
  isOpen,
  closeModal,
  className,
  children,
  title,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-40"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-40"
        >
          <div className="fixed inset-0 bg-backdrop/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="scale-95"
              enterTo="scale-100"
              leave="ease-in duration-200"
              leaveFrom=" scale-100"
              leaveTo="scale-95"
              className="w-full max-w-full md:w-auto"
            >
              <Dialog.Panel
                className={twMerge([
                  'relative w-full transform rounded-xl bg-slate-900/50 py-8 text-left align-middle shadow-lg backdrop-blur-xl transition-transform md:w-[520px]',
                  className,
                ])}
              >
                <div className="px-6 sm:px-10">
                  {title && (
                    <h2 className="pb-6 text-xl text-slate-300">{title}</h2>
                  )}
                  {children}
                </div>
                <button
                  className="absolute right-0 top-0 mr-5 mt-7 sm:mr-7"
                  onClick={closeModal}
                >
                  <CrossIcon className="w-4 text-slate-400" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
