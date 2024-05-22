import './Home.css'
import Navbar from '../Navbar/Navbar.jsx'
function Home() {
  return (
    <div className='page'>
        <Navbar/>
        <div className='container'>
            <div className='welcome-text'>Bienvenido Usuario</div>
        </div>
    </div>
  )
}

export default Home