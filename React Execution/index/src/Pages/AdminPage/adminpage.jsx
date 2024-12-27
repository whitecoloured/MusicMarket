import './adminpage.css'
import { Button, Center, Container, Flex, Input, Stack, Text } from '@chakra-ui/react';
import AdminPageProductItem from '../../components/ui/adminpageproductitem';
import { useState } from 'react';
import AdminBrandRow from '../../components/ui/adminbrandrow';
import AddProductDialogPage from '../../DialogPages/AddProductDialogPage';
import AddBrandDialogPage from '../../DialogPages/AddBrandDialogPage';

function AdminPage()
{
    const [searchInput, setSearchInput]=useState('');

    const [isAddProductDialogPageOpen, setIsAddProductDialogPageOpen]=useState(false);
    const [isAddBrandDialogPageOpen, setIsAddBrandDialogPageOpen]=useState(false);
    return(
        <div className='adminPageForm'>
            <Center h={'15%'} marginBottom={'1%'}>
                <Text fontSize={'30px'} color={'white'} fontWeight={'bold'}>
                    Страница админа
                </Text>
            </Center>
            <Center alignItems={'normal'} h={'75%'}>
                <Container h={'100%'}>
                    <Flex h={'100%'}>
                        <div className='productsForm'>
                            <Input value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} h={'10%'} variant={'subtle'} placeholder='Название продукта...'></Input>
                            <div style={{height:'90%', overflowY:'scroll'}}>
                                <AdminPageProductItem/>
                                <AdminPageProductItem/>
                                <AdminPageProductItem/>
                                <AdminPageProductItem/>
                            </div>
                        </div>
                        <Stack w={'35%'}>
                            <AddProductDialogPage
                            isOpen={isAddProductDialogPageOpen}
                            setIsOpen={setIsAddProductDialogPageOpen}/>
                            <AddBrandDialogPage
                            isOpen={isAddBrandDialogPageOpen}
                            setIsOpen={setIsAddBrandDialogPageOpen}/>
                            <div className='brandsForm'>
                                <AdminBrandRow/>
                                <AdminBrandRow/>
                                <AdminBrandRow/>
                                <AdminBrandRow/>
                                <AdminBrandRow/>
                                <AdminBrandRow/>
                            </div>
                        </Stack>
                    </Flex>
                </Container>
            </Center>
        </div>
    )
}

export default AdminPage;