import { Center, Text, Box, Flex, Stack, Input, Button } from '@chakra-ui/react';
import './registerpage.css'
import { useRef, useState } from 'react';
import { registerUser } from '../../../api';
import DialogErrorMessage from '../../components/ui/dialogerrormessage';

function RegisterPage()
{
    const[registerData,setRegisterData]=useState({
        name:null,
        surname:null,
        login:null,
        email:null,
        password:null,
        address:
        {
            streetType:-1,
            streetName:null,
            streetNumber:null
        }
    })

    const [errorMessageOpen, setErrorMessageOpen]=useState(false);
    const dialogMessage=useRef("");

    const navigate=useNavigate();

    async function onSubmitRegister()
    {
        const postData={
            userModel:registerData
        }
        const response=await registerUser(postData);
        if (response?.status===200)
        {
            navigate("/catalogue")
        }
        else
        {
            dialogMessage.current=response?.message;
            setErrorMessageOpen(true)
        }
        
    }

    console.log(registerData)
    return(
        <div className="registerPageForm">
            <Center h={'15%'}>
                <Text fontSize={'40px'} color={'white'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                    REGISTER
                </Text>
            </Center>
            <Center h={'75%'}>
                <div className='registerForm'>
                    <Center h={'70%'} alignItems={'flex-end'}>
                        <Flex w={'80%'}>
                            <Stack marginRight={'7%'}>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Login:
                                </Text>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Email:
                                </Text>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Password:
                                </Text>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Name:
                                </Text>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Surname:
                                </Text>
                                <Text fontSize={'40px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'} marginBottom={'5px'}>
                                    Address
                                </Text>
                            </Stack>
                            <Stack w={'65%'}>
                                <Input onChange={(e)=> setRegisterData({...registerData, login:e.target.value})} backgroundColor={'#A6BBC7'} placeholder={'Введите свой логин'} marginBottom={'25px'} marginTop={'6px'}/>
                                <Input onChange={(e)=> setRegisterData({...registerData, email:e.target.value})} backgroundColor={'#A6BBC7'} placeholder={'Введите свой эмайл'} marginBottom={'27px'}/>
                                <Input onChange={(e)=> setRegisterData({...registerData, password:e.target.value})} type='password' backgroundColor={'#A6BBC7'} placeholder={'Введите свой пароль'} marginBottom={'25px'}/>
                                <Input onChange={(e)=> setRegisterData({...registerData, name:e.target.value})} backgroundColor={'#A6BBC7'} placeholder={'Введите свое имя'} marginBottom={'27px'}/>
                                <Input onChange={(e)=> setRegisterData({...registerData, surname:e.target.value})} backgroundColor={'#A6BBC7'} placeholder={'Введите свою фамилию'} marginBottom={'27px'}/>
                            </Stack>
                        </Flex>
                    </Center>
                    <Center h={'15%'}>
                        <Flex w={'80%'} h={'100%'}>
                            <Stack marginRight={'10%'}>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Street:
                                </Text>
                                <select onChange={(e)=>setRegisterData(prevData=>({...prevData, address:{...prevData.address, streetType:e.target.value}}))} style={{backgroundColor:'#A6BBC7', width:'120px', height:'40px', borderRadius:'10px 10px 10px 10px'}}>
                                    <option value={-1}>Выбрать..</option>
                                    <option value={0}>улица</option>
                                    <option value={1}>переулок</option>
                                    <option value={2}>площадь</option>
                                    <option value={3}>проспект</option>
                                </select>
                            </Stack>
                            <Stack marginRight={'10%'}>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Name:
                                </Text>
                                <Input onChange={(e)=> setRegisterData({...registerData, address:{...registerData.address, streetName:e.target.value}})} backgroundColor={'#A6BBC7'}></Input>
                            </Stack>
                            <Stack>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Number:
                                </Text>
                                <Input onChange={(e)=> setRegisterData({...registerData, address:{...registerData.address, streetNumber:e.target.value}})} backgroundColor={'#A6BBC7'}></Input>
                            </Stack>
                        </Flex>
                    </Center>
                    <Center h={'15%'}>
                        <Button backgroundColor={'#2287B5'} size={'2xl'} w={'30%'} onClick={()=> onSubmitRegister()}>Завершить</Button>
                    </Center>
                    <DialogErrorMessage
                    isOpen={errorMessageOpen}
                    toggleOpen={setErrorMessageOpen}
                    message={dialogMessage?.current}/>
                </div>
            </Center>
        </div>
    )
}

export default RegisterPage;