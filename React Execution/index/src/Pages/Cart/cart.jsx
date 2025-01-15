import { Center, Container, Text } from '@chakra-ui/react';
import './cart.css'
import CartItem from '../../components/ui/cartitem';
import { useEffect, useRef, useState } from 'react';
import { getCartItems, addOrder, deleteCartItem } from '../../../api';
import DialogMessage from '../../components/ui/dialogmessage';
import DialogErrorMessage from '../../components/ui/dialogerrormessage';
import DialogConfirmation from '../../components/ui/dialogconfirmation';

function Cart()
{
    const [cartItems, setCartItems]=useState([]);

    const currentCartItemID=useRef("");
    const currentProductName=useRef("");

    const [confirmationOpen, setConfirmationOpen]=useState(false);
    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");
    const dialogMessage=useRef("");

    const isActionCompleting=useRef(false);


    async function onRefresh()
    {
        const addData=await getCartItems();
        setCartItems(addData);
        isActionCompleting.current=false;
    }
    async function onConfirmingOrder(productID,name)
    {
        const response = await addOrder(productID);
        if (response.status===200)
        {
            dialogMessage.current=`Заказ с ${name} был успешно оформлен!`;
            setMessageOpen(true);
            isActionCompleting.current=true;
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    async function onDeletingCartItem()
    {
        const response=await deleteCartItem(currentCartItemID?.current);
        if (response.status===200)
        {
            dialogMessage.current=`Продукт ${currentProductName?.current} был успешно удален с корзины!`
            setMessageOpen(true);
            isActionCompleting.current=true;
        }
        else
        {
            dialogErrorMessage.current=response?.message
            setErrorMessageOpen(true)
        }
    }

    useEffect(()=>
    {
        const fetchData=async()=>
        {
            const data= await getCartItems();
            setCartItems(data);
        }
        fetchData();
    }
    ,[]);

    if (!messageOpen && isActionCompleting?.current)
    {
        onRefresh();
    }
    return(
        <div className='cartPage'>
            <Center h={'15%'} marginBottom={'1%'}>
                <Text fontSize={'30px'} color={'white'} fontWeight={'bold'}>
                    Корзина
                </Text>
            </Center>
            {cartItems?.length>0?
            <Center alignItems={'normal'} h={'75%'}>
                <Container w={'90%'} h={'100%'}>
                    <div className='cartForm'>
                        {
                            cartItems.map(cartItem=>
                                <CartItem
                                key={cartItem?.id}
                                name={cartItem?.productName}
                                price={cartItem?.price}
                                imageURL={cartItem?.imageURL}
                                productID={cartItem?.productID}
                                setConfirmationOpen={()=>{
                                     setConfirmationOpen(true);
                                     currentCartItemID.current=cartItem?.id;
                                     currentProductName.current=cartItem?.productName;
                                    }}
                                onConfirmingOrder={onConfirmingOrder}/>
                            )
                        }

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
                        confirmFunc={onDeletingCartItem}/>
                    </div>
                </Container>
            </Center>:
            <Center h={'75%'}>
                <Center w={'75%'} borderRadius={'10px 10px 10px 10px'} backgroundColor={'white'} h={'100%'}>
                    <Text fontWeight={'bold'} fontSize={'40px'}>У вас нет товаров в корзине!</Text>
                </Center>
            </Center>
            }
        </div>
    )
}

export default Cart;