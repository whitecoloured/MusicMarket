import { useState } from "react";
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

import { Button, Flex, Input, Text } from "@chakra-ui/react"
import DialogMessage from "../components/ui/dialogmessage";

function AddBrandDialogPage({isOpen, setIsOpen})
{

    const[brandInput, setBrandInput]=useState('');

    const [messageOpen, setMessageOpen]=useState(false);

    function onDialogPageClose()
    {
        setBrandInput('');
        setIsOpen(false);
    }
    return(
        <DialogRoot open={isOpen} placement={'center'}>
            <DialogTrigger asChild>
                <Button backgroundColor={'#4AC46D'} marginBottom={'10px'} onClick={()=> setIsOpen(true)}>Добавить бренд</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Добавление бренда
                    </DialogTitle>
                    <DialogCloseTrigger onClick={()=> onDialogPageClose()}/>
                </DialogHeader>
                <DialogBody>
                    <Flex>
                        <Text fontWeight={'bold'} fontSize={'2xl'} marginTop={'10px'} marginRight={'5%'}>Название: </Text>
                        <Input value={brandInput} variant={'subtle'} w={'65%'} placeholder="Название бренда" onChange={(e)=> setBrandInput(e.target.value)}/>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> setMessageOpen(true)}>Подтвердить</Button>
                </DialogFooter>
                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Бренд был успешно добавлен"}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default AddBrandDialogPage;