import { Card, Flex, Image, Stack, Text } from "@chakra-ui/react"

function OrderCard()
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image h={'30%'} w={'18%'} src="https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg" marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'}>ProductName</Text>
                        <Text>Заказ оформлен: 12.12.2024</Text>
                        <Text marginBottom={'3%'}>Заказ получен: 18.12.2024</Text>
                        <Text fontSize={'20px'}>Цена: $999.99</Text>
                    </Stack>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default OrderCard;