import { Card, Flex, Text, Image } from "@chakra-ui/react";
import Star from '../stars/Star.png'
import FilledStar from '../stars/FilledStar.png'

function ReviewCardFirstVariant({mark})
{
    let stars=[];
    for(let i=1; i<6; i++)
    {
        if (i>mark)
        {
            stars.push(<Image key={i} h={'30px'} src={Star}/>);
        }
        else stars.push(<Image key={i} h={'30px'} src={FilledStar}/>)
    }
    return(
        <Card.Root marginBottom={'2%'}>
            <Card.Header>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                        Юзер
                    </Text>
                    <Flex>
                        {stars}
                    </Flex>
                </Flex>
            </Card.Header>
            <Card.Body>
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

export default ReviewCardFirstVariant;