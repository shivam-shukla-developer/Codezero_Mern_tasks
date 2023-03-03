// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    forms: (localStorage.getItem('Forms') ? JSON.parse(localStorage.getItem('Forms')) : [])
};

// slice form
const forms = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        addForm(state, action) {
            state.forms.push(action.payload);
            localStorage.setItem('Forms', JSON.stringify(state.forms));
        },
        removeForm(state, action) {
            state.forms = state.forms.filter((form) => form.slug !== action.payload.slug);
            localStorage.setItem('Forms', JSON.stringify(state.forms));
        }
    }
});

export default forms.reducer;

export const { addForm, removeForm } = forms.actions;
