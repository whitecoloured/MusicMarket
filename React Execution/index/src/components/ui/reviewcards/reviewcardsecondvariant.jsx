import { Flex, Image, Text, Card } from "@chakra-ui/react"
import Star from '../stars/Star.png'
import FilledStar from '../stars/FilledStar.png'

function ReviewCardSecondVariant()
{
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Header>
                <Flex justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'20px'}>Отзыв о продукте</Text>
                    <Flex>
                        <Image h={'30px'} src={FilledStar}/>
                        <Image h={'30px'} src={FilledStar}/>
                        <Image h={'30px'} src={Star}/>
                        <Image h={'30px'} src={Star}/>
                        <Image h={'30px'} src={Star}/>
                    </Flex>
                </Flex>
            </Card.Header>
            <Card.Body overflow={'hidden'}>
                Описание отзыва
            </Card.Body>
            <Card.Footer>
                <Flex justifyContent={'flex-end'} w={'100%'}>
                    <Text fontSize={'13px'}>Дата: 27.05.2091 12:00</Text>
                </Flex>
            </Card.Footer>
        </Card.Root>
    )
}

export default ReviewCardSecondVariant;