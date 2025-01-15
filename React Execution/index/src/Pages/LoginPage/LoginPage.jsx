import { Center, Stack, Text, Flex, Input, Button } from '@chakra-ui/react';
import './loginpage.css'
import { useRef, useState } from 'react';
import { loginUser } from '../../../api';
import DialogErrorMessage from '../../components/ui/dialogerrormessage'
import { useNavigate } from 'react-router';

function LoginPage()
{
    const [loginData, setLoginData]=useState(
        {
            input:"",
            password:""
        }
    )

    const [errorMessageOpen, setErrorMessageOpen]=useState(false);
    const dialogErrorMessage=useRef("");

    const navigate=useNavigate();


    async function onLoginSubmit()
    {
        const response=await loginUser(loginData);
        console.log(response);
        if (response?.status===200)
        {
            localStorage.setItem("authToken", response?.data);
            navigate("/catalogue")
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }

    }
    return(
        <div className="loginPageForm">
            <Center h={'20%'}>
                <Text fontSize={'40px'} color={'white'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                    LOGIN
                </Text>
            </Center>
            <Center h={'70%'}>
                <div className='loginForm'>
                        <Center h={'75%'}>
                            <Flex w={'85%'}>
                                <Stack marginRight={'7%'}>
                                    <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                        Email/Login:
                                    </Text>
                                    <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                        Password:
                                    </Text>
                                </Stack>
                                <Stack w={'60%'}>
                                    <Input onChange={(e)=> setLoginData({...loginData, input:e.target.value})} backgroundColor={'#A6BBC7'} placeholder={'Введите свой логин или эмайл'} marginBottom={'23px'} marginTop={'10px'}/>
                                    <Input onChange={(e)=> setLoginData({...loginData, password:e.target.value})} type='password' backgroundColor={'#A6BBC7'} placeholder={'Введите свой пароль'}/>
                                </Stack>
                            </Flex>
                        </Center>
                    <Center h={'15%'}>
                        <Button onClick={()=> onLoginSubmit()} backgroundColor={'#2287B5'} size={'2xl'} w={'30%'}>Войти</Button>
                    </Center>
                    <DialogErrorMessage
                    isOpen={errorMessageOpen}
                    toggleOpen={setErrorMessageOpen}
                    message={dialogErrorMessage?.current}/>
                </div>
            </Center>
        </div>
    )
}

export default LoginPage;