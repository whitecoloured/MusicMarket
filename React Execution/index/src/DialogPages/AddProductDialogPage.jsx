
import { Button, Center, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react"
import {
    DialogBody,
    DialogTrigger,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogActionTrigger
  } from "../components/ui/dialog"
import { useEffect, useRef, useState } from "react";
import DialogMessage from "../components/ui/dialogmessage";
import DialogErrorMessage from "../components/ui/dialogerrormessage";
import CharacteristicRow from "../components/ui/characteristicrow";
import { addProduct, getBrands } from "../../api";


function AddProductDialogPage({isOpen, setIsOpen, onRefresh, brands})
{

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");

    const [product, setProduct]=useState(
        {
            name:null,
            desc:null,
            category:-1,
            brandID:"00000000-0000-0000-0000-000000000000",
            price:null,
            characteristics:[],
            imageURL:null
        }
    )



    const charRows=Array(product?.characteristics?.length).fill(null).map((_, index)=>
        <CharacteristicRow 
        key={index} 
        index={index}
        chars={product?.characteristics}
        setChars={setProduct}/>
    );


    function onAddChar()
    {
        product?.characteristics?.push({key:'', value:''})
        const newChars=[...product?.characteristics];
        setProduct({...product, characteristics:newChars});
    }

    function onDialogPageClose()
    {
        setProduct(
            {
                name:null,
                desc:null,
                category:-1,
                brandID:"00000000-0000-0000-0000-000000000000",
                price:null,
                characteristics:[],
                imageURL:null
            }
        )
        setIsOpen(false);
        onRefresh();
    }

    async function onConfirm()
    {
        const data= {
            model:product
        }
        const response=await addProduct(data);
        if (response.status===200)
        {
            setMessageOpen(true);
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }


    return(
        <DialogRoot open={isOpen} size="cover" placement="center" scrollBehavior="inside">
            <DialogTrigger asChild>
                <Button backgroundColor={'#4AC46D'} marginBottom={'70px'} onClick={()=> setIsOpen(true)}>Добавить продукт</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Добавление продукта
                    </DialogTitle>
                    <DialogCloseTrigger onClick={()=> onDialogPageClose()}/>
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
                            <Input onChange={(e)=> setProduct({...product, name:e.target.value})} w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите название продукта"></Input>
                            <Textarea onChange={(e)=> setProduct({...product, desc:e.target.value})} resize={'none'} w={'100%'} h={'27%'} variant={'subtle'} marginBottom={'30px'} placeholder="Введите описание продукта"></Textarea>
                            <select onChange={(e)=> setProduct({...product, brandID:e.target.value})} style={{height:'30px',width:'100%', marginBottom:'20px',borderRadius:'10px 10px 10px 10px', backgroundColor:'whitesmoke'}}>
                                <option value={"00000000-0000-0000-0000-000000000000"}>--Бренд--</option>
                                {brands.map(brand=>
                                    <option key={brand?.id} value={brand?.id}>{brand?.brandName}</option>
                                )}
                            </select>
                            <select onChange={(e)=> setProduct({...product, category:e.target.value})} style={{height:'30px', width:'100%', marginBottom:'15px', borderRadius:'10px 10px 10px 10px', backgroundColor:'whitesmoke'}}>
                                <option value={-1}>--Категория--</option>
                                <option value={0}>Акустическая гитара</option>
                                <option value={1}>Электронная гитара</option>
                                <option value={2}>Пианино</option>
                                <option value={3}>Звуковая карта</option>
                                <option value={4}>MIDI-клавиатура</option>
                                <option value={5}>Монитор</option>
                                <option value={6}>Наушники</option>
                            </select>
                            <Input onChange={(e)=> setProduct({...product, price:e.target.value})} type="number" step={0.01} w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите цену продукта"></Input>
                            <Input onChange={(e)=> setProduct({...product, imageURL:e.target.value})} w={'100%'} variant={'subtle'} marginBottom={'8px'} placeholder="Введите ссылку на изображение продукта"></Input>
                        </Stack>
                    </Flex>
                    <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Характеристики</Text>
                    {charRows}
                    <Center>
                        <Button w={'20%'} onClick={()=> onAddChar()}>Добавить</Button>
                    </Center>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> onConfirm()}>Подтвердить</Button>
                </DialogFooter>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Продукт был успешно добавлен!"}/>
                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default AddProductDialogPage;