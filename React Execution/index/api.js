import axios from "axios";
import QueryString from "qs";

export const getProducts= async(filters)=>
{
    try{
        const response= await axios.get("https://localhost:44333/api/Products/GetProducts",
            {
                params:
                {
                    searchName:filters?.searchName,
                    brandIDs:filters?.brandIDs,
                    categories:filters?.categories,
                    firstPrice:filters?.firstPrice,
                    secondPrice:filters?.secondPrice,
                    sortItem:filters?.sortItem,
                    orderByAsc:filters?.orderByAsc,
                    page:filters?.page
                },
                paramsSerializer: (params)=>
                {
                    return QueryString.stringify(params)
                }
            })
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const getProductsAdmin=async(filters)=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Products/GetProductsAdmin", 
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    SearchName:filters?.searchName
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const getProduct=async(id)=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Products/GetProductInfo",
            {
                params:
                {
                    ID:id
                }
            }
        );
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const getProductAdmin=async(productID)=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Products/GetProductInfoAdmin",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ID:productID
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const addProduct=async(product)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Products/AddProduct", product,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data
    }
}

export const editProductInfo=async(productInfo)=>
{
    try{
        const response=await axios.put("https://localhost:44333/api/Products/EditProduct", productInfo,
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error)
        return error.response.data
    }
}

export const deleteProduct=async(productID)=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Products/DeleteProduct",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ID:productID
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data
    }
}

export const getCartItems=async()=>
{
    try{
        const response= await axios.get("https://localhost:44333/api/Cart/GetAllCartItems",
            {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response.data
    }
    catch(error)
    {
        console.error(error)
        return error.response.data
    }
}
export const addProductToCart=async(productID)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Cart/AddCartItem",null,
            {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
                },
                params:
                {
                    ProductID:productID
                }
            }
        )
        return response;
    }
    catch(error){
        console.error(error);
        return error.response.data;
    }
}

export const deleteCartItem=async(cartItemID)=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Cart/DeleteCartItem", {
            headers:
            {
                Authorization:`Bearer ${localStorage.getItem("authToken")}`
            },
            params:
            {
                CartItemID:cartItemID
            }
        })
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data;
    }
}

export const getUsersOrders=async()=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Orders/GetAllOrders",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const addOrder=async(productID)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Orders/AddOrder", productID,
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type":"application/json"
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data;
    }
}

export const deleteOrder=async(orderID)=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Orders/DeleteOrder",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ID:orderID
                }
            }
        )
        return response;
    }
    catch(error){
        console.error(error);
        return error.response.data
    }
}

export const getProductsReviews=async(productID, filters)=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Reviews/GetReviews",
            {
                headers:
                {
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("authToken")&&`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ProductID:productID,
                    OrderByAsc:filters?.orderByAsc,
                    SortItem:filters?.sortItem
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error)
    }
}

export const getTopThreeReviews=async(productID)=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Reviews/GetTopThreeReviews",
            {
                headers:
                {
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("authToken")&&`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ProductID:productID
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const getUsersReviews=async()=>
{
    try{
        const response= await axios.get("https://localhost:44333/api/Reviews/GetAllUsersReviews",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response.data;
    }
    catch(error)
    {
        console.error(error);
    }
}

export const addReview=async(review, productID)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Reviews/AddReview", review,
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ProductID:productID
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data;
    }
}

export const editReviewInfo=async(reviewInfo)=>
{
    try{
        const response=await axios.put("https://localhost:44333/api/Reviews/EditReview",reviewInfo,
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error)
        return error.response.data
    }
}

export const deleteReview=async(reviewID)=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Reviews/DeleteReview",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ReviewID:reviewID
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data
    }
}

export const getBrands=async()=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Brands/GetAllBrands");
        return response.data
    }
    catch(error)
    {
        console.error(error);
    }
}

export const addBrand=async(brand)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Brands/AddBrand", brand,
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error)
        return error.response.data
    }
}

export const deleteBrand=async(brandID)=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Brands/DeleteBrand", 
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                },
                params:
                {
                    ID:brandID
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error)
        return error.response.data;
    }
}

export const registerUser=async(registerData)=>
{
    try{
        const response= await axios.post("https://localhost:44333/api/Users/Register",registerData);
        return response;
    }
    catch(error){
        console.error(error)
        return error.response.data;
    }
}

export const loginUser=async(loginData)=>
{
    try{
        const response=await axios.post("https://localhost:44333/api/Users/Login", loginData);
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data;
    }
}

export const getUserInfo=async()=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Users/GetUserInfo",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response.data
    }
    catch(error)
    {
        console.error(error);
    }
}

export const getUserRole=async()=>
{
    try{
        const response=await axios.get("https://localhost:44333/api/Users/GetUserRole",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        );
        return response?.data
    }
    catch(error)
    {
        console.error(error);
    }
}

export const editUserInfo=async(editData)=>
{
    try{
        const response=await axios.put("https://localhost:44333/api/Users/EditUserInfo", editData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error)
        return error.response.data
    }
}

export const deleteUser=async()=>
{
    try{
        const response=await axios.delete("https://localhost:44333/api/Users/DeleteUser", 
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
        )
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error.response.data
    }
}