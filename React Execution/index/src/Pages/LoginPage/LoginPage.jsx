import { Center, Stack, Text, Flex, Box, Input, Button } from '@chakra-ui/react';
import './loginpage.css'

function LoginPage()
{
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
                                    <Input backgroundColor={'#A6BBC7'} placeholder={'Введите свой логин или эмайл'} marginBottom={'23px'} marginTop={'10px'}/>
                                    <Input type='password' backgroundColor={'#A6BBC7'} placeholder={'Введите свой пароль'}/>
                                </Stack>
                            </Flex>
                        </Center>
                    <Center h={'15%'}>
                        <Button backgroundColor={'#2287B5'} size={'2xl'} w={'30%'}>Войти</Button>
                    </Center>
                </div>
            </Center>
        </div>
    )
}

export default LoginPage;