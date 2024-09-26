import React, { useEffect } from "react";
import Navigation from "../components/navigation";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../api/api";
import { backdropClasses } from "@mui/material";

const Product = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.AdminSlice);

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
        <div className="w-[100%] flex  justify-between">
          <h1 className="text-[24px] text-[#111927] font-[700]">Product</h1>
          <button className="w-[118px] h-[40px] bg-blue-500 text-white font-[700] rounded">
            + Add order
          </button>
        </div>
        <div className="w-[100%] flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <input
              type="search"
              placeholder="Search..."
              className="pl-[20px] pr-[20px] text-[18px] w-[280px] placeholder:text-[18px] h-[40px] outline-none border-[1px] border-solid border-[lightgray] rounded"
              name=""
              id=""
            />
            <select
              className="pl-[20px] pr-[20px] w-[150px] h-[40px] text-[18px] outline-none border-[1px] border-solid border-[lightgray] rounded "
              name=""
              id=""
            >
              <option value="">Ready</option>
              <option value="">Shipped</option>
              <option value="">Received</option>
            </select>
          </div>
          <div className="flex items-start gap-[20px]">
            <button className="hover:bg-blue-500 hover:text-white w-[50px] h-[50px] bg-transparent border-[1px] border-solid rounded border-blue-300 text-blue-500">
              <DriveFileRenameOutlineIcon />
            </button>
            <button className="hover:bg-blue-500 hover:text-white w-[50px] h-[50px] bg-transparent border-[1px] border-solid rounded border-blue-300 text-blue-500">
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>

        {/* tableGet */}
        <div>
          <table className="border-[1px] border-[solid] border-[lightgray] w-[80%] text-center m-auto">
            <thead className="h-[20px]">
              <tr>
                <th>
                  <input
                    className="w-[15px] h-[15px] accent-blue-500"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </th>
                <th className="text-start">Product</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.data?.products.map((element) => {
                  return (
                    <tr
                      className="border-[1px] border-[solid] border-[lightgray]"
                      key={element.id}
                    >
                      <td>
                        <input
                          className="w-[15px] h-[15px] accent-blue-500"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td className="flex items-center gap-[10px]">
                        <img
                          className="w-[50px] object-cover object-center"
                          src={
                            import.meta.env.VITE_APP_FILE_URL + element.image
                          }
                          alt=""
                        />
                        <h1 className="text-[18px] font-[600]">
                          {element.productName}
                        </h1>
                      </td>
                      <td>
                        <div
                          className=" w-[50px] h-[50px] rounded-[50%]"
                          style={{ backgroundColor: element.color }}
                        ></div>
                      </td>
                      <td className="text-[18px] font-[600]">
                        {element.quantity}
                      </td>
                      <td className="text-[18px] font-[600]">
                        ${element.price}.00
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
