import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import NewPostModal from "../PostModal/PostModal";
import './Navigation.css'

const Navigation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState("");
    const { num } = OpenModal();
    const path = window.location.pathname;

    const user = useSelector((state) => state.session?.user);

    return (
        <div className="outer-nav-container">
            <div className="mid-nav-container">
                <a className="main-logo" onClick={ () => history.push("/") }>
                    Postagram
                </a>
                <div className="search-container">
                    <input
                        className="search-bar"
                        placeholder="Search for Users"
                    >
                    </input>
                    <div className="right-nav">
                        { path === "/" && num !== 1 ? (
                            <div onClick={ () => history.push("/") } className="nav-btns">
                                HOME ICON EMPTY
                            </div>
                        ) : (
                            <div onClick={ () => history.push("/") } className="nav-btns">
                                HOME ICON FILLED
                            </div>
                        ) }
                        { path === "/messages" && num !== 1 ? (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/messages") }
                            >
                                MESSAGE ICON FILLED
                            </div>
                        ) : (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/messages") }
                            >
                                MESSAGE ICON EMPTY
                            </div>
                        ) }
                        <NewPostModal />
                        { path === "explore" && num !== 1 ? (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/explore") }
                            >
                                EXPLORE ICON FILLED
                            </div>
                        ) : (
                            <div
                                className="nav-msg-btn"
                                onClick={ () => history.push("/explore") }
                            >
                                EXPLORE ICON EMPTY
                            </div>
                        ) }
                        <p>NOTIFS BUTTON</p>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default Navigation;
