import React from "react"

import preloader from "../../../assets/gif/spinner.svg"

import './Preloader.css'


export const Preloader: React.FC = () => {
    return <img className="preloader" src={preloader} alt="loader"/>
}