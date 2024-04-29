import { atom } from 'jotai';

export const showPasswordUpdateAtom = atom(false);
export const messageAtom = atom('');
export const financialDataAtom = atom({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  })
export const isModalOpenAtom = atom(false);
export const editingRecordAtom = atom<any>(null);
export const recordFilterAtom = atom({
    date: '',
    type: '',
    amount: ''
});

export const emailAtom = atom('');
export const usernameAtom = atom('');
export const passwordAtom = atom('');
export const confirmPasswordAtom = atom('');
export const errorAtom = atom('');
