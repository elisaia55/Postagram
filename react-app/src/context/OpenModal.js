import { createContext, useContext, useState } from "react";

const OpenModalContext = createContext();

export const OpenModalProvider = (props) => {
    const [num, setNum] = useState(0);
    const [likes, setLikes] = useState(0)

    return (
        <OpenModalContext.Provider
            value={
                {
                    num,
                    setNum
                }
            }>
            { props.children }
        </OpenModalContext.Provider>
    )

}

export const OpenModal = () => useContext(OpenModalContext)
