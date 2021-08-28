import {PhotosType, ProfileType} from "../types/types"
import {instance, ResponseType} from "./API"


export const profileAPI = {
    setProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
                       .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
                       .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status: status })
                       .then(response => response.data)
    },
    savePhoto(photoFile: File) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, { headers: {'Content-Type': 'multipart/form-data'} })
                       .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
                       .then(response => response.data)
    }
}

type SavePhotoResponseDataType = {
    photos: PhotosType
}