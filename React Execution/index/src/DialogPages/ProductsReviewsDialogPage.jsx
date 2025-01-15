import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog.jsx"
import { Text, Flex, Button } from "@chakra-ui/react"
import ReviewCardFirstVariant from "../components/ui/reviewcards/reviewcardfirstvariant"
import { useRef, useState } from "react"
import { getProductsReviews, deleteReview, editReviewInfo } from "../../api.js"
import DialogMessage from "../components/ui/dialogmessage.jsx"
import DialogErrorMessage from "../components/ui/dialogerrormessage.jsx"
import DialogConfirmation from "../components/ui/dialogconfirmation.jsx"

function ProductsReviewsDialogPage({reviews,setReviews,productID, onRefreshReviews})
{
    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false);

    const dialogMessage=useRef("");
    const dialogErrorMessage=useRef("");

    const currentRemovableReviewID=useRef("");

    async function onSortChange(e)
    {
        const[OrderByAsc, SortItem]=e.target.value.split(',')
        const filters={
            sortItem:SortItem,
            orderByAsc:OrderByAsc
        }
        const addReviewsData=await getProductsReviews(productID, filters);
        setReviews(addReviewsData);
    }

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
            dialogMessage.current="Отзыв был успешно изменен!"
            setMessageOpen(true);
            await onRefreshReviews();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }

    }

    async function onReviewDelete()
    {
        const response=await deleteReview(currentRemovableReviewID?.current);
        if (response.status===200)
        {
            dialogMessage.current="Отзыв был успешно удален!"
            setMessageOpen(true);
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
                <Button size={'xl'} w={'20%'} backgroundColor={'#2287B5'}>Все отзывы</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Text fontWeight={'bold'}>Все отзывы о продукте</Text>
                    </DialogTitle>
                    <Flex justifyContent={'flex-end'}>
                        <select onChange={(e)=> onSortChange(e)} style={{height:'35px', width:'30%', border:'1px solid black', borderRadius:'10px 10px 10px 10px' }}>
                            <option value={[false, 'date']}>Сортировать по дате {'(по убыванию)'}</option>
                            <option value={[true,'date']}>Сортировать по дате {'(по возрастанию)'}</option>
                            <option value={[false, 'mark']}>Сначала положительные</option>
                            <option value={[true, 'mark']}>Сначала отрицательные</option>
                        </select>
                    </Flex>
                    <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                {reviews?.map(review=>
                    <ReviewCardFirstVariant 
                    key={review?.id}
                    name={review?.name}
                    surname={review?.surname}
                    mark={review?.mark}
                    reviewDate={review?.reviewDate}
                    reviewDesc={review?.reviewDesc}
                    doesBelongToUser={review?.doesBelongToUser}
                    setConfirmationOpen={()=>{
                        currentRemovableReviewID.current=review?.id;
                        setConfirmationOpen(true);
                    }}
                    onReviewEdit={onReviewEdit}/>
                )}
                </DialogBody>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={dialogMessage?.current}/>

                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>

                <DialogConfirmation
                isOpen={confirmationOpen}
                toggleOpen={setConfirmationOpen}
                confirmFunc={onReviewDelete}/>

            </DialogContent>
        </DialogRoot>
    )
}

export default ProductsReviewsDialogPage;