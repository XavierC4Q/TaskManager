import React, {Dispatch, SetStateAction} from 'react';
import {IUser} from '../types/index';

interface IAuthContext {
    currentUser: null | IUser;
    setCurrentUser?: Dispatch<SetStateAction<IUser | null>>;
    logout?: () => void;
}

export const useAuthState = () => {
    const [currentUser, setCurrentUser] = React.useState<null | IUser>(null);

    const logout = () => {
        localStorage.removeItem('TOKEN');
        setCurrentUser(null);
    };

    return {currentUser, logout, setCurrentUser};
};

export const AuthContext = React.createContext<IAuthContext>({currentUser: null});
