import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import './forbiddenpage.css'

function ForbiddenPage()
{
    const navigate=useNavigate()

    return(
        <div className="forbidPage">
            <Flex h={'20%'} alignItems={'flex-end'} justifyContent={'center'}>
                <Text fontWeight={'bold'} color={'white'} fontSize={'40px'}>
                    НЕТ ДОСТУПА!
                </Text>
            </Flex>
            <Center h={'25%'}>
                <Text fontWeight={'bold'} color={'white'} fontSize={'25px'}>
                    У вас нет разрешения обращаться к таким ресурсам!
                </Text>
            </Center>
            <Center h={'10%'}>
                <Button onClick={()=>navigate("/")} h={'100%'} w={'25%'} colorPalette={'teal'}>Вернуться</Button>
            </Center>
        </div>
    )
}

export default ForbiddenPage;