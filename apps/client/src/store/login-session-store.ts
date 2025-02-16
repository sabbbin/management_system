


import { create } from 'zustand';
import {  persist } from "zustand/middleware";

export type loginStateData = 'uncertain' | 'loggedIn' | 'loggedOut';

export type LoginResponse={
    token:string;
    role_id:string;
    username:string;
}

export interface LoginSession {
	loginData: LoginResponse | null;
	loginState: loginStateData;
	login: (loginData: LoginResponse) => void;
	logout: () => void;
}


export const useLoginSessionStore = create<LoginSession>() (
     persist(
    (set) => {
	return {
		loginData: null,
		loginState: 'uncertain',
	
		login: (loginData: LoginResponse) => {
			set({ loginData: loginData, loginState: 'loggedIn' });
		},
		logout: () => {
			set({ loginData: null, loginState: 'loggedOut' });
		},
	};
}
, {
    name:'bearStore'
}
)
);