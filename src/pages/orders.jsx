import React, { useEffect } from "react";
import Navigation from "../components/navigation";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct, getOrder } from "../api/api";

const Orders = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.AdminSlice);

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
          <h1 className="text-[24px] text-[#111927] font-[700]">Orders</h1>

        {/* tableGet */}
        <div>
          <table className="border-[1px] border-[solid] border-[lightgray] w-[80%] text-center m-auto">
            <thead className="h-[50px]">
              <tr>
                <th>
                <input className="w-[15px] h-[15px] accent-blue-500" type="checkbox" name="" id="" />
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
                    <tr className="border-[1px] border-[solid] border-[lightgray]" key={element.id}>
                      <td>
                        <input className="w-[15px] h-[15px] accent-blue-500" type="checkbox" name="" id="" />
                      </td>
                      <td className="flex items-center gap-[10px]">
                        <img
                          className="w-[50px] object-cover object-center"
                          src={
                            import.meta.env.VITE_APP_FILE_URL + element.image
                          }
                          alt=""
                        />
                        <h1 className="text-[18px] font-[600]">{element.productName}</h1>
                      </td>
                      <td>
                        <div
                          className=" w-[50px] h-[50px] rounded-[50%]"
                          style={{ backgroundColor: element.color }}
                        ></div>
                      </td>
                      <td className="text-[18px] font-[600]">{element.quantity}</td>
                      <td className="text-[18px] font-[600]">${element.price}.00</td>
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
