import { Center, Container, Text } from '@chakra-ui/react';
import './cart.css'
import CartItem from '../../components/ui/cartitem';
function Cart()
{
    return(
        <div className='cartPage'>
            <Center h={'15%'} marginBottom={'1%'}>
                <Text fontSize={'30px'} color={'white'} fontWeight={'bold'}>
                    Корзина
                </Text>
            </Center>
            <Center alignItems={'normal'} h={'75%'}>
                <Container w={'90%'} h={'100%'}>
                    <div className='cartForm'>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                    </div>
                </Container>
            </Center>
        </div>
    )
}

export default Cart;