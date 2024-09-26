import React, { useEffect } from "react";
import Navigation from "../components/navigation";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from "react-redux";
import { GetProduct } from "../api/api";


const Orders = () => {

  const { data } = useSelector((state) => state.AdminSlice)
  console.log(data);
  
  useEffect(() => {
    GetProduct()
  }, [])

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
        <div className="w-[100%] flex  justify-between">
          <h1 className="text-[24px] text-[#111927] font-[700]">Orders</h1>
          <button className="w-[118px] h-[40px] bg-blue-500 text-white font-[700] rounded">
            + Add order
          </button>
        </div>
        <div className="w-[100%] flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <input
              type="search"
              placeholder="Search..."
              className="pl-[20px] pr-[20px] text-[18px] w-[280px] placeholder:text-[18px] h-[58px] outline-none border-[1px] border-solid border-[lightgray] rounded"
              name=""
              id=""
            />
            <select className="pl-[20px] pr-[20px] w-[150px] h-[56px] text-[18px] outline-none border-[1px] border-solid border-[lightgray] rounded " name="" id="">
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
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payment status</th>
                <th>Order status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            {data &&
                data?.data?.products.map((element) => {
                  return (
                    <tr>
                      <td>{element.productName}</td>
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

export default Orders;
