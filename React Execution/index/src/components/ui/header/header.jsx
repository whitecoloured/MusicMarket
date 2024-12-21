import { Button, Image } from '@chakra-ui/react';
import './header.css'
import Logo from './Logo.png'


function Header()
{
    return(
        <header>
            <div className='headercontainer'>
                <div className='headerlogo'>
                    <Image className='img' src={Logo}></Image>
                </div>
                <div className='headerbuttons'>
                    <Button className='button'>Главная</Button>
                    <Button className='button'>Каталог</Button>
                    <Button className='button'>Войти</Button>
                    <Button className='button'>Зарегистрироваться</Button>
                </div>
            </div>
        </header>
    )
}

export default Header;