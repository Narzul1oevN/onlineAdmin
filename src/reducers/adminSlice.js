import { createSlice } from "@reduxjs/toolkit";
import {
  GetBrand,
  GetByCategory,
  GetById,
  GetCategory,
  GetColor,
  GetProduct,
  addProduct,
  editProduct,
  getOrder,
  login,
  searchByName,
} from "../api/api";
import toast from "react-hot-toast";
import { GetBrands } from "../api/apibrand";

const initialState = {
  data: [],
  order: [],
  categore: [],
  token: null,
  color: [],
  brand: [],
  subcategory: [],
  editProductName: "",
  editDiscription: "",
  editProductQuantity: "",
  editProductCode: "",
  editProductPrice: "",
  brandId: "",
  colorId: "",
  subcategoryId: "",
  hasdiscount: "",
  addBrand:"",
  editBrand:"",
  editId: null,

};

export const AdminSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setEditBrand: (state, action) => {
      state.editBrand = action.payload;
   },
   setEditBrandDId: (state, action) => {
      state.editId = action.payload;
   },

    handleaddBrand: (state, action) => {
      state.addBrand = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setEditName: (state, action) => {
      state.editProductName = action.payload;
    },
    setEditDiscription: (state, action) => {
      state.editDiscription = action.payload;
    },
    setEditQuantity: (state, action) => {
      state.editProductQuantity = action.payload;
    },
    setEditCode: (state, action) => {
      state.editProductCode = action.payload;
    },
    setEditPrice: (state, action) => {
      state.editProductPrice = action.payload;
    },
    setBrandId: (state, action) => {
      state.brandId = action.payload;
    },
    setColorId: (state, action) => {
      state.colorId = action.payload;
    },
    setSubcategoryId: (state, action) => {
      state.subcategoryId = action.payload;
    },
    setHasDiscount: (state, action) => {
      state.hasdiscount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        toast.success("Successfully logged in!");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(GetProduct.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(GetById.fulfilled, (state, action) => {
      state.editProductName = action.payload.productName;
      state.editDiscription = action.payload.description;
      state.editProductPrice = action.payload.price;
      state.editProductQuantity = action.payload.quantity;
      state.editProductCode = action.payload.code;
      state.hasdiscount = action.payload.discount
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(GetByCategory.fulfilled, (state, action) => {
      state.categore = action.payload;
    });
    builder.addCase(GetColor.fulfilled, (state, action) => {
      state.color = action.payload;
    });
    builder.addCase(GetCategory.fulfilled, (state, action) => {
      state.subcategory = action.payload;
    });
    builder.addCase(searchByName.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(GetBrands.fulfilled, (state, action) => {
      state.brand = action.payload;
    });


  },
});

export const { logout, setEditName, setEditDiscription, setEditQuantity, setEditCode, setEditPrice, setBrandId, setColorId, setSubcategoryId, setHasDiscount, handleaddBrand, setEditBrand, setEditBrandDId } = AdminSlice.actions;

export default AdminSlice.reducer;
