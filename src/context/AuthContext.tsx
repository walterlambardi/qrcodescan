import React, { createContext, ReactNode, useReducer } from 'react';
import { deleteFromStorage, saveInStorage } from '../utils/asyncStorageUtils';

const initialState = {
  username: null,
};

type InitialStateType = {
  username: string | null;
};

export type ActionTypes =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'REMOVE_USERNAME' };

export const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ActionTypes>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const reducer = (state: InitialStateType, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_USERNAME':
      saveInStorage('username', action.payload);
      return { ...state, username: action.payload };
    case 'REMOVE_USERNAME':
      deleteFromStorage('username');
      return { ...state, username: null };
    default:
      return state;
  }
};

interface IContextProviderProps {
  children?: ReactNode;
}

const ContextProvider: React.FC<IContextProviderProps> = ({
  children,
}: IContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
