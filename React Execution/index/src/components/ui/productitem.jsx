import { Card, Text, Image, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function ProductItem({id,name, price, brandName, imageURL, onAddingToCart})
{
    const navigate=useNavigate();
    return(
        <Card.Root w={'22%'} marginRight={'3%'} marginBottom={'1.5%'}>
            <Card.Header h={'50%'}>
                <Image h={'100%'} w={'40%'} src={imageURL} />
            </Card.Header>
            <Card.Body>
                <Text fontWeight={'bold'} marginBottom={'-3%'}>
                    {brandName}
                </Text>
                <Text fontWeight={'bold'} fontSize={'25px'} marginBottom={'3%'}>
                    {name}
                </Text>
                <Text>
                    Цена: ${price}
                </Text>
            </Card.Body>
            <Card.Footer>
                <Flex flexWrap={'wrap'}>
                    <Button backgroundColor={'#4AC46D'} w={'45%'} marginRight={'3%'} onClick={()=> onAddingToCart(id,name)}>В корзину</Button>
                    <Button colorPalette={'teal'} w={'47%'} onClick={()=> navigate(`${id}`)}>Подробнее</Button>
                </Flex>
            </Card.Footer>
        </Card.Root>
    )
}

export default ProductItem;