import './adminpage.css'
import { Button, Center, Container, Flex, Input, Stack, Text } from '@chakra-ui/react';
import AdminPageProductItem from '../../components/ui/adminpageproductitem';
import { useEffect, useState, useRef } from 'react';
import AdminBrandRow from '../../components/ui/adminbrandrow';
import AddProductDialogPage from '../../DialogPages/AddProductDialogPage';
import AddBrandDialogPage from '../../DialogPages/AddBrandDialogPage';
import DialogConfirmation from '../../components/ui/dialogconfirmation';
import DialogMessage from '../../components/ui/dialogmessage';
import DialogErrorMessage from '../../components/ui/dialogerrormessage';
import { getBrands, getProductsAdmin, deleteProduct, deleteBrand, getUserRole } from '../../../api';
import { Navigate } from 'react-router';
import EditProductDialogPage from '../../DialogPages/EditProductDialogPage';

function AdminPage()
{
    const [searchInput, setSearchInput]=useState('');
    const [products, setProducts]=useState([]);
    const [brands,setBrands]=useState([]);

    const [isAddProductDialogPageOpen, setIsAddProductDialogPageOpen]=useState(false);
    const [isAddBrandDialogPageOpen, setIsAddBrandDialogPageOpen]=useState(false);
    const [isEditProductDialogPageOpen, setIsEditProductDialogPageOpen]=useState(false);
    const [confirmationOpen, setConfirmationOpen]=useState(false)
    const [messageOpen, setMessageOpen]=useState(false);
    const [errorMessageOpen, setErrorMessageOpen]=useState(false);

    const dialogErrorMessage=useRef("");
    const dialogMessage=useRef("");

    const currentProductID=useRef("");
    const currentBrandID=useRef("");

    const confirmFunc=useRef(null);

    const [role, setRole]=useState(null);


    useEffect(()=>
    {
        if (!localStorage.getItem("authToken"))
        {
            setRole("norole");
            return;
        }
        const fetchRole=async()=>
        {
            const roleData=await getUserRole();
            setRole(roleData);
        }
        fetchRole();
    },[])

    useEffect(()=>
    {
        if (role!=="Admin")
        {
            return;
        }
        const fetchBrands=async()=>
        {
            const brandsData=await getBrands();
            setBrands(brandsData);
        }
        fetchBrands();
    },[role])

    useEffect(()=>
    {
        if (role!=="Admin")
        {
            return;
        }
        const fetchProducts=async()=>
        {
            const filters=
            {
                searchName:searchInput
            }
            const productsData=await getProductsAdmin(filters);
            setProducts(productsData);
        }
        fetchProducts();
    },[searchInput,role])

    async function onProductRemove()
    {
        const response=await deleteProduct(currentProductID?.current);
        if (response.status===200)
        {
            dialogMessage.current="Продукт был успешно удален!"
            setMessageOpen(true);
            await onRefreshProducts();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    async function onBrandDelete()
    {
        const response=await deleteBrand(currentBrandID?.current);
        if (response.status===200)
        {
            dialogMessage.current="Бренд был удален!"
            setMessageOpen(true);
            await onRefreshBrands();
            await onRefreshProducts();
        }
        else
        {
            dialogErrorMessage.current=response?.message;
            setErrorMessageOpen(true);
        }
    }

    async function onRefreshBrands()
    {
        const addBrandsData=await getBrands();
        setBrands(addBrandsData);
    }

    async function onRefreshProducts()
    {
        const filters=
        {
            searchName:searchInput
        }
        const addProductsData=await getProductsAdmin(filters);
        setProducts(addProductsData);
    }
    
    return(
        <>
        {role==="Admin"?
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
                                {products?.map(product=>
                                    <AdminPageProductItem
                                    key={product?.id}
                                    id={product?.id}
                                    name={product?.productName}
                                    brandName={product?.brandName}
                                    imageURL={product?.imageURL}
                                    setEditPageOpen={()=>
                                    {
                                        currentProductID.current=product?.id;
                                        setIsEditProductDialogPageOpen(true);
                                    }
                                    }
                                    setConfirmationOpen={()=>{
                                        currentProductID.current=product?.id;
                                        confirmFunc.current=onProductRemove;
                                        setConfirmationOpen(true);
                                    }}/>
                                )}
                            </div>
                        </div>
                        <Stack w={'35%'}>
                            <AddProductDialogPage
                            isOpen={isAddProductDialogPageOpen}
                            setIsOpen={setIsAddProductDialogPageOpen}
                            onRefresh={onRefreshProducts}
                            brands={brands}/>
                            <AddBrandDialogPage
                            isOpen={isAddBrandDialogPageOpen}
                            setIsOpen={setIsAddBrandDialogPageOpen}
                            onRefresh={onRefreshBrands}/>
                            <div className='brandsForm'>
                                {brands?.map(brand=>
                                    <AdminBrandRow
                                    key={brand?.id}
                                    id={brand?.id}
                                    name={brand?.brandName}
                                    setConfirmationOpen={()=>{
                                        currentBrandID.current=brand?.id;
                                        confirmFunc.current=onBrandDelete;
                                        setConfirmationOpen(true);
                                    }}/>
                                )}
                            </div>
                        </Stack>
                    </Flex>
                </Container>

                <EditProductDialogPage
                productID={currentProductID?.current}
                isOpen={isEditProductDialogPageOpen}
                setIsOpen={setIsEditProductDialogPageOpen}
                onRefresh={onRefreshProducts}/>

                <DialogConfirmation
                isOpen={confirmationOpen} 
                toggleOpen={setConfirmationOpen} 
                confirmFunc={confirmFunc?.current}/>
                
                <DialogMessage
                isOpen={messageOpen}
                toggleOpen={setMessageOpen}
                message={dialogMessage?.current}/>

                <DialogErrorMessage
                isOpen={errorMessageOpen}
                toggleOpen={setErrorMessageOpen}
                message={dialogErrorMessage?.current}/>
            </Center>
        </div>:
        role&&<Navigate to={"/403forbidden"} replace/>}
        </>
    )
}

export default AdminPage;