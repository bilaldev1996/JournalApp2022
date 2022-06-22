import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import moment from 'moment';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, setActiveNote, setIsSaving, savingNewNote, setNotes, updateNotes, setPhotosToActiveNote, deleNoteById } from './journalSlice';

export const startNewNote = () => {
    return async(dispatch, getState) => {
        
        dispatch(savingNewNote());
        // uid del usuario
        const uid = getState().auth.uid;

        // crear un nuevo objeto con la fecha actual
        const newNote = {
            title: '',
            body: '',
            date: moment().format('LLLL'),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB,`${ uid }/journal/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id
        
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLodingNotes = () => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        if(!uid) throw new Error('No user logged in')
        
        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}


export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch(setIsSaving())

        const uid = getState().auth.uid;
        const { active:note } = getState().journal;


        const noteToFirestore = ({ 
                ...note,
                date : moment().format('LLLL')
        })
        delete noteToFirestore.id


        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await setDoc(docRef, noteToFirestore, { merge: true })

        dispatch(updateNotes({
            ...note,
            date : moment().format('LLLL')
        }))
        
    }
}

export const startUploadingFiles = ( files = [] ) =>{
    return async(dispatch) => {
        dispatch(setIsSaving())
        Swal.fire({
            title: 'Uploading files...',
            text: 'Please wait',
            showConfirmButton: false
        })

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photosUrls))
        Swal.close()
    }
}

export const deleteNote = () => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;

        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        const resp = await deleteDoc(docRef);

        dispatch(deleNoteById(note.id))
        Swal.fire({
            title: 'Note deleted',
            text: '',
            icon: 'success'
        })
    }
}