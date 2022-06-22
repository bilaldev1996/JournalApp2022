
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import JournalLayout from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {

    const { active:activeNote } = useSelector(state => state.journal)

    const { isSaving } = useSelector(state => state.journal)

    const dispatch = useDispatch()

    const addNewNote = () =>{
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {
                activeNote 
                ?
                <NoteView />
                :
                <NothingSelectedView />
            }
            <IconButton
                disabled={ isSaving }
                onClick={ addNewNote }
                size='medium'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {
                        backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined
                    sx={{ fontSize: 40 }}
                />
            </IconButton>
        </JournalLayout>
        
    )
}

