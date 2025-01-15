import { Button, Center, Text } from '@chakra-ui/react';
import HomePageBG from './HomePageBG.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


function Homepage()
{
    let [headerElem,setHeaderElem]=useState(null)
    useEffect(()=>
    {
        setHeaderElem(document.querySelector('header'))
        headerElem&&headerElem.classList.add('nobg')
    },[headerElem==null])
    
    document.body.style.backgroundImage = `url(${HomePageBG})`;
    document.body.style.backgroundSize='cover'
    document.body.style.backgroundRepeat='no-repeat'

    const navigate=useNavigate();

    function onCatalogueButtonClick()
    {
        headerElem.classList.remove('nobg')
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundSize='none'
        document.body.style.backgroundRepeat='none'
        navigate("catalogue")
    }
    return(
        <>
            <div style={{height:'100px'}}>

            </div>
            <Center h={'175px'}>
                <Text color={'white'} fontFamily={'"Inter", sans-serif'} fontSize={'48px'} letterSpacing={'5px'}>
                    МАГАЗИН МУЗЫКАЛЬНЫХ ТОВАРОВ 2024
                </Text>
            </Center>
            <Center h={'200px'}>
                <Button size={'2xl'} bgColor={'#2287B5'} w={'25%'} onClick={()=> onCatalogueButtonClick()}>
                    Перейти в каталог
                </Button>
            </Center>
            <div style={{height:'155px'}}>

            </div>
        </>
    )
}

export default Homepage;