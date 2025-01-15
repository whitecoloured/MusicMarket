import { Button, Card, Flex, Image, Stack, Text } from "@chakra-ui/react"
function AdminPageProductItem({id, name, brandName, imageURL, setEditPageOpen, setConfirmationOpen})
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image h={'30%'} w={'18%'} src={imageURL} marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'} marginBottom={'-1.5%'}>{name}</Text>
                        <Text fontSize={'14px'} marginBottom={'2%'} fontWeight={'bold'}>{brandName}</Text>
                        <Flex>
                            <Button w={'35%'} marginRight={'2%'} backgroundColor={'#BE7E47'} onClick={()=> setEditPageOpen()}>Изменить</Button>
                            <Button w={'38%'} backgroundColor={'#DE3B3B'} onClick={()=> setConfirmationOpen()}>Удалить</Button>
                        </Flex>
                    </Stack>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}
export default AdminPageProductItem;