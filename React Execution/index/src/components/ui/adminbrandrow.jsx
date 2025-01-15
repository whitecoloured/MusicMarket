import { Button, Center, Flex, Text } from "@chakra-ui/react";

function AdminBrandRow({id, name, setConfirmationOpen})
{
    return(
        <Center h={'20%'} borderBottom={'1px solid rgba(0, 0, 0, 0.09)'}>
            <Flex w={'85%'} justifyContent={'space-between'}>
                <Text fontSize={'20px'} marginTop={'6px'} fontWeight={'bold'}>{name}</Text>
                <Button backgroundColor={'#DE3B3B'} w={'35%'} onClick={()=> setConfirmationOpen()}>Удалить</Button>
            </Flex>
        </Center>
    )
}
export default AdminBrandRow;