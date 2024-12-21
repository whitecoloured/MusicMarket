import { Center, Container, Flex, Image, Text, Stack, Button, Input} from '@chakra-ui/react';

import './currentproductinfo.css'
import CharacteristicsTable from '../../components/ui/characteristicstable';
import Star from '../../components/ui/stars/Star.png'
import ReviewCardFirstVariant from '../../components/ui/reviewcards/reviewcardfirstvariant';
import ProductsReviewsDialogPage from '../../DialogPages/ProductsReviewsDialogPage';

function CurrentProductInfo()
{
    let slicedArray=[
        <ReviewCardFirstVariant mark={3}/>,
        <ReviewCardFirstVariant mark={2}/>,
        <ReviewCardFirstVariant mark={5}/>
    ]
    return(
        <div className="curProductInfoForm">
            <Center>
                <Container w={'98%'}>
                    <Text fontSize={'30px'} color={'white'} marginTop={'0.6%'} marginBottom={'2%'}>
                        {'<'}Назад
                    </Text>
                    <Flex marginBottom={'2%'}>
                        <Image w={'25%'} src={'https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg'} marginRight={'15%'}/>
                        <Stack>
                            <Text marginBottom={'0.3%'} color={'white'} fontWeight={'bold'}>
                                Brand
                            </Text>
                            <Text marginBottom={'5%'} color={'white'} fontSize={'40px'} fontWeight={'bold'}>
                                ProductName
                            </Text>
                            <Text marginBottom={'20%'} color={'white'} fontSize={'40px'}>
                                Цена: $999.99
                            </Text>
                            <Button backgroundColor={'#4AC46D'} size={'xl'}>
                                В корзину
                            </Button>
                        </Stack>
                    </Flex>
                    <Text fontSize={'22px'} color={'white'} marginBottom={'4%'}>
                        Описание: тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры  тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры тырыпыры  тырыпыры тырыпыры 
                    </Text>
                    <Text fontSize={'25px'} color={'white'} marginBottom={'1.5%'}>
                        Характеристики:
                    </Text>
                    <CharacteristicsTable/>
                    <Text fontSize={'25px'} color={'white'} marginBottom={'1%'}>
                        Отзывы
                    </Text>
                    <Flex justifyContent={'flex-end'} marginBottom={'2%'}>
                        <Center backgroundColor={'white'} h={'70px'} borderRadius={'5px 5px 5px 5px'}>
                            <Flex>
                                <Image h={'50px'} cursor={'pointer'} src={Star}/> 
                                <Image h={'50px'} cursor={'pointer'} src={Star}/> 
                                <Image h={'50px'} cursor={'pointer'} src={Star}/> 
                                <Image h={'50px'} cursor={'pointer'} src={Star}/> 
                                <Image h={'50px'} cursor={'pointer'} src={Star}/> 
                            </Flex>
                        </Center>
                    </Flex>
                    <Input backgroundColor={'white'} h={'120px'} boxSizing={'border-box'} wordWrap={'break-word'} marginBottom={'2%'} placeholder='Напиши свой отзыв!'/>
                    {slicedArray}
                    <Center marginBottom={'3%'}>
                        <ProductsReviewsDialogPage/>
                    </Center>
                </Container>
            </Center>
        </div>
    )
}

export default CurrentProductInfo;