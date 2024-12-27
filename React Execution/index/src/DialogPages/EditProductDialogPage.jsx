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

import Select from "../components/ui/select";
import CharacteristicRow from "../components/ui/characteristicrow";
import { Button, Flex, Input, Text, Stack, Center } from "@chakra-ui/react"
import { useState } from "react";
import DialogMessage from "../components/ui/dialogmessage";

function EditProductDialogPage({isOpen, setIsOpen})
{

    const [characteristics,setCharacteristics]=useState([]);

    const [messageOpen, setMessageOpen]=useState(false);

    const charRows=Array(characteristics.length).fill(null).map((_, index)=>
        <CharacteristicRow 
        key={index} 
        index={index}
        chars={characteristics}
        setChars={setCharacteristics}/>
    );


    function onAddChar()
    {
        characteristics.push({key:'', value:''})
        const newChars=[...characteristics];
        setCharacteristics(newChars);
    }

    return(
        <DialogRoot open={isOpen} size={'cover'} placement={'center'} scrollBehavior={'inside'}>
            <DialogTrigger asChild>
                <Button w={'35%'} marginRight={'2%'} backgroundColor={'#BE7E47'} onClick={()=> setIsOpen(true)}>Изменить</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменение продукта
                    </DialogTitle>
                    <DialogCloseTrigger onClick={()=> setIsOpen(false)}/>
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
                            <Input w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите название продукта"></Input>
                            <Input w={'100%'} h={'27%'} variant={'subtle'} marginBottom={'30px'} placeholder="Введите описание продукта"></Input>
                            <Select style={{width:'100%', marginBottom:'20px'}}>
                                <option value={-1}>--Бренд--</option>
                                <option value={"Yamaha"}>YAMAHA</option>
                                <option value={"AKG"}>AKG</option>
                            </Select>
                            <Select style={{width:'100%', marginBottom:'15px'}}>
                                <option value={-1}>--Категория--</option>
                                <option value={0}>Акустическая гитара</option>
                                <option value={1}>Электронная гитара</option>
                                <option value={2}>Пианино</option>
                                <option value={3}>Звуковая карта</option>
                                <option value={4}>MIDI-клавиатура</option>
                                <option value={5}>Монитор</option>
                                <option value={6}>Наушники</option>
                            </Select>
                            <Input w={'100%'} variant={'subtle'} marginBottom={'10px'} placeholder="Введите цену продукта"></Input>
                            <Input w={'100%'} variant={'subtle'} marginBottom={'8px'} placeholder="Введите ссылку на изображение продукта"></Input>
                        </Stack>
                    </Flex>
                    <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Характеристики</Text>
                    {charRows}
                    <Center>
                        <Button w={'20%'} onClick={()=> onAddChar()}>Добавить</Button>
                    </Center>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> setMessageOpen(true)}>Подтвердить</Button>
                </DialogFooter>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Продукт был успешно изменен!"}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default EditProductDialogPage;