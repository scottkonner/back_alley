import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import { getUserServers } from "../../store/servers";
import "./SplashPage.css"
import splashImage from "./discord-background.jpg"



function SplashPage({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
	// const userServers = useSelector(state => state.servers.currentUserServers);
    // const serversArr = Object.values(userServers);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionUser){
                history.push('/home')
        }
    }, [dispatch, history, sessionUser])

//check with dm's -- when it's completed

    return (
        <>
            <div className='splash-container'>
                <img className="discord-img" src={splashImage} alt="Splash"/>
                <div className='splash-welcome-text'>
                    <h1 className='splash-title'>back_Alley</h1>
                    <h4>Wow, filler text!  A novel way to take up space and show I can display text</h4>
                </div>

                <div  className='splash-container-links'>
                    <NavLink to='/login' className="login-button" activeClassName="active">Log In</NavLink>
                    <NavLink to='/signup' className="signup-button" activeClassName="active">Sign Up</NavLink>
                </div>
                <div className='splash-git-container'>
                    <h4 className='splash-git-title'>This is the bottom</h4>
                    <div className='splash-git-links'>
                    <a className='splash-git-links-text' href="https://github.com/scottkonner">
                        {/* <img src={GitHubImg} alt="Scott Konner" /> */}
                        <p>Scott Konner</p>
                    </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashPage
