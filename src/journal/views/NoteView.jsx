import { DeleteForeverOutlined, FileUploadRounded, SaveOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useCustomForm } from '../../hooks/useCustomForm'
import { deleteNote, setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components'


export const NoteView = () => {

    const dispatch = useDispatch();

    const { notes, active:note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, formState, date } = useCustomForm(note)

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            //Swal cargando...
            Swal.fire({
                title: 'Saved!',
                text: messageSaved,
                icon: 'success',
                showConfirmButton: false
            })
        }
        setTimeout(() => {
            Swal.close()
        }, 1000);
    }, [messageSaved])

    const onSaveNote = () => {
        //console.log(formState)
        dispatch(startSavingNote())
        dispatch(setActiveNote({
            ...formState,
            date : moment().format('LLLL')
        }))
    }

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files))
    }

    const deleteNoteById = () => {
        // console.log(formState)
        dispatch(deleteNote())
    }

    return (
        <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="animate__animated animate__fadeIn"
        >
            <Grid item>
                <Typography 
                    fontSize={39} 
                    fontWeight="light"
                    sx={{
                        fontSize : { xs : 30 },
                    }}
                >
                    {
                        note.date
                    }
                </Typography>
            </Grid>

            <Grid 
                item
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={ onFileInputChange }
                />
                <Button
                    disabled={isSaving}
                    color="error"
                    onClick={ deleteNoteById }
                >
                    <DeleteForeverOutlined />
                    Delete
                </Button>
                <IconButton
                    onClick={ () => {
                        fileInputRef.current.click()
                    }}
                    color='primary'
                    disabled={isSaving}
                >
                    <FileUploadRounded />
                </IconButton>
                <Button 
                    disabled={isSaving}
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding : 2 }}
                > 
                    <SaveOutlined 
                        sx={{ fontSize:30, mr:1 }} 
                    />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    label='Title'
                    variant='filled'
                    placeholder='Write a title'
                    fullWidth
                    sx={{ mb:1, border: 'none' }}
                    value={title}
                    name='title'
                    onChange={onInputChange}
                /> 
                <TextField
                    type='text'
                    label='Description'
                    variant='filled'
                    placeholder='What happened today?'
                    fullWidth
                    multiline
                    sx={{ mb:1, border: 'none' }}
                    minRows={5}
                    value={body}
                    name='body'
                    onChange={onInputChange}
                /> 
            </Grid>
            {/* Galería de imagenes */}
            <ImageGallery />
        </Grid>
    )
}

