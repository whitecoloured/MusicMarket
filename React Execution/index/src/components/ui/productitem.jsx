import { Card, Text, Image, Button, Flex } from "@chakra-ui/react";

function ProductItem()
{
    return(
        <Card.Root w={'22%'} marginRight={'3%'} marginBottom={'1.5%'}>
            <Card.Header>
                <Image src='https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg' />
            </Card.Header>
            <Card.Body>
                <Text fontWeight={'bold'} marginBottom={'-3%'}>
                    Brand
                </Text>
                <Text fontWeight={'bold'} fontSize={'25px'} marginBottom={'3%'}>
                    ProductName
                </Text>
                <Text>
                    Цена: $999.99
                </Text>
            </Card.Body>
            <Card.Footer>
                <Flex>
                    <Button backgroundColor={'#4AC46D'} w={'45%'} marginRight={'3%'}>В корзину</Button>
                    <Button colorPalette={'teal'} w={'47%'}>Подробнее</Button>
                </Flex>
            </Card.Footer>
        </Card.Root>
    )
}

export default ProductItem;