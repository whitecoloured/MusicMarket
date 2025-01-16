import { Button, Card, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { formattedDate } from "../../dateFormatter";

function OrderCard({id,name, orderDate, orderReceived, price, imageURL, setConfirmationOpen})
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image w={'12%'} src={imageURL} marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'} marginBottom={'1%'}>{name}</Text>
                        <Text>Заказ оформлен: {formattedDate(orderDate)}</Text>
                        <Text marginBottom={'3%'}>Заказ получен: {formattedDate(orderReceived)}</Text>
                        <Text fontSize={'20px'}>Цена: ${price}</Text>
                        <Button w={'20%'} colorPalette={'red'} onClick={()=> setConfirmationOpen()}>Удалить заказ</Button>
                    </Stack>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}

export default OrderCard;