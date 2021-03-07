import React, { useContext } from 'react'
import { AuthContext } from '../../context/index'
import './navbar.scss'

const NavBar = () =>{
    const { isLoggedIn, signOut } = useContext(AuthContext);
    const handleSignOut = async () => {
        try {
          await signOut();
        } catch (e) {
        }
      };
    return (
        <div>

{isLoggedIn?(
    <nav>

    <div className="nav-wrapper">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" onClick={handleSignOut}>Logout</a></li>
        </ul>
        </div>
    </nav>
):(<div></div>)}
    
        </div>
    
    )}

export default NavBar