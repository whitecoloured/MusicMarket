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

function DialogMessage({message, isOpen, toggleOpen})
{
    return(
        <DialogRoot open={isOpen} role="alertdialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Успех!
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {message}
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant={'subtle'} onClick={()=> toggleOpen(false)}>OK</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default DialogMessage;