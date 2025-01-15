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
import { useState, useRef } from "react"
import DialogConfirmation from "../components/ui/dialogconfirmation.jsx"
import DialogMessage from "../components/ui/dialogmessage.jsx"
import DialogErrorMessage from "../components/ui/dialogerrormessage.jsx"
import { editReviewInfo, deleteReview } from "../../api.js"


function UsersReviewsDialogPage({reviews, onRefreshReviews})
{
    const [messageOpen, setMessageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogMessage=useRef("");
    const dialogErrorMessage=useRef("");

    const currentReviewID=useRef("");

    async function onReviewEdit(editableData, id)
    {
        const data=
        {
            reviewModel:editableData,
            reviewID:id
        }
        const response=await editReviewInfo(data);
        if (response.status===200)
        {
            dialogMessage.current="Отзыв был успешно изменен!";
            setMessageOpen(true)
            await onRefreshReviews();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    async function onReviewDelete() {
        const response= await deleteReview(currentReviewID?.current);
        if (response.status===200)
        {
            dialogMessage.current="Отзыв был успешно удален!";
            setMessageOpen(true)
            await onRefreshReviews();
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
                <Button backgroundColor={'#47BE7A'} w={'13%'}>Все отзывы</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Все ваши отзывы
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    {reviews?.map(review=>
                        <ReviewCardSecondVariant
                        key={review?.id}
                        id={review?.id}
                        productName={review?.productName}
                        mark={review?.mark}
                        reviewDate={review?.reviewDate}
                        reviewDesc={review?.reviewDesc}
                        setConfirmationOpen={()=>{
                            currentReviewID.current=review?.id;
                            setConfirmationOpen(true);
                        }}
                        onReviewEdit={onReviewEdit}/>
                    )}
                </DialogBody>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={dialogMessage?.current}/>

                <DialogConfirmation
                isOpen={confirmationOpen}
                toggleOpen={setConfirmationOpen}
                confirmFunc={onReviewDelete}/>
                
                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default UsersReviewsDialogPage;