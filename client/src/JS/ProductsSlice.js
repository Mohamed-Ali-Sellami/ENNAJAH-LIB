import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


/////////////////////////GET/////////////////////////////////////
export const getproduct=createAsyncThunk('/getproduct',async()=> {

try {

 let resultat= axios.get('http://localhost:5800/product/all')  
 return await resultat;
    
} catch (error) {
    console.log(error)    
}
})
/////////////////////////ADD//////////////////////////////////////////
export const addproduct=createAsyncThunk('/addproduct',async(newproduct)=> {

  try {
  
   let resultat= axios.post('http://localhost:5800/product/add',newproduct)  
   return await resultat;
      
  } catch (error) {
      console.log(error)    
  }
  })
//////////////////////delete////////////////////////////////////////

export const deleteproduct=createAsyncThunk('/deleteproduct',async(id)=> {

  try {
  
   let resultat= axios.delete(`http://localhost:5800/product/${id}`)  
   return await resultat;
      
  } catch (error) {
      console.log(error)    
  }
  })
///////////////////////////update////////////////////////////////
export const updateproduct=createAsyncThunk('/updateproduct',async({id,upproduct})=> {

  try {
  
   let resultat= axios.put(`http://localhost:5800/product/${id}`,upproduct)  
   return await resultat;
      
  } catch (error) {
      console.log(error)    
  }
  })

///////////////////////////fetch by id//////////////////////////////////////////////////////
  export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
      const res = await axios.get(`http://localhost:5800/product/${id}`);
return res.data.product;

    }
  );


const initialState = {
    product:null,
    status:null ,
    selectedProduct: null,
    loading: false,
    error: null,

}

export const productSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
builder 

//get
.addCase (getproduct.pending , (state) => {
state.status ="pending";
})

.addCase (getproduct.fulfilled, (state,action) => {
state.status ="success"
state.product=action.payload?.data?.product ;          
})

.addCase(getproduct.rejected , (state) => {

    state.status="fail";
}) 

//add
.addCase (addproduct.pending , (state) => {
  state.status ="pending";
  })
  
  .addCase (addproduct.fulfilled, (state) => {
  state.status ="success"
  
  })
  
  .addCase(addproduct.rejected , (state) => {
  
      state.status="fail";
  })

  //delete 

  .addCase (deleteproduct.pending , (state) => {
    state.status ="pending";
    })
    
    .addCase (deleteproduct.fulfilled, (state) => {
    state.status ="success"
    
    })
    
    .addCase(deleteproduct.rejected , (state) => {
    
        state.status="fail";
    })

    //Update 
    .addCase (updateproduct.pending , (state) => {
      state.status ="pending";
      })
      
      .addCase (updateproduct.fulfilled, (state) => {
      state.status ="success"
      
      })
      
      .addCase(updateproduct.rejected , (state) => {
      
          state.status="fail";
      })
  //fetch by id 
  .addCase(fetchProductById.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchProductById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedProduct = action.payload;
  })
  .addCase(fetchProductById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })




  }
})

// Action creators are generated for each case reducer function
export const {} = productSlice.actions

export default productSlice.reducer