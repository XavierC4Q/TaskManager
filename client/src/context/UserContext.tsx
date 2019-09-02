import React, { Dispatch, SetStateAction } from 'react';
import {IUser} from '../types/index';

interface IUserContext {
    userData: IUser | null;
    setUser?: Dispatch<SetStateAction<IUser | null>>
}

export const useUserState = () => {
    const [userData, setUser] = React.useState<IUser | null>(null);

    return {userData, setUser};
};

export const UserContext = React.createContext<IUserContext>({userData: null});
