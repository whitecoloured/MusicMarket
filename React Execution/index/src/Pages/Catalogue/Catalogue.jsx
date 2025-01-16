import { Box, Center,Flex, Input, Stack, Text, CheckboxGroup, Button } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import './catalogue.css'
import ProductItem from '../../components/ui/productitem';
import SquarePage from '../../components/ui/squarepage';
import { useEffect, useRef, useState } from 'react';
import { getBrands, getProducts, addProductToCart } from '../../../api';
import DialogMessage from '../../components/ui/dialogmessage';
import DialogErrorMessage from '../../components/ui/dialogerrormessage';

function Catalogue()
{
    const[filters, setFilters]=useState(
        {
            searchName:'',
            brandIDs:[],
            categories:[],
            firstPrice:null,
            secondPrice:null,
            sortItem:null,
            orderByAsc:true,
            page:1
        }
    )

    const [products, setProducts]=useState([]);
    const [brands, setBrands]=useState([]);
    const productAmount=useRef(0);

    const pagesAmount=Math.ceil(productAmount.current/12);

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogMessage=useRef("");
    const dialogErrorMessage=useRef("");

    if (productAmount?.current<13 && filters.page!==1)
    {
        setFilters({...filters, page:1})
    }

    useEffect(()=>
    {
        const fetchData=async()=>
        {
            const productsData=await getProducts(filters);
            setProducts(productsData?.products);
            productAmount.current=productsData?.productsAmount;
        }
        fetchData();
    },[filters])

    useEffect(()=>
    {
        const fetchData=async()=>
        {
            const brandsData=await getBrands();
            setBrands(brandsData);
        }
        fetchData();
    },[])

    function onSortChange(e)
    {
        const[OrderByAsc, SortItem]=e.target.value.split(',')
        setFilters({...filters, sortItem: SortItem, orderByAsc: OrderByAsc});
    }

    function onFilterClear()
    {
        setFilters({...filters, brandIDs:[], categories:[],firstPrice:null, secondPrice:null})
    }

    async function onAddingToCart(id,name)
    {
        const response= await addProductToCart(id);
        if (response.status===200)
        {
            dialogMessage.current=`Продукт ${name} был успешно добавлен в корзину!`
            setMessageOpen(true);
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }


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
                        <CheckboxGroup value={filters.brandIDs} onValueChange={(e)=>setFilters({...filters, brandIDs: e})} w={'85%'}>
                            {brands.map(brand=>
                                <Checkbox key={brand.id} value={brand.id} variant={'subtle'} colorPalette={'blue'}>{brand.brandName}</Checkbox>
                            )}
                        </CheckboxGroup>
                    </Center>
                    <Center>
                        <Text fontSize={'30px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                            Тип
                        </Text>
                    </Center>
                    <Center marginBottom={'2%'}>
                        <CheckboxGroup value={filters.categories} onValueChange={(e)=> setFilters({...filters, categories:e})} w={'85%'}>
                            <Checkbox value={0} variant={'subtle'} colorPalette={'blue'}>Акус. гитара</Checkbox>
                            <Checkbox value={1} variant={'subtle'} colorPalette={'blue'}>Эл. гитара</Checkbox>
                            <Checkbox value={2} variant={'subtle'} colorPalette={'blue'}>Пианино</Checkbox>
                            <Checkbox value={3} variant={'subtle'} colorPalette={'blue'}>Звук. карта</Checkbox>
                            <Checkbox value={4} variant={'subtle'} colorPalette={'blue'}>Клавиатура</Checkbox>
                            <Checkbox value={5} variant={'subtle'} colorPalette={'blue'}>Монитор</Checkbox>
                            <Checkbox value={6} variant={'subtle'} colorPalette={'blue'}>Наушники</Checkbox>
                        </CheckboxGroup>
                    </Center>
                    <Center>
                        <Text fontSize={'30px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                            Цена
                        </Text>
                    </Center>
                    <Center marginBottom={'6%'}>
                        <Stack w={'85%'} spaceY={'-3%'}>
                            <Text fontSize={'15px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                                От:
                            </Text>
                            <Input type='number' step={0.01} onChange={(e)=> setFilters({...filters, firstPrice:e.target.value?Number.parseFloat(e.target.value):null})} w={'70%'} h={'25px'} backgroundColor={'#C3C3C3'}/>
                            <Text fontSize={'15px'} fontWeight={'bolder'} fontFamily={'"Inter", sans-serif'}>
                                До:
                            </Text>
                            <Input type='number' step={0.01} onChange={(e)=> setFilters({...filters, secondPrice:e.target.value?Number.parseFloat(e.target.value):null})} w={'70%'} h={'25px'} backgroundColor={'#C3C3C3'}/>
                        </Stack>
                    </Center>
                    <Flex marginBottom={'4%'} justifyContent={'center'}>
                        <Button onClick={()=> onFilterClear()}>Очистить</Button>
                    </Flex>
                </div>
                <div className='secCol'>
                    <Center backgroundColor={'#48545B'} h={'70px'} marginBottom={'1.7%'}>
                        <Input onChange={(e)=> setFilters({...filters, searchName:e.target.value})} border={'none'} backgroundColor={'#A6BBC7'} w={'45%'} marginRight={'3%'} placeholder={'Поиск по названию..'}/>
                        <select onChange={(e)=> onSortChange(e)} style={{backgroundColor:'#A6BBC7', width:'45%', height:'40px', borderRadius:'10px 10px 10px 10px'}}>
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
                        </select>
                    </Center>
                    <Center>
                        <Flex w={'95%'} flexWrap={'wrap'}>
                            {products?.map(product=>
                                <ProductItem 
                                key={product?.id} 
                                id={product?.id}
                                name={product?.name} 
                                price={product?.price} 
                                imageURL={product?.imageURL} 
                                brandName={product?.brandName}
                                onAddingToCart={onAddingToCart}/>
                            )}
                        </Flex>
                    </Center>
                </div>
            </Flex>
            <Center h={'100px'}>
                {Array(pagesAmount).fill(null).map((_, index)=>
                    <SquarePage key={index} value={index+1} setPage={()=> setFilters({...filters, page:index+1})} />
                )}
            </Center>

            <DialogMessage
            isOpen={messageOpen}
            toggleOpen={setMessageOpen}
            message={dialogMessage?.current}/>

            <DialogErrorMessage
            isOpen={errorMessageOpen}
            toggleOpen={setErrorMessageOpen}
            message={dialogErrorMessage?.current}/>
        </div>
    )
}

export default Catalogue;