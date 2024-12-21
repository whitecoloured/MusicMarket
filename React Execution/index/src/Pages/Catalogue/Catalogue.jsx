import { Box, Center,Flex, Input, Stack, Text } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import './catalogue.css'
import ProductItem from '../../components/ui/productitem';
import SquarePage from '../../components/ui/squarepage';
import Select from '../../components/ui/select';

function Catalogue()
{
    return(
        <div className="catalogueForm">
            <Flex>
                <div className='firstCol'>
                    <Center>
                        <Text fontSize={'30px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                            Бренд
                        </Text>
                    </Center>
                    <Center marginBottom={'2%'}>
                        <Stack w={'85%'}>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Yamaha</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>AKG</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>ADAM</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>JBL</Checkbox>
                        </Stack>
                    </Center>
                    <Center>
                        <Text fontSize={'30px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                            Тип
                        </Text>
                    </Center>
                    <Center marginBottom={'2%'}>
                        <Stack w={'85%'}>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Акус. гитара</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Монитор</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Эл. гитара</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Клавиатура</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Звук. карта</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Пианино</Checkbox>
                            <Checkbox variant={'subtle'} colorPalette={'blue'}>Наушники</Checkbox>
                        </Stack>
                    </Center>
                    <Center>
                        <Text fontSize={'30px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                            Цена
                        </Text>
                    </Center>
                    <Center marginBottom={'4%'}>
                        <Stack w={'85%'} spaceY={'-3%'}>
                            <Text fontSize={'15px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                                От:
                            </Text>
                            <Input w={'70%'} h={'25px'} backgroundColor={'#C3C3C3'}/>
                            <Text fontSize={'15px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                                До:
                            </Text>
                            <Input w={'70%'} h={'25px'} backgroundColor={'#C3C3C3'}/>
                        </Stack>
                    </Center>
                </div>
                <div className='secCol'>
                    <Center backgroundColor={'#48545B'} h={'70px'} marginBottom={'1.7%'}>
                        <Input border={'none'} backgroundColor={'#A6BBC7'} w={'45%'} marginRight={'3%'} placeholder={'Поиск по названию..'}/>
                        <Select style={{bgColor:'#A6BBC7', width:'45%', height:'40px'}}>
                            <option value={[true, '']}>
                                Сортировать по..
                            </option>
                            <option value={[true, 'price']}>
                                Сначала дешевые
                            </option>
                            <option value={[false, 'price']}>
                                Сначала дорогие
                            </option>
                            <option value={[true, 'name']}>
                                Сортировать по имени {'(по возрастанию)'}
                            </option>
                            <option value={[false, 'name']}>
                                Сортировать по имени {'(по убыванию)'}
                            </option>
                        </Select>
                    </Center>
                    <Center>
                        <Flex w={'95%'} flexWrap={'wrap'}>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                            <ProductItem/>
                        </Flex>
                    </Center>
                </div>
            </Flex>
            <Center h={'100px'}>
                <SquarePage value={1}/>
                <SquarePage value={2}/>
                <SquarePage value={3}/>
                <SquarePage value={4}/>
            </Center>
        </div>
    )
}

export default Catalogue;