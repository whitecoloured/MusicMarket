import { useRef, useState } from "react";
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
import { addBrand } from "../../api";
import DialogErrorMessage from "../components/ui/dialogerrormessage";

function AddBrandDialogPage({isOpen, setIsOpen, onRefresh})
{

    const[brandInput, setBrandInput]=useState('');

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");

    function onDialogPageClose()
    {
        setBrandInput('');
        setIsOpen(false);
        onRefresh();
    }

    async function onAddSubmit()
    {
        const brandObj=
        {
            brandName:brandInput
        }
        const response=await addBrand(brandObj);
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
                    <Button onClick={()=> onAddSubmit()}>Подтвердить</Button>
                </DialogFooter>
                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Бренд был успешно добавлен"}/>
                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default AddBrandDialogPage;