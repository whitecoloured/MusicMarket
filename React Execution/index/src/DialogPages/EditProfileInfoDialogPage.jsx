import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react"
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
import { useState } from "react";
import DialogMessage from "../components/ui/dialogmessage"

function EditProfileInfoDialogPage({isOpen, setIsOpen})
{

    const [messageOpen, setMessageOpen]=useState(false);
    return(
        <DialogRoot isOpen={isOpen} size="cover" placement="center" scrollBehavior={"inside"}>
            <DialogTrigger asChild>
                <Button w={'35%'} size={'xl'} backgroundColor={'#BE7E47'} marginRight={'2%'} marginBottom={'4%'} onClick={()=> setIsOpen(true)}>Изменить данные</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменение профиля
                    </DialogTitle>
                    <DialogCloseTrigger onClick={()=> setIsOpen(false)}/>
                </DialogHeader>
                <DialogBody>
                    <Flex w={'90%'} marginBottom={'20px'}>
                        <Stack w={'30%'} marginTop={'10px'} marginRight={'15%'}>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Имя</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Фамилия</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Логин</Text>
                            <Text fontWeight={'bold'} marginBottom={'30px'} fontSize={'3xl'}>Пароль</Text>
                        </Stack>
                        <Stack w={'50%'} marginTop={'8px'}>
                            <Input marginBottom={'7px'} variant={'subtle'} placeholder="Введите ваше имя"/>
                            <Input marginBottom={'7px'} variant={'subtle'} placeholder="Введите вашу фамилию"/>
                            <Input marginBottom={'7px'} variant={'subtle'} placeholder="Введите ваш логин"/>
                            <Input type="password" marginBottom={'7px'} variant={'subtle'} placeholder="Введите ваш пароль"/>
                        </Stack>
                    </Flex>
                    <Text fontWeight={'bold'} marginBottom={'40px'} fontSize={'3xl'}>Адрес</Text>
                    <Flex w={'90%'}>
                        <Stack w={'25%'} marginRight={'5%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Тип улицы</Text>
                            <Input variant={'subtle'} placeholder="Тип улицы"/>
                        </Stack>
                        <Stack w={'25%'} marginRight={'5%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Название улицы</Text>
                            <Input variant={'subtle'} placeholder="Название улицы"/>
                        </Stack>
                        <Stack w={'25%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Номер улицы</Text>
                            <Input variant={'subtle'} placeholder="Номер улицы"/>
                        </Stack>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> setMessageOpen(true)}>Подтвердить</Button>
                </DialogFooter>
                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Профиль был успешно изменен!"}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default EditProfileInfoDialogPage;