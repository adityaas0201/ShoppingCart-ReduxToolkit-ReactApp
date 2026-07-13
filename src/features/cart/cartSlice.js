import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const url = 'https://www.course-api.com/react-useReducer-cart-project';


const initialState={
    cartItems:[],
    amount:0,
    total:0,
    isLoading:true,
    error:null,
}

export const getCartItems=createAsyncThunk('cart/getCartItems',async (name,thunkAPI)=>{
    try {
        const resp=await axios.get(url)
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong');
    }
})

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[];
        },
        removeItem:(state,action)=>{
            const itemId=action.payload
            state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)
        },
        increase:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>item.id===payload.id)
            cartItem.amount=cartItem.amount+1
        },
        decrease:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>item.id===payload.id)
            cartItem.amount=cartItem.amount-1;
        },
        calculateTotals:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item)=>{
                amount+=item.amount;
                total+=item.amount*item.price;
            })
            state.amount=amount;
            state.total=total;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(getCartItems.fulfilled,(state,action)=>{
            state.cartItems=action.payload;
            state.isLoading=false;
        })
        builder.addCase(getCartItems.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
    }
})

export const {clearCart,removeItem,increase,decrease,calculateTotals}=cartSlice.actions

export default cartSlice.reducer;