import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog.jsx"
import { Button, Flex } from "@chakra-ui/react"
import ReviewCardSecondVariant from "../components/ui/reviewcards/reviewcardsecondvariant.jsx"


function UsersReviewsDialogPage()
{
    return(
        <DialogRoot size="cover" placement="center" scrollBehavior={'inside'}>
            <DialogTrigger asChild>
                <Flex justifyContent={'flex-end'} marginBottom={'5%'}>
                    <Button backgroundColor={'#47BE7A'} w={'13%'}>Все отзывы</Button>
                </Flex>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Все ваши отзывы
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                        <ReviewCardSecondVariant/>
                        <ReviewCardSecondVariant/>
                        <ReviewCardSecondVariant/>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}

export default UsersReviewsDialogPage;