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
import { Button, Input, Text } from "@chakra-ui/react"
import { editPassword } from "../../api";
import DialogMessage from "../components/ui/dialogmessage";
import DialogErrorMessage from "../components/ui/dialogerrormessage";

function EditPasswordDialogPage()
{

    const [passwordData, setPasswordData]=useState(
        {
            oldPassword:"",
            newPassword:""
        }
    )

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");

    async function onPasswordEdit()
    {
        const response = await editPassword(passwordData);
        if (response?.status===200)
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
        <DialogRoot placement={'center'}>
            <DialogTrigger asChild>
                <Button w={'15%'} size={'xl'} backgroundColor={'#BE7E47'} marginRight={'1.5%'}>Изменить пароль</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменение пароля
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    <Text fontSize={'25px'} fontWeight={'bold'} marginBottom={'4%'}>
                        Старый пароль
                    </Text>
                    <Input onChange={(e)=> setPasswordData({...passwordData, oldPassword:e.target.value})} w={'80%'} variant={'subtle'} type="password" placeholder="Введите старый пароль" marginBottom={'5%'}/>
                    <Text fontSize={'25px'} fontWeight={'bold'} marginBottom={'4%'}>
                        Новый пароль
                    </Text>
                    <Input onChange={(e)=> setPasswordData({...passwordData, newPassword:e.target.value})} w={'80%'} variant={'subtle'} type="password" placeholder="Введите новый пароль" marginBottom={'5%'}/>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> onPasswordEdit()}>Подтвердить</Button>
                </DialogFooter>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Пароль был успешно изменен!"}/>

                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default EditPasswordDialogPage;