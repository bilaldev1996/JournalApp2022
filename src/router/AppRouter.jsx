import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckOut } from '../hooks/useCheckOut'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'

const AppRouter = () => {

    const { status } = useCheckOut() 

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                status === 'authenticated' || status !== 'not-authenticated' 
                ? <Route path="/*" element={ <JournalRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            
        </Routes>
    )
}

export default AppRouter
