import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { getUsers } from '@/modules/users';
import { User } from '@/types/users';
import { Select } from './Select';
import { InputWrapper } from './InputWrapper';

type Props = {
  name: string;
} & UseControllerProps<any>;

export const UserSelect = ({ name, control }: Props) => {
  const { data: users } = useQuery(['users'], getUsers, {
    staleTime: Infinity,
  });

  const createOptions = useCallback((users: User[] | undefined) => {
    if (!users) return [];

    return users.map((user) => ({
      label: user.name,
      value: user.id,
    }));
  }, []);

  return (
    <InputWrapper
      label="Select users"
      id="select-users"
      wrapperClassName="mt-4"
    >
      <Select options={createOptions(users)} name={name} control={control} />
    </InputWrapper>
  );
};
