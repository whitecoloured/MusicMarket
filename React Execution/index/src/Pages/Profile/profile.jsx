import { Center, Container,Stack, Text, Button } from "@chakra-ui/react";
import "./profile.css"
import ReviewCardSecondVariant from "../../components/ui/reviewcards/reviewcardsecondvariant";
import OrderCard from "../../components/ui/ordercard";
import UsersReviewsDialogPage from "../../DialogPages/UsersReviewsDialogPage";
import UsersOrdersDialogPage from "../../DialogPages/UsersOrdersDialogPage";

function Profile()
{
    return(
        <div className="profilePageForm">
            <Center h={"8%"}>
                <Text fontWeight={'bold'} fontSize={'30px'} color={'white'}>Профиль</Text>
            </Center>
            <Center>
                <Container>
                    <Stack wordSpacing={'6px'} marginBottom={'2%'}>
                        <Text fontSize={'20px'} color={'white'}>Имя: Имя</Text>
                        <Text fontSize={'20px'} color={'white'}>Фамилия: Фамилия</Text>
                        <Text fontSize={'20px'} color={'white'}>Адрес: Адрес</Text>
                        <Text fontSize={'20px'} color={'white'}>Почта: Почта</Text>
                    </Stack>
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'white'} marginBottom={'1.5%'}>Самый последний заказ</Text>
                    <OrderCard/>
                    <UsersOrdersDialogPage/>
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'white'} marginBottom={'1.5%'}>Самый последний отзыв</Text>
                    <ReviewCardSecondVariant/>
                    <UsersReviewsDialogPage/>
                    <Center>
                        <Button w={'35%'} size={'xl'} backgroundColor={'#BE7E47'} marginRight={'2%'}>Изменить данные</Button>
                        <Button w={'35%'} size={'xl'} backgroundColor={'#DE3B3B'}>Удалить профиль</Button>
                    </Center>
                </Container>
            </Center>
        </div>
    )
}

export default Profile;