import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ServerCard from './ServerCard';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
// import ProfileButton from './ProfileButton';
// import CreateServerModal from '../CreateServerModal';
// import { getUserServers } from "../../store/servers"
// import { getAllChannelsInServer } from '../../store/channels';
import OpenModalImage from '../OpenModalImage';
// import DiscoveryLogo from '../../assets/compass.png'
// import DiscordLogo from '../../assets/discord.png'
// import AddServerImg from '../../assets/addServer.png'
import { logout } from "../../store/session";
import UserIcon from '../../assets/user.png'
import LogoutImg from '../../assets/logout.png'
import './Navigation.css';


function Navigation() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	const sessionUser = useSelector(state => state.session.user);
	// const userServers = servers.currentUserServers
	// const location = useLocation()
	// const history = useHistory()


	// useEffect(() => {
	// 	dispatch(getUserServers()).then(()=>setIsLoaded(true))
	// }, [dispatch])



	// const serversArr = Object.values(userServers);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout())

	  };

	return (
		<>
		<div className='servers-bar'>
			<div className="ProfileCard">
				<div className="profile-top">
					{/* <img className="profile-avatar"src={UserIcon} alt='avatar'/> */}
					<div>
  						<p className="profile-username">Logged in as: {sessionUser.username}</p>
					</div>
					<img className="profile-logout" onClick={handleLogout} src={LogoutImg} alt="logout"/>
				</div>
				<div className="profile-userItems">
					<ul className='profile-items'>
        			<	NavLink className='Link-Text-profile-items' exact to="/wishlist">My Wishlist</NavLink>
      				</ul>
					<ul className='profile-items'>
        				<NavLink className='Link-Text-profile-items' exact to="/shoppingcart">My Cart</NavLink>
      				</ul>
				</div>

			</div>
			<ul className='navBar'>
      			<ul className='Nav-Items'>
        			<NavLink className='Link-Text-Navbar-Home' exact to="/home">backAlley</NavLink>
      			</ul>

				  <ul className='Nav-Items'>
        			<NavLink className='Link-Text-Navbar-Game' exact to="/newgame">New Game Post</NavLink>
      			</ul>

    		</ul>

		</div>
		</>
	)

}

export default Navigation;
