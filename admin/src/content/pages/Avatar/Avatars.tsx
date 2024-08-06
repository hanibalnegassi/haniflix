import * as React from 'react'

import {
    useDeleteAvatarMutation,
    useGetAvatarsQuery,
    useUploadImageMutation
} from '../../../store/rtk-query/avatarsApi'

import spinnerSvg from 'src/assets/svgs/spinner.svg'

import toast from 'react-hot-toast';

import { addClassNames } from 'src/utils/functions'


import styles from './avatars.module.scss'



const BASE_URL = import.meta.env.VITE_BASE_API_URL

const ManageAvatars = () => {
    const [selectedAvatar, setSelectedAvatar] = React.useState<undefined | any>(undefined)


    const { data: avatarsData, isLoading: avatarsLoading, refetch } = useGetAvatarsQuery({}, {
        refetchOnMountOrArgChange: true,
    })

    const [deleteAvatar, deleteAvatarState] = useDeleteAvatarMutation()
    const [uploadFile, uploadFileState] = useUploadImageMutation()

    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            const imageFiles = filesArray.filter(file => file.type.startsWith('image/'));
            setSelectedFiles(imageFiles);
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFiles || selectedFiles.length == 0) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('type', 'avatar');
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        const res = await uploadFile(formData)

        if (res?.data) {

            toast.success('Avatar added', { position: 'top-right' });

            refetch()
        } else {
            toast.error(res?.error?.data?.message || 'Error encountered', { position: 'top-right' });
        }
    };

    const onDelete = async () => {

        const res = await deleteAvatar(selectedAvatar?._id)

        if (res?.data) {

            toast.success('Avatar deleted', { position: 'top-right' });

            refetch()
        } else {
            toast.error(res?.error?.data?.message || 'Error encountered', { position: 'top-right' });
        }
    }

    const renderUploadForm = () => {

        return (
            <form
                className='flex space-x-2 items-center mb-5'
                onSubmit={handleSubmit}>
                <div className="">

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {uploadFileState.isLoading ?
                        <img src={spinnerSvg} alt="Spinner" />
                        : "Upload Image"}
                </button>
            </form>
        )
    }

    return (
        <div className='mb-6 mx-[70px] mt-10'>
            <div className='flex items-start justify-between'>
                <div
                    className='font-[600] text-[25px] '
                >
                    Avatars
                </div>
                {renderUploadForm()}
            </div>
            {/* Divider */}
            <div className="mb-6 border-b border-[#4B4B4B]" />
            <div className="mt-5 grid grid-cols-4 gap-[13px]" aria-labelledby="modal-title">
                {
                    avatarsData?.avatars?.map((avatar, index) => {
                        const imageUrl = avatar?.url?.replace('/api/', '')
                        return (
                            <div
                                key={avatar?._id}
                                onClick={() => setSelectedAvatar(avatar)}
                                className={
                                    addClassNames(
                                        "h-[110px] w-[110px] bg-[gray] rounded-[2px] cursor-pointer relative",
                                        selectedAvatar?._id == avatar?._id ? 'border border-[4px] border-[#FFFFFF]' : ''
                                    )
                                }
                            >
                                {
                                    selectedAvatar?._id == avatar?._id ?
                                        <div className='absolute top-0 bottom-0 right-0 flex items-center justify-center left-0 backdrop-filter backdrop-brightness-[0.3]' >
                                            <div
                                                onClick={onDelete}
                                                className={
                                                    addClassNames(
                                                        styles['app_button'],
                                                        '!h-[33px] !w-[70px] !text-[12px] '
                                                    )
                                                }>
                                                {deleteAvatarState.isLoading ? <img src={spinnerSvg} alt="Spinner" /> : "Delete"}
                                            </div>
                                        </div>
                                        : undefined

                                }
                                <img className="w-full h-full rounded-[2px]" src={`${BASE_URL}${imageUrl}`} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ManageAvatars