import styles from './NavHeader.css';
import { Link } from 'react-router-dom';
const Navbar=()=>{
    return (
        <div style={styles}>
            <div className='contents-bar'>

                <div className='LBH'>
                    <div className='logo'>Logo</div>
                    <div className='brand'>Brand</div>
                    <div className='home'>Home</div>

                </div>
           
             <div className='entries'>
                <Link to={'/login'}> <div className='login'>Login</div></Link>
                <div className='signup'><Link to={'/signup'}>Signup</Link></div>
                </div>


            </div>

        </div>
    )
    }
    export default Navbar;