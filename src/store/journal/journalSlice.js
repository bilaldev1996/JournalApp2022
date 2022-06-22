import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved : '',
        notes: [],
        active: null
    },
    reducers: {

        savingNewNote : (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },

        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSaved = ''
        },

        setNotes: (state, action) => {
            state.notes = action.payload
        },

        setIsSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },

        updateNotes: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note=>{
                if(note.id === action.payload.id){
                    return {
                        ...action.payload,
                        nota : 'hola'
                    }
                }

                return note
            })

            state.messageSaved = `Note ${ action.payload.title } saved`
        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls,...action.payload]
            state.isSaving = false
        },

        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },

        deleNoteById: (state, action) => {
            state.active = null
            state.notes = state.notes.filter(note=>note.id !== action.payload)
        }

    },
});

export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleNoteById,
    savingNewNote,
    setActiveNote,
    setIsSaving,
    setNotes,
    setPhotosToActiveNote,
    updateNotes,
} = journalSlice.actions;