import { Button, Card, Flex, Image, Stack, Text } from "@chakra-ui/react"

function CartItem()
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image h={'30%'} w={'18%'} src="https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg" marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'} marginBottom={'-1.5%'}>ProductName</Text>
                        <Text fontSize={'20px'} marginBottom={'2%'}>Цена: $999.99</Text>
                        <Flex>
                            <Button w={'35%'} marginRight={'2%'} backgroundColor={'#4AC46D'}>Оформить заказ</Button>
                            <Button w={'38%'} backgroundColor={'#DE3B3B'}>Удалить из корзины</Button>
                        </Flex>
                    </Stack>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default CartItem;