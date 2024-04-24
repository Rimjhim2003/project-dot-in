import logo from '../images/logo.png';
import { FaBars } from 'react-icons/fa';

function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg  fixed-top" id="mainNav">
                <div class="container-fluid">
                    <a class="navbar-brand nav-link " href="/">

                        <img src={logo} alt="Logo" width="80" height="80" className='mx-2'/>
                        Project Dot In
                    </a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <FaBars />
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link " href="/about">About</a></li>
                            <li class="nav-item"><a class="nav-link " href="/projects">Projects</a></li>
                            <li class="nav-item"><a class="nav-link " href="/contact">Contact</a></li>
                            <li class="nav-item"><a class="nav-link " href="/categories">Categories</a></li>
                            <li class="nav-item"><a class="nav-link " href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Header;