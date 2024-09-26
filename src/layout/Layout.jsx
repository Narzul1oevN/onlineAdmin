import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import undefine from "../assets/illustration.png";
import logo from "../assets/Group 1116606595.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Layout = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="w-[100%] pt-[10px] pb-[10px] justify-center bg-[#1C2536] flex items-center">
        <div className="w-[95%] m-auto flex flex-wrap items-center gap-[30px] justify-between">
          <div className="flex flex-wrap justify-center items-center gap-[20px]">
            <img onClick={() => {navigate("/login")}} className="hover:cursor-pointer" src={logo} alt=""/>
            <div className="flex items-center">
              <SearchIcon sx={{ color: "white" }} />
              <input
                type="text"
                className="w-[200px] h-[30px] outline-none border-none bg-transparent placeholder:text-white text-white pl-[10px]"
                placeholder="Search..."
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-[20px]">
            <NotificationsNoneIcon sx={{ color: "white" }} />
            <div className="flex items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[50%] bg-[#1FD286] text-[18px] font-[700] flex items-center justify-center text-white">
                R
              </div>
              <h1 className="text-[16px] text-white ">Randhir kumar</h1>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
