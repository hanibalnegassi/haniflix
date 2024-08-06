import * as React from 'react'
import Navbar from '../components/navbar/Navbar'
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/reducers/auth';

import { useGetAvatarsQuery } from '../store/rtk-query/avatarsApi';
import { useGetUserQuery, useUpdateUserMutation } from '../store/rtk-query/usersApi'

import {
    TextField,
    Button,
} from "@mui/material";
import CircularProgress from "@mui/material-next/CircularProgress";

import { FaPencilAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

import { useFormik, FormikProvider, Field } from 'formik';

import * as Yup from "yup";
import Swal from "sweetalert2";

import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[500], // Darker gray outline
            '&:hover fieldset': {
                borderColor: theme.palette.grey[600], // Slightly lighter on hover
            },
        },
    },
    '& .MuiInputLabel-root': { // Target the label
        color: 'white', // Set label color to white
    },
    '& .MuiInputBase-input': {
        color: 'white', // Set text color to white
    },
}));



const EditProfile = () => {
    const user = useAppSelector(selectUser);

    const userId = user?._id;

    const [showAvatars, setShowAvatars] = React.useState<boolean>(false)
    const [selectedAvatar, setSelectedAvatar] = React.useState<undefined | any>(undefined)

    const { data: userData, isLoading: userDataLoading, refetch: refetchUserData } = useGetUserQuery(userId)
    const { data: avatarsData, isLoading: avatarsLoading, } = useGetAvatarsQuery()

    const [updateUser, updateUserState] = useUpdateUserMutation()

    const BASE_URL = import.meta.env.VITE_APP_API_URL

    const validationSchema = Yup.object({
        name: Yup.string().required("Name cannot be left blank"),
    });

    const formik = useFormik({
        validationSchema,
        initialValues: {
            name: userData?.fullname,
        },
        enableReinitialize: true
    })

    const onSubmit = async () => {
        const data = {
            ...(selectedAvatar && { avatar: selectedAvatar?.url }),
            ...(formik?.values?.name && { fullname: formik?.values?.name })
        }

        if (Object.keys(data).length == 0) {
            return
        }

        console.log('data ', data)

        const res = await updateUser({
            data,
            id: userId
        })

        if (res?.data) {
            Swal.fire({
                title: "",
                text: "Profile updated",
                icon: "success",
                timer: 1500,
            })
            refetchUserData()
        } else {
            Swal.fire({
                title: res?.error?.data?.message || "Error encountered during update",
                text: res?.error?.data?.message,
                icon: "error",
            });
        }
    }

    const onSelectAvatar = (avatar) => {
        setSelectedAvatar(
            avatar
        )
        setShowAvatars(false)
    }

    const formatImgUrl = (url) => {
        return url?.replace('/api/', '')
    }

    const isButtonDisabled = () => {
        if (updateUserState.isLoading) {
            return true
        }
        // Check if the form is valid
        if (!formik.isValid) {
            if (!selectedAvatar) {
                return true;
            }
        }

        // Check if either an avatar is selected or the form has been touched
        if (!selectedAvatar && Object.keys(formik.touched).length === 0) {
            return true;
        }

        // Otherwise, button is enabled
        return false;
    }

    return (
        <>
            <Navbar />
            <div className="mt-[150px] mx-[20px] sm:mx-[50px] flex flex-col items-center">
                <div
                    className="w-full sm:w-[500px]"
                >
                    <div className="text-4xl">Edit profile</div>
                    <div className="bg-[gray] h-[1px] w-full" />

                    {
                        showAvatars
                            ?
                            <AvatarsGrid
                                setShow={setShowAvatars}
                                show={showAvatars}
                                avatars={avatarsData?.avatars}
                                onSelect={onSelectAvatar}
                            />
                            :
                            <>
                                <div className='mt-2 flex gap-3'>
                                    <div>
                                        <div className="h-[110px] w-[110px] bg-[gray] rounded-[2px] cursor-pointer relative "
                                            onClick={() => setShowAvatars(!showAvatars)}
                                        >
                                            {
                                                user?.avatar || selectedAvatar ?
                                                    <>
                                                        {
                                                            <img src={
                                                                selectedAvatar ?
                                                                    `${BASE_URL}${formatImgUrl(selectedAvatar?.url)}`
                                                                    :
                                                                    `${BASE_URL}${formatImgUrl(user?.avatar)}`
                                                            }
                                                                className="w-full h-full rounded-[2px]"
                                                            />
                                                        }
                                                    </> : undefined
                                            }
                                            <div
                                                className="absolute bottom-[13px] left-[13px] z-[100] h-[28px] w-[28px] flex items-center justify-center rounded-[50%] bg-[rgba(0,0,0,0.3)] border border-[white]"
                                            >
                                                <FaPencilAlt />
                                            </div>
                                        </div>
                                    </div>

                                    <FormikProvider
                                        value={formik}
                                    >
                                        <Field
                                            as={CustomTextField}
                                            className="w-full"
                                            id="name"
                                            name="name"
                                            label="Name"
                                            margin="normal"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': { // Target MUI's outline
                                                    borderColor: 'transparent', // Remove default outline (optional)
                                                },
                                                '& .MuiInputBase-input': { // Target input text
                                                    color: 'white', // Or any desired text color
                                                },
                                            }}
                                        // InputProps={{ className: '!text-white ' }}
                                        />
                                    </FormikProvider>
                                    {/* <div>
                                        Language
                                    </div> */}
                                </div>
                            </>
                    }
                    <div className="flex gap-[10px] mt-4">
                        <Button
                            onClick={onSubmit}
                            className="gradientButton"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#1976d2" }}
                            disabled={isButtonDisabled()}
                            sx={{ mt: 2, mb: 2 }}
                        >
                            {updateUserState.isLoading ? <CircularProgress color="inherit" size={24} /> : "Save"}
                        </Button>
                        <Button
                            className="gradientButton"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#1976d2" }}
                            sx={{ mt: 2, mb: 2 }}
                            onClick={() => setSelectedAvatar(undefined)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>

            </div>
        </>
    )
}

const AvatarsGrid = ({ show, setShow, avatars, onSelect }) => {

    const BASE_URL = import.meta.env.VITE_APP_API_URL

    return <div
        className='mt-2 '
    >
        <div className='flex gap-2 items-center'>
            <div
                onClick={() => setShow(!show)}
                className="cursor-pointer text-white text-[25px] my-2"
            >
                <FaArrowLeft />
            </div>
            <div className=" text-2xl">Choose a profile icon</div>
        </div>
        <div className="flex flex-wrap gap-[20px]  w-full mt-4">
            {
                avatars?.map((avatar, index) => {
                    const imageUrl = avatar?.url?.replace('/api/', '')
                    return (
                        <div key={avatar?._id} className="h-[110px] w-[110px] bg-[gray] rounded-[2px] cursor-pointer"
                            onClick={() => onSelect(avatar)}
                        >
                            <img className="w-full h-full rounded-[2px]" src={`${BASE_URL}${imageUrl}`} />
                        </div>
                    )
                })
            }
        </div>
    </div>
}

export default EditProfile