import React, {useState} from "react"

import './Paginator.scss'


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 6}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize),
          pages: Array<number> = [],
          portionCount = Math.ceil(pagesCount / portionSize),
          [portionNumber, setPortionNumber] = useState(1),
          leftPortionPageNumber = (portionNumber - 1) * portionSize + 1,
          rightPortionPageNumber = portionNumber * portionSize

    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    return (
        <div className="users__buttons_inner">
            <button onClick={() => { if (portionNumber > 1) setPortionNumber(portionNumber - 1) }}
                    className={`users__left_btn arrow__btn ${portionNumber > 1 ? `` : `disabled__btn`}`} >
                <i className="fas fa-caret-left"/>
            </button>
            {pages.filter(item => item >= leftPortionPageNumber && item <= rightPortionPageNumber)
                .map(item =>
                <button key={item} onClick={() => { onPageChanged(item) }}
                        className={`users__button ${currentPage === item ? `selected` : ``}`}
                >{item}</button>)
            }
            <button onClick={() => { if (portionCount > portionNumber) setPortionNumber(portionNumber + 1) }}
                    className={`users__right_btn arrow__btn ${portionCount > portionNumber ? `` : `disabled__btn`}`}>
                <i className="fas fa-caret-right"/>
            </button>
        </div>
    )
}