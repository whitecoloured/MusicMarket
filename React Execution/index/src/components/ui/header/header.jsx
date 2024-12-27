import { Button, Image } from '@chakra-ui/react';
import './header.css'
import Logo from './Logo.png'
import { useRef } from 'react';


function Header()
{
    const HeaderElem=useRef(null);

    function HandleClick()
    {
        if(!HeaderElem.current.classList.contains('nobg'))
        {
            return;
        }
        HeaderElem.current.classList.remove('nobg')   
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundSize='none'
        document.body.style.backgroundRepeat='none'  
    }

    return(
        <header ref={HeaderElem}>
            <div className='headercontainer'>
                <div className='headerlogo'>
                    <Image className='img' src={Logo}></Image>
                </div>
                <div className='headerbuttons'>
                    <Button className='button'>Главная</Button>
                    <Button className='button' onClick={()=> HandleClick()}>Каталог</Button>
                    <Button className='button' onClick={()=> HandleClick()}>Войти</Button>
                    <Button className='button' onClick={()=> HandleClick()}>Зарегистрироваться</Button>
                </div>
            </div>
        </header>
    )
}

export default Header;