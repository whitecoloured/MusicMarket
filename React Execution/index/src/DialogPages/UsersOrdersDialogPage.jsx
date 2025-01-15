import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog.jsx"
import { Flex, Button } from "@chakra-ui/react";
import OrderCard from "../components/ui/ordercard.jsx";
import { deleteOrder } from "../../api.js";
import { useRef, useState } from "react";
import DialogConfirmation from "../components/ui/dialogconfirmation.jsx";
import DialogMessage from "../components/ui/dialogmessage.jsx";
import DialogErrorMessage from "../components/ui/dialogerrormessage.jsx";


function UsersOrdersDialogPage({orders, onRefreshOrders})
{
    const [messageOpen, setMessageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogMessage=useRef("");
    const dialogErrorMessage=useRef("");

    const currentOrderID=useRef("");

    async function onOrderDelete()
    {
        const response=await deleteOrder(currentOrderID?.current);
        if (response.status===200)
        {
            dialogMessage.current="Заказ был успешно удален!";
            setMessageOpen(true);
            await onRefreshOrders();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    return(
        <DialogRoot size="cover" placement="center" scrollBehavior={'inside'}>
            <DialogTrigger asChild>
                <Button backgroundColor={'#47BE7A'} w={'13%'}>Все заказы</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Все ваши заказы
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    {orders?.map(order=>
                        <OrderCard
                        key={order?.id}
                        id={order?.id}
                        name={order?.name}
                        price={order?.price}
                        imageURL={order?.imageURL}
                        orderDate={order?.orderDate}
                        orderReceived={order?.orderReceived}
                        setConfirmationOpen={()=>{
                            currentOrderID.current=order?.id;
                            setConfirmationOpen(true);
                        }}/>
                    )}
                </DialogBody>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={dialogMessage?.current}/>

                <DialogConfirmation
                isOpen={confirmationOpen}
                toggleOpen={setConfirmationOpen}
                confirmFunc={onOrderDelete}/>
                
                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>

            </DialogContent>
        </DialogRoot>
    )
}

export default UsersOrdersDialogPage;