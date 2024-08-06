import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";

const ProtectedRoutes = () => {
    const user = useAppSelector(selectUser);

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoutes