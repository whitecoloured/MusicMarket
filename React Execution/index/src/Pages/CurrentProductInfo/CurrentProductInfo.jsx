import { Center, Container, Flex, Image, Text, Stack, Button, Input, Textarea} from '@chakra-ui/react';

import './currentproductinfo.css'
import CharacteristicsTable from '../../components/ui/characteristicstable';
import Star from '../../components/ui/stars/Star.png'
import FilledStar from '../../components/ui/stars/filledstar.png'
import ReviewCardFirstVariant from '../../components/ui/reviewcards/reviewcardfirstvariant';
import ProductsReviewsDialogPage from '../../DialogPages/ProductsReviewsDialogPage';
import { useEffect, useRef, useState } from 'react';
import { addProductToCart, addReview, getProduct, getTopThreeReviews, editReviewInfo, deleteReview, getProductsReviews } from '../../../api';
import DialogMessage from '../../components/ui/dialogmessage';
import DialogErrorMessage from '../../components/ui/dialogerrormessage';
import DialogConfirmation from '../../components/ui/dialogconfirmation';
import { NavLink, useParams } from 'react-router';

function CurrentProductInfo()
{


    const [product, setProduct]=useState({});
    const [allReviews, setAllReviews]=useState([]);
    const [threeReviews, setThreeReviews]=useState([]);

    const[currentReview, setCurrentReview]=useState({
        mark:0,
        reviewDesc:null
    });

    const productID=useParams().productID;

    useEffect(()=>
    {
        const fetchData=async()=>
        {
            const productData=await getProduct(productID)
            const reviewsData=await getProductsReviews(productID, {sortItem:'date',orderByAsc:false});
            setProduct(productData);
            setAllReviews(reviewsData);
            setThreeReviews(reviewsData?.slice(0,3));
        };
        fetchData();
    },[])

    const [errorMessageOpen, setErrorMessageOpen]=useState(false);
    const [messageOpen, setMessageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false);

    const dialogMessage=useRef("");
    const dialogErrorMessage=useRef("");

    const currentRemovableReviewID=useRef("");

    async function onSubmitAddToCart()
    {
        const response=await addProductToCart(productID);
        if (response?.status===200)
        {
            dialogMessage.current=`Продукт ${product?.name} был успешно добавлен в корзину!`;
            setMessageOpen(true);
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    async function onSubmitReview()
    {
        const response=await addReview(currentReview,productID);
        if (response.status===200)
        {
            dialogMessage.current=`Отзыв был успешно оставлен!`;
            setMessageOpen(true);
            await onRefreshReviews();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
        setCurrentReview(
            {
                mark:0,
                reviewDesc:""
            }
        )
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

    async function onRefreshReviews()
    {
        const reviewsData=await getProductsReviews(productID, {sortItem:'date',orderByAsc:false});
        setAllReviews(reviewsData)
        setThreeReviews(reviewsData?.slice(0,3));
    }
    
    return(
        <div className="curProductInfoForm">
            <Center>
                <Container w={'98%'}>
                    <NavLink to={'/catalogue'} style={{fontSize:'30px', color:'white',display:'inline-block', marginTop:'0.6%', marginBottom:'2%'}}>
                        {'<'}Назад
                    </NavLink>
                    <Flex marginBottom={'2%'}>
                        <Image w={'25%'} src={product?.imageURL} marginRight={'15%'}/>
                        <Stack>
                            <Text marginBottom={'0.3%'} color={'white'} fontWeight={'bold'}>
                                {product?.brandName}
                            </Text>
                            <Text marginBottom={'5%'} color={'white'} fontSize={'40px'} fontWeight={'bold'}>
                                {product?.name}
                            </Text>
                            <Text marginBottom={'20%'} color={'white'} fontSize={'40px'}>
                                Цена: ${product?.price}
                            </Text>
                            <Button onClick={()=> onSubmitAddToCart()} backgroundColor={'#4AC46D'} size={'xl'}>
                                В корзину
                            </Button>
                        </Stack>
                    </Flex>
                    <Text fontSize={'22px'} color={'white'} marginBottom={'4%'}>
                        Описание: {product?.desc}
                    </Text>
                    <Text fontSize={'25px'} color={'white'} marginBottom={'1.5%'}>
                        Характеристики:
                    </Text>
                    <CharacteristicsTable characteristics={product?.characteristics}/>
                    <Text fontSize={'25px'} color={'white'} marginBottom={'1%'}>
                        Отзывы
                    </Text>
                    <Flex justifyContent={'flex-end'} marginBottom={'2%'}>
                        <Center backgroundColor={'white'} h={'70px'} borderRadius={'5px 5px 5px 5px'}>
                            <Flex>
                                {Array(5).fill(null).map((_, index)=>
                                    <Image key={index} h={'50px'} cursor={'pointer'} src={index<currentReview.mark?FilledStar:Star} onClick={()=> setCurrentReview({...currentReview, mark:index+1})}/>
                                )}
                            </Flex>
                        </Center>
                    </Flex>
                    <Textarea value={currentReview?.reviewDesc||""} backgroundColor={'white'} h={'120px'} overflowY={'scroll'} marginBottom={'0.5%'} placeholder='Напиши свой отзыв!' onChange={(e)=> setCurrentReview({...currentReview, reviewDesc:e.target.value})}/>
                    <Button colorPalette={'teal'} marginBottom={'1.5%'} w={'30%'} onClick={()=> onSubmitReview()}>Отправить</Button>
                    {threeReviews?.map(review=>
                        <ReviewCardFirstVariant 
                        key={review?.id}
                        id={review?.id}
                        name={review?.name}
                        surname={review?.surname}
                        mark={review?.mark}
                        reviewDate={review?.reviewDate}
                        reviewDesc={review?.reviewDesc}
                        doesBelongToUser={review?.doesBelongToUser}
                        onReviewEdit={onReviewEdit}
                        setConfirmationOpen={()=>
                        {
                            currentRemovableReviewID.current=review?.id;
                            setConfirmationOpen(true);
                        }
                        }/>
                    )}
                    {allReviews?.length>3&&
                    <Center marginBottom={'3%'}>
                        <ProductsReviewsDialogPage reviews={allReviews} setReviews={setAllReviews} productID={productID} onRefreshReviews={onRefreshReviews}/>
                    </Center>}
                </Container>

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

            </Center>
        </div>
    )
}

export default CurrentProductInfo;