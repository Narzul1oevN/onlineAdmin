import { useEffect } from "react";
import Navigation from "../components/navigation";
import nullData from "../assets/illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetByCategory } from "../api/api";
import { Link } from "react-router-dom";

const Categories = () => {
  const token = localStorage.getItem("token");
  const { categore } = useSelector((state) => state.AdminSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(categore.data);

  function handleLog() {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(GetByCategory());
  }, []);

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
        <div className="w-[100%] flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <p onClick={() => FilterByCategory()} className="text-[18px] font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[10px] hover:cursor-pointer hover:bg-blue-300">Categories</p>
            <p onClick={() => FilterByCategory()} className="text-[18px] font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[10px] hover:cursor-pointer hover:bg-blue-300">Brands</p>
            <p onClick={() => FilterByCategory()} className="text-[18px] font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[10px] hover:cursor-pointer hover:bg-blue-300">Banners</p>
          </div>
          <button className="w-[111px] h-[40px] bg-blue-500 rounded text-[white] font-[700]">+ Add new</button>
        </div>
        <h1 className="text-[24px] text-[#111927] font-[700]">Category</h1>

        {token ? (
          <div className=" flex flex-wrap gap-[20px] p-[20px]">
            {categore?.slice(0, 6)?.map((element) => {
              return (
                <div className="group hover:bg-[#1C2536] border-[2px] border-[#91919170] w-[170px] h-[145px] flex flex-col justify-evenly items-center">
                  <img
                    className="w-[50px] h-[50px] rounded"
                    src={
                      import.meta.env.VITE_APP_FILE_URL + element?.categoryImage
                    }
                    alt=""
                  />
                  <h1 className="text-[16px] text-center font-[100] group-hover:text-white">
                    {element?.categoryName}
                  </h1>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" flex m-auto flex-col gap-[10px] items-center justify-center">
            <img
              className=" w-[104px] h-[108px]"
              src={nullData}
              alt="Image when no token"
            />
            <h1 className="text-[20px] font-[800]">No Orders Yet</h1>
            <p className="text-[16px] text-[#5A607F] text-center">
              All the upcoming orders from your store will be visible in this
              page. <br /> You can add orders by yourself if you sell offline.{" "}
            </p>
            <button
              onClick={() => {
                handleLog();
              }}
              className="w-[140px] h-[40px] bg-blue-500 text-white text-[16px] rounded hover:bg-blue-400"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
