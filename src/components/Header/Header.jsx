import logo from '../../assets/logo.png';
import { Nav } from '../Nav/Nav';

export const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logo Retro Games" />
            <Nav />
        </header>
    )
}