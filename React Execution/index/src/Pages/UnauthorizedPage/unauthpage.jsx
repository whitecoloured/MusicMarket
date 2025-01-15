import { Flex, Text, Center, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router";
import './unauthpage.css'

function UnauthPage()
{
    const navigate = useNavigate();
    
    return(
        <div className="unauthPage">
            <Flex h={'20%'} alignItems={'flex-end'} justifyContent={'center'}>
                <Text fontWeight={'bold'} color={'white'} fontSize={'40px'}>
                    Вы не вошли!
                </Text>
            </Flex>
            <Center h={'25%'}>
                <Text fontWeight={'bold'} color={'white'} fontSize={'25px'}>
                    Войдите в аккаунт прежде чем получить доступ к ресурсу!
                </Text>
            </Center>
            <Center h={'10%'}>
                <Button onClick={()=>navigate("/")} h={'100%'} w={'25%'} colorPalette={'teal'}>Вернуться</Button>
            </Center>
        </div>
    )
}

export default UnauthPage;