


import { create } from 'zustand';
import {  persist } from "zustand/middleware";

export type loginStateData = 'uncertain' | 'loggedIn' | 'loggedOut';

export type LoginResponse={
    token:string;
    role_id:string;
    username:string;
}

export const sidebar=[
    {
       name:'User' 
    }
    ,{
        name:'Artist'
    },
    {
        name:'Music'
    }
]

export interface LoginSession {
	navItem:(typeof sidebar)[number][]
	loginData: LoginResponse | null;
	loginState: loginStateData;
	login: (loginData: LoginResponse) => void;
	logout: () => void;
}


export const useLoginSessionStore = create<LoginSession>() (
     persist(
    (set) => {
	return {
		navItem:[],
		loginData: null,
		loginState: 'uncertain',
	
		login: (loginData: LoginResponse) => {
			set({ loginData: loginData,
				 navItem: sidebar.slice(Number(loginData.role_id)-1 ),
				loginState: 'loggedIn' });
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