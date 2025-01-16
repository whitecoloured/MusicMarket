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
import { useEffect, useRef, useState } from "react";
import DialogMessage from "../components/ui/dialogmessage"
import { editUserInfo } from "../../api";
import DialogErrorMessage from "../components/ui/dialogerrormessage";

function EditProfileInfoDialogPage({isOpen, setIsOpen, initialUserData, refreshUserData})
{

    const [profileData, setProfileData]=useState(initialUserData);

    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");


    useEffect(()=>
    {
        setProfileData(initialUserData);
    },[isOpen===true])

    async function onProfileEdit()
    {
        const response=await editUserInfo(profileData);
        if (response?.status===200)
        {
            setMessageOpen(true);
            await refreshUserData();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    console.log(profileData);
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
                        </Stack>
                        <Stack w={'50%'} marginTop={'8px'}>
                            <Input defaultValue={profileData?.name} onChange={(e)=> setProfileData({...profileData, name:e.target.value})} marginBottom={'7px'} variant={'subtle'} placeholder="Введите ваше имя"/>
                            <Input defaultValue={profileData?.surname} onChange={(e)=> setProfileData({...profileData, surname:e.target.value})} marginBottom={'7px'} variant={'subtle'} placeholder="Введите вашу фамилию"/>
                            <Input defaultValue={profileData?.login} onChange={(e)=> setProfileData({...profileData, login:e.target.value})} marginBottom={'7px'} variant={'subtle'} placeholder="Введите ваш логин"/>
                        </Stack>
                    </Flex>
                    <Text fontWeight={'bold'} marginBottom={'40px'} fontSize={'3xl'}>Адрес</Text>
                    <Flex w={'90%'}>
                        <Stack w={'25%'} marginRight={'5%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Тип улицы</Text>
                            <select onChange={(e)=> setProfileData(prevData=> ({...prevData, address:{...prevData.address, streetType:e.target.value}}))} defaultValue={profileData?.address?.streetType} style={{backgroundColor:'whitesmoke', width:'100%', height:'40px', borderRadius:'10px 10px 10px 10px'}}>
                                    <option value={0}>улица</option>
                                    <option value={1}>переулок</option>
                                    <option value={2}>площадь</option>
                                    <option value={3}>проспект</option>
                            </select>
                        </Stack>
                        <Stack w={'25%'} marginRight={'5%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Название улицы</Text>
                            <Input onChange={(e)=> setProfileData(prevData=> ({...prevData, address:{...prevData.address, streetName:e.target.value}}))} defaultValue={profileData?.address?.streetName} variant={'subtle'} placeholder="Название улицы"/>
                        </Stack>
                        <Stack w={'25%'}>
                            <Text fontWeight={'bold'} marginBottom={'15px'} fontSize={'3xl'}>Номер улицы</Text>
                            <Input onChange={(e)=> setProfileData(prevData=> ({...prevData, address:{...prevData.address, streetNumber:e.target.value}}))} defaultValue={profileData?.address?.streetNumber} variant={'subtle'} placeholder="Номер улицы"/>
                        </Stack>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=> onProfileEdit()}>Подтвердить</Button>
                </DialogFooter>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Профиль был успешно изменен!"}/>

                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default EditProfileInfoDialogPage;