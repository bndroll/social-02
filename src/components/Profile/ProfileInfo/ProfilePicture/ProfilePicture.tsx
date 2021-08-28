import React from "react"
import { ChangeEvent } from "react"

import userPhoto from '../../../../assets/images/pudge.jpg'
import './ProfilePicture.scss'


type PropsType = {
    photo: string | null
    isOwner: boolean

    savePhoto: (file: File) => void
}


export const ProfilePicture: React.FC<PropsType> = ({photo, isOwner, savePhoto}) => {
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className="about__avatar">
            <img className="about__img" src={photo || userPhoto} alt="user"/>
            {isOwner ?
                <div className="about__input_wrapper">
                    <input onChange={onMainPhotoSelected}
                           name={'file'}
                           id={'photoEditInput'}
                           type={'file'}
                           className="about__edit_input"/>
                    <label htmlFor={'photoEditInput'} className="about__edit_label">
                        <span className="edit__label_picture">
                            <i className="fas fa-arrow-circle-down"/>
                        </span>
                        <span className="edit__label_text">Choose file</span>
                    </label>
                </div> : null
            }
        </div>
    )
}