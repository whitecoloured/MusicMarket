import { Button, Card, Flex, Image, Stack, Text } from "@chakra-ui/react"

function CartItem({name, price, imageURL, productID, setConfirmationOpen, onConfirmingOrder})
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image h={'30%'} w={'18%'} src={imageURL} marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'} marginBottom={'-1.5%'}>{name}</Text>
                        <Text fontSize={'20px'} marginBottom={'2%'}>Цена: ${price}</Text>
                        <Flex>
                            <Button w={'35%'} marginRight={'2%'} backgroundColor={'#4AC46D'} onClick={()=>{ onConfirmingOrder(productID, name);}}>Оформить заказ</Button>
                            <Button w={'38%'} backgroundColor={'#DE3B3B'} onClick={()=> setConfirmationOpen()}>Удалить из корзины</Button>
                        </Flex>
                    </Stack>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default CartItem;