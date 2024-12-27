import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogActionTrigger
  } from "./dialog.jsx"
import { Button } from "@chakra-ui/react";

function DialogConfirmation({isOpen, toggleOpen, confirmFunc})
{
    function onConfirm()
    {
        confirmFunc();
        toggleOpen(false);
    }
    return(
        <DialogRoot open={isOpen} role="alertdialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Подтверждение
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    Вы уверены, что хотите продолжить?
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button colorPalette={'red'} onClick={()=> toggleOpen(false)}>Отменить</Button>
                    </DialogActionTrigger>
                    <Button colorPalette={'teal'} onClick={()=> onConfirm()}>Продолжить</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default DialogConfirmation;