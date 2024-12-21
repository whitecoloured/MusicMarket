import { Center, Text, Box, Flex, Stack, Input, Button } from '@chakra-ui/react';
import Select from '../../components/ui/select';
import './registerpage.css'

function RegisterPage()
{
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
                                <Input backgroundColor={'#A6BBC7'} placeholder={'Введите свой логин'} marginBottom={'25px'} marginTop={'6px'}/>
                                <Input backgroundColor={'#A6BBC7'} placeholder={'Введите свой эмайл'} marginBottom={'27px'}/>
                                <Input type='password' backgroundColor={'#A6BBC7'} placeholder={'Введите свой пароль'} marginBottom={'25px'}/>
                                <Input backgroundColor={'#A6BBC7'} placeholder={'Введите свое имя'} marginBottom={'27px'}/>
                                <Input backgroundColor={'#A6BBC7'} placeholder={'Введите свою фамилию'} marginBottom={'27px'}/>
                            </Stack>
                        </Flex>
                    </Center>
                    <Center h={'15%'}>
                        <Flex w={'80%'} h={'100%'}>
                            <Stack marginRight={'10%'}>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Street:
                                </Text>
                                <Select style={{bgColor:'#A6BBC7', width:'120px', height:'40px'}}>
                                    <option value={-1}>Выбрать..</option>
                                    <option value={0}>улица</option>
                                    <option value={1}>переулок</option>
                                    <option value={2}>площадь</option>
                                    <option value={3}>проспект</option>
                                </Select>
                            </Stack>
                            <Stack marginRight={'10%'}>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Name:
                                </Text>
                                <Input backgroundColor={'#A6BBC7'}></Input>
                            </Stack>
                            <Stack>
                                <Text fontSize={'35px'} fontWeight={'bold'} fontFamily={'"Londrina Solid", sans-serif'} letterSpacing={'3px'}>
                                    Number:
                                </Text>
                                <Input backgroundColor={'#A6BBC7'}></Input>
                            </Stack>
                        </Flex>
                    </Center>
                    <Center h={'15%'}>
                        <Button backgroundColor={'#2287B5'} size={'2xl'} w={'30%'}>Завершить</Button>
                    </Center>
                </div>
            </Center>
        </div>
    )
}

export default RegisterPage;