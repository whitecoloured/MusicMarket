import {
    DialogBody,
    DialogTrigger,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
  } from "../components/ui/dialog"

import CharacteristicRow from "../components/ui/characteristicrow";
import { Button, Flex, Input, Text, Stack, Center, Textarea } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import DialogMessage from "../components/ui/dialogmessage";
import { editProductInfo, getBrands, getProductAdmin } from "../../api";
import DialogErrorMessage from "../components/ui/dialogerrormessage";

function EditProductDialogPage({productID,isOpen, setIsOpen, onRefresh})
{

    const [brands, setBrands]=useState([]);


    const [product, setProduct]=useState(
        {
            name:"",
            desc:"",
            category:-1,
            brandID:"00000000-0000-0000-0000-000000000000",
            price:0,
            characteristics:[],
            imageURL:""
        }
    )

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");

    const charRows=Array(product?.characteristics?.length).fill(null).map((_, index)=>
        <CharacteristicRow 
        key={index} 
        index={index}
        chars={product?.characteristics}
        setChars={setProduct}/>
    );

    useEffect(()=>
    {
        if (!isOpen)
        {
            return;
        }
        const fetchData=async()=>
        {
            const brandsData=await getBrands();
            const productData=await getProductAdmin(productID);
            setBrands(brandsData);
            setProduct(productData);
        }
        fetchData();
    },[isOpen])

    async function onEditSubmit()
    {
        const editData=
        {
            Model:product,
            ProductID:productID
        }
        const response= await editProductInfo(editData);
        if (response.status===200)
        {
            setMessageOpen(true);
            onRefresh();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    function onAddChar()
    {
        product?.characteristics?.push({key:'', value:''})
        const newChars=[...product?.characteristics];
        setProduct({...product, characteristics:newChars})
    }

    function onClose()
    {
        setIsOpen(false);
    }
    return(
        <DialogRoot open={isOpen} size={'cover'} placement={'center'} scrollBehavior={'inside'}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменение продукта
                    </DialogTitle>
                    <DialogCloseTrigger onClick={()=> onClose()}/>
                </DialogHeader>
                <DialogBody>
                    <Flex w={'90%'} marginBottom={'10px'}>
                        <Stack marginTop={'5px'} marginRight={'15%'}>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Название</Text>
                            <Text fontWeight={'bold'} marginBottom={'125px'} fontSize={'3xl'}>Описание</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Бренд</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Категория</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Цена</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Изображение</Text>
                        </Stack>
                        <Stack w={'40%'}>
                            <Input value={product?.name} onChange={(e)=> setProduct({...product, name:e.target.value})} w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите название продукта"></Input>
                            <Textarea value={product?.desc} onChange={(e)=> setProduct({...product, desc:e.target.value})} resize={'none'} w={'100%'} h={'27%'} variant={'subtle'} marginBottom={'30px'} placeholder="Введите описание продукта"></Textarea>
                            <select value={product?.brandID} onChange={(e)=> setProduct({...product, brandID:e.target.value})} style={{height:'30px',width:'100%', marginBottom:'20px',borderRadius:'10px 10px 10px 10px', backgroundColor:'whitesmoke'}}>
                                <option value={"00000000-0000-0000-0000-000000000000"}>--Бренд--</option>
                                {brands.map(brand=>
                                    <option key={brand?.id} value={brand?.id}>{brand?.brandName}</option>
                                )}
                            </select>
                            <select value={product?.category} onChange={(e)=> setProduct({...product, category:e.target.value})} style={{height:'30px', width:'100%', marginBottom:'15px', borderRadius:'10px 10px 10px 10px', backgroundColor:'whitesmoke'}}>
                                <option value={-1}>--Категория--</option>
                                <option value={0}>Акустическая гитара</option>
                                <option value={1}>Электронная гитара</option>
                                <option value={2}>Пианино</option>
                                <option value={3}>Звуковая карта</option>
                                <option value={4}>MIDI-клавиатура</option>
                                <option value={5}>Монитор</option>
                                <option value={6}>Наушники</option>
                            </select>
                            <Input value={product?.price} onChange={(e)=> setProduct({...product, price:e.target.value})} type="number" step={0.01} w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите цену продукта"></Input>
                            <Input value={product?.imageURL||""} onChange={(e)=> setProduct({...product, imageURL:e.target.value})} w={'100%'} variant={'subtle'} marginBottom={'8px'} placeholder="Введите ссылку на изображение продукта"></Input>
                        </Stack>
                    </Flex>
                    <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Характеристики</Text>
                    {charRows}
                    <Center>
                        <Button w={'20%'} onClick={()=> onAddChar()}>Добавить</Button>
                    </Center>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> onEditSubmit()}>Подтвердить</Button>
                </DialogFooter>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Продукт был успешно изменен!"}/>

                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default EditProductDialogPage;