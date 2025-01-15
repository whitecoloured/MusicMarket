import { Center, Container,Stack, Text, Button, Flex } from "@chakra-ui/react";
import "./profile.css"
import ReviewCardSecondVariant from "../../components/ui/reviewcards/reviewcardsecondvariant";
import OrderCard from "../../components/ui/ordercard";
import UsersReviewsDialogPage from "../../DialogPages/UsersReviewsDialogPage";
import UsersOrdersDialogPage from "../../DialogPages/UsersOrdersDialogPage";
import { useEffect, useRef, useState } from "react";
import EditProfileInfoDialogPage from "../../DialogPages/EditProfileInfoDialogPage";
import DialogMessage from "../../components/ui/dialogmessage";
import DialogConfirmation from "../../components/ui/dialogconfirmation"
import DialogErrorMessage from "../../components/ui/dialogerrormessage"
import { deleteUser, getUserInfo, getUsersOrders, getUsersReviews, deleteOrder, deleteReview, editReviewInfo } from "../../../api";
import { Navigate, useNavigate } from "react-router";
function Profile()
{

    const [userData, setUserData]=useState({});

    const [usersReviews, setUsersReviews]=useState([]);
    const [usersOrders, setUsersOrders]=useState([]);

    let lastOrder=usersOrders[0]||undefined;
    let lastReview=usersReviews[0]||undefined;

    const currentOrderID=useRef("");
    const currentReviewID=useRef("");

    const [isEditDialogPageOpen, setIsEditDialogPageOpen]=useState(false);
    const [messageOpen, setMessageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");
    const dialogMessage=useRef("");

    const confirmFunc=useRef(null);

    const navigate=useNavigate();


    useEffect(()=>
    {
        if (!localStorage.getItem("authToken"))
        {
            return;
        }
        const fetchData=async()=>
        {
            const profileData=await getUserInfo();
            const ordersData=await getUsersOrders();
            const reviewsData=await getUsersReviews();
            setUserData(profileData);
            setUsersOrders(ordersData);
            setUsersReviews(reviewsData);
        }
        fetchData();
    },[])

    function onLogout()
    {
        localStorage.removeItem("authToken");
        navigate("/")
    }
    async function onProfileDelete()
    {
        const response =await deleteUser();
        if (response.status===200)
        {
            onLogout();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

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

    async function onRefreshOrders()
    {
        const addOrdersData=await getUsersOrders();
        setUsersOrders(addOrdersData);
    }

    async function onRefreshReviews()
    {
        const addReviewsData=await getUsersReviews();
        setUsersReviews(addReviewsData);
    }
    return(
        <>
        {localStorage.getItem("authToken")?
        <div className="profilePageForm">
            <Center h={"8%"}>
                <Text fontWeight={'bold'} fontSize={'30px'} color={'white'}>Профиль</Text>
            </Center>
            <Center>
                <Container>
                    <Stack wordSpacing={'6px'} marginBottom={'2%'}>
                        <Text fontSize={'20px'} color={'white'}>Имя: {userData?.name}</Text>
                        <Text fontSize={'20px'} color={'white'}>Фамилия: {userData?.surname}</Text>
                        <Text fontSize={'20px'} color={'white'}>Логин: {userData?.login}</Text>
                        <Text fontSize={'20px'} color={'white'}>Адрес: {userData?.address}</Text>
                        <Text fontSize={'20px'} color={'white'}>Почта: {userData?.email}</Text>
                    </Stack>
                    <Flex justifyContent={'flex-end'}>
                        <Button w={'20%'} size={'xl'} backgroundColor={'#DE3B3B'} onClick={()=> onLogout()}>Выйти</Button>
                    </Flex>
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'white'} marginBottom={'1.5%'}>Самый последний заказ</Text>
                    {usersOrders.length>0?
                    <>
                    <OrderCard
                    key={lastOrder?.id}
                    id={lastOrder?.id}
                    name={lastOrder?.name}
                    orderDate={lastOrder?.orderDate}
                    orderReceived={lastOrder?.orderReceived}
                    price={lastOrder?.price}
                    imageURL={lastOrder?.imageURL}
                    setConfirmationOpen={()=> {
                        currentOrderID.current=lastOrder?.id
                        confirmFunc.current=onOrderDelete;
                        setConfirmationOpen(true);
                        
                    }
                    }/>
                    <Flex justifyContent={'flex-end'} marginBottom={'3%'}>
                        <UsersOrdersDialogPage orders={usersOrders} onRefreshOrders={onRefreshOrders}/>
                    </Flex>
                    </>:
                    <div className="emptyCard">
                        <label>Нет заказов!</label>
                    </div>}
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'white'} marginBottom={'1.5%'}>Самый последний отзыв</Text>
                    {usersReviews.length>0?
                    <>
                    <ReviewCardSecondVariant
                    key={lastReview?.id}
                    id={lastReview?.id}
                    productName={lastReview?.productName}
                    mark={lastReview?.mark}
                    reviewDesc={lastReview?.reviewDesc}
                    reviewDate={lastReview?.reviewDate}
                    setConfirmationOpen={()=> {
                        currentReviewID.current=lastReview?.id;
                        confirmFunc.current=onReviewDelete;
                        setConfirmationOpen(true);
                    }}
                    onReviewEdit={onReviewEdit}/>
                    <Flex justifyContent={'flex-end'} marginBottom={'5%'}>
                        <UsersReviewsDialogPage reviews={usersReviews} onRefreshReviews={onRefreshReviews}/>
                    </Flex>
                    </>:
                    <div className="emptyCard">
                        <label>Нет отзывов!</label>
                    </div>}
                    <Center>
                        <EditProfileInfoDialogPage
                        isOpen={isEditDialogPageOpen}
                        setIsOpen={setIsEditDialogPageOpen}/>
                        <Button w={'35%'} size={'xl'} backgroundColor={'#DE3B3B'} marginBottom={'4%'} 
                        onClick={()=> {
                        confirmFunc.current=onProfileDelete;
                        setConfirmationOpen(true)
                        }
                        }>
                        Удалить профиль
                        </Button>
                    </Center>
                </Container>

                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={dialogMessage?.current}/>

                <DialogConfirmation
                isOpen={confirmationOpen}
                toggleOpen={setConfirmationOpen}
                confirmFunc={confirmFunc?.current}/>
                
                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </Center>
        </div>:
        <Navigate to={"/401unauthorized"} replace/>}
        </>
    )
}

export default Profile;