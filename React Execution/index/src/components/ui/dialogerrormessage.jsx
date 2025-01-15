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

function DialogErrorMessage({message, isOpen, toggleOpen})
{
    return(
        <DialogRoot open={isOpen} role="alertdialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ошибка!
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {message}
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button colorPalette={'red'} onClick={()=> toggleOpen(false)}>OK!</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default DialogErrorMessage;