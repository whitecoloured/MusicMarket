import { Button, Card, Flex, Image, Stack, Text } from "@chakra-ui/react"
import DialogConfirmation from './dialogconfirmation'
import DialogMessage from './dialogmessage'
import { useState } from "react";
import EditProductDialogPage from "../../DialogPages/EditProductDialogPage";

function AdminPageProductItem()
{
    const [confirmationOpen, setConfirmationOpen]=useState(false)
    const [messageOpen, setMessageOpen]=useState(false);

    const[isEditProductDialogPageOpen, setIsEditProductDialogPageOpen]=useState(false);

    function onProductRemove()
    {
        setMessageOpen(true);
    }
    return(
        <Card.Root marginBottom={'1%'}>
            <Card.Body>
                <Flex>
                    <Image h={'30%'} w={'18%'} src="https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg" marginRight={'5%'}/>
                    <Stack w={'67%'}>
                        <Text fontWeight={'bold'} fontSize={'36px'} marginBottom={'-1.5%'}>ProductName</Text>
                        <Text fontSize={'14px'} marginBottom={'2%'} fontWeight={'bold'}>Brand</Text>
                        <Flex>
                            <EditProductDialogPage
                            isOpen={isEditProductDialogPageOpen}
                            setIsOpen={setIsEditProductDialogPageOpen}/>
                            <Button w={'38%'} backgroundColor={'#DE3B3B'} onClick={()=> setConfirmationOpen(true)}>Удалить</Button>
                        </Flex>
                    </Stack>
                    
                    <DialogConfirmation
                    isOpen={confirmationOpen} 
                    toggleOpen={setConfirmationOpen} 
                    confirmFunc={onProductRemove}/>
                    
                    <DialogMessage
                    isOpen={messageOpen}
                    toggleOpen={setMessageOpen}
                    message={"Продукт был удален!"}/>
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}
export default AdminPageProductItem;