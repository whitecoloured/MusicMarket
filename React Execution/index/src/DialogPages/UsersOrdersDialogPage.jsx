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


function UsersOrdersDialogPage()
{
    return(
        <DialogRoot size="cover" placement="center" scrollBehavior={'inside'}>
            <DialogTrigger asChild>
                <Flex justifyContent={'flex-end'} marginBottom={'3%'}>
                    <Button backgroundColor={'#47BE7A'} w={'13%'}>Все заказы</Button>
                </Flex>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Все ваши заказы
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}

export default UsersOrdersDialogPage;