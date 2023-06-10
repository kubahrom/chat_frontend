import { useState } from 'react';
import { createContainer } from 'react-tracked';

import { User } from '@/types/users';

type State = {
  user: User | null;
  init: boolean;
  loader: boolean;
  activeChat: string | null;
};

const initialState = {
  user: null,
  loader: false,
  init: false,
  activeChat: null,
};

export const {
  Provider: GlobalStoreProvider,
  useTracked: useGlobalStore,
  useTrackedState: useGlobalStoreState,
  useUpdate: useGlobalStoreUpdate,
} = createContainer(() => useState<State>(initialState));
