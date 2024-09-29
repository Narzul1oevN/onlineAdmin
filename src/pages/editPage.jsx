import React, { useEffect } from "react";
import Navigation from "../components/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetBrand, GetById, GetCategory, GetColor, editProduct } from "../api/api";
import {
  setBrandId,
  setColorId,
  setEditCode,
  setEditDiscription,
  setEditName,
  setEditPrice,
  setEditQuantity,
  setHasDiscount,
  setSubcategoryId,
} from "../reducers/adminSlice";
import { data } from "autoprefixer";
import toast from "react-hot-toast";

const EditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { color } = useSelector((state) => state.AdminSlice);
  const { brandse } = useSelector((state) => state.AdminSlice);
  const { subcategory } = useSelector((state) => state.AdminSlice);
  const {
    editProductName,
    editDiscription,
    editProductQuantity,
    editProductCode,
    editProductPrice,
    brandId,
    colorId,
    subcategoryId,
    hasdiscount,
  } = useSelector((state) => state.AdminSlice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(
            editProduct({
                id,
                brandId,
                editProductPrice,
                editProductName,
                editProductCode,
                hasdiscount,
                editProductQuantity,
                colorId,
                subcategoryId,
                editDiscription
            })
        );
        toast.success("Successfully edited");
        navigate("/product");
    } catch (error) {
        toast.error("Failed to edit product");
        console.error(error); // Опционально: логирование ошибки
    }
};


  useEffect(() => {
    dispatch(GetColor());
    dispatch(GetBrand());
    dispatch(GetCategory());
    dispatch(GetById(id));
  }, []);

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-[20px] p-[10px]">
        <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
          <div className="w-[100%] flex items-center justify-between">
            <h1 className="text-[24px] text-[#111927] font-[700]">
              Products \ Edit product
            </h1>
            <div className="flex items-center gap-[10px]">
              <button
                onClick={() => {
                  navigate("/product");
                }}
                type="button"
                className="w-[120px] hover:bg-blue-500 hover:text-white h-[40px] bg-transparent rounded text-blue-500 border-[2px] border-solid border-blue-500 font-[700]"
              >
                Cancel
              </button>
              <button
                // onClick={() => handleSubmit()}
                type="submit"
                className="w-[120px] hover:bg-transparent hover:text-blue-500 h-[40px] bg-blue-500 rounded text-white font-[600] hover:border-[2px] hover:border-solid hover:border-blue-500"
              >
                Save
              </button>
            </div>
          </div>
          <div className="w-[100%] flex flex-wrap items-start justify-center gap-[10px]">
            <div className="w-[40%] flex flex-col gap-[20px] items-center justify-center">
              <select
                name="BrandId"
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                id=""
                value={brandId}
                onChange={(e) => dispatch(setBrandId(e.target.value))}
              >
                <option value="">Brand</option>
                {brandse && brandse.data ? (
                  brandse.data.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.brandName}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
              <select
                name="ColorId"
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                id=""
                value={colorId}
                onChange={(e) => dispatch(setColorId(e.target.value))}
              >
                <option value="">Color</option>
                {color && color.data ? (
                  color.data.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.colorName}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
              <input
                placeholder="Enter product name..."
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                type="text"
                name="Productname"
                value={editProductName}
                onChange={(e) => dispatch(setEditName(e.target.value))}
              />
              <textarea
                value={editDiscription}
                onChange={(e) => dispatch(setEditDiscription(e.target.value))}
                name="discription"
                placeholder="Description"
                className="w-[430px] h-[100px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                cols="30"
                rows="10"
              ></textarea>
              <input
                placeholder="Enter product quantity..."
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                type="number"
                name="quantity"
                value={editProductQuantity}
                onChange={(e) => dispatch(setEditQuantity(e.target.value))}
              />
              <input
                placeholder="Enter product hasDiscount..."
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                type="text"
                name="hasDiscount"
                value={hasdiscount}
                onChange={(e) => dispatch(setHasDiscount(e.target.value))}
              />
            </div>

            <div className="w-[40%] flex flex-col gap-[30px] items-center justify-center">
              <input
                placeholder="Enter product code..."
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                type="text"
                name="productCode"
                value={editProductCode}
                onChange={(e) => dispatch(setEditCode(e.target.value))}
              />
              <input
                placeholder="Enter product price..."
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                type="number"
                name="price"
                value={editProductPrice}
                onChange={(e) => dispatch(setEditPrice(e.target.value))}
              />
              <select
                name="subCategory"
                className="w-[430px] h-[40px] pl-[10px] border-[1px] border-solid border-gray-400 outline-none rounded-[10px] pr-[10px]"
                id=""
                value={subcategoryId}
                onChange={(e) => dispatch(setSubcategoryId(e.target.value))}
              >
                <option value="">SubCategory</option>
                {subcategory && subcategory.data ? (
                  subcategory.data.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.subCategoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
