import { Button, Image } from '@chakra-ui/react';
import './header.css'
import Logo from './Logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserRole } from '../../../../api';


function Header()
{
    const HeaderElem=useRef(null);

    const navigate=useNavigate();

    const [role, setRole]=useState("");

    useEffect(()=>
    {
        if (!localStorage.getItem("authToken"))
        {
            return;
        }
        const fetchRole=async()=>
        {
            const roleData=await getUserRole();
            setRole(roleData)
        }
        fetchRole();
    },[localStorage.getItem("authToken")])

    function HandleClick(routepath)
    {
        navigate(routepath)
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
                    <Button className='button' onClick={()=> navigate("/")}>Главная</Button>
                    <Button className='button' onClick={()=> HandleClick("catalogue")}>Каталог</Button>
                    {localStorage.getItem("authToken")?
                    <>
                        <Button className='button' onClick={()=> HandleClick("profile")}>Профиль</Button>
                        <Button className='button' onClick={()=> HandleClick("cart")}>Корзина</Button>
                        {role==="Admin"&&
                        <Button className='button' onClick={()=> HandleClick("adminPage")}>Админка</Button>}
                    </>:
                    <>
                        <Button className='button' onClick={()=> HandleClick("login")}>Войти</Button>
                        <Button className='button' onClick={()=> HandleClick("register")}>Зарегистрироваться</Button>
                    </>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;