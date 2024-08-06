import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";

const GuestRoutes = () => {

    const user = useAppSelector(selectUser);


    return (
        <Outlet />
    )
}

export default GuestRoutes