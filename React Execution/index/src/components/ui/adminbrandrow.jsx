import { Button, Center, Flex, Text } from "@chakra-ui/react";
import DialogConfirmation from "./dialogconfirmation";
import { useState } from "react";
import DialogMessage from "./dialogmessage";

function AdminBrandRow()
{
    const [confirmationOpen, setConfirmationOpen]=useState(false)
    const [messageOpen, setMessageOpen]=useState(false);

    function onBrandDelete()
    {
        setMessageOpen(true);
    }
    return(
        <Center h={'20%'} borderBottom={'1px solid rgba(0, 0, 0, 0.09)'}>
            <Flex w={'85%'} justifyContent={'space-between'}>
                <Text fontSize={'20px'} marginTop={'6px'} fontWeight={'bold'}>Brand</Text>
                <Button backgroundColor={'#DE3B3B'} w={'35%'} onClick={()=> setConfirmationOpen(true)}>Удалить</Button>
                <DialogConfirmation
                isOpen={confirmationOpen}
                toggleOpen={setConfirmationOpen}
                confirmFunc={onBrandDelete}/>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={"Бренд был удален!"}/>
            </Flex>
        </Center>
    )
}
export default AdminBrandRow;