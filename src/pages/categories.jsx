import React, { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import nullData from "../assets/illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetByCategory, postCategroy } from "../api/api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import styled from "styled-components";
import FileBase64 from 'react-file-base64';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Categories = () => {
  const token = localStorage.getItem("token");
  const { categore } = useSelector((state) => state.AdminSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  function handleLog() {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(GetByCategory());
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [CategoryImage , setCategoryImage] = useState("https://avatars.mds.yandex.net/i?id=16e1568c6cd332ae5c6bfffa13c6c531996a96e1df09497e-12623317-images-thumbs&n=13")
  const [CategoryName , setCategoryName]=useState("")
  const [categoryFile ,setCategoryFile] = useState("")
 console.log(CategoryName);
  const handleShowImage = (e) =>
  {
   setCategoryImage(e.base64)
   setCategoryFile(e.file)
 }

 const handleSaveCategoty = (e)=>{
  e.preventDefault();
  dispatch(postCategroy({categoryFile, CategoryName}))
  setCategoryName("")
  setCategoryImage("https://avatars.mds.yandex.net/i?id=16e1568c6cd332ae5c6bfffa13c6c531996a96e1df09497e-12623317-images-thumbs&n=13")
  setOpen(false)

}

 
 

  return (
    <div className="w-[100%] flex">
      <Navigation />
      <div className="w-[100%] flex flex-col gap-[20px] p-[10px]">
        <div className="w-[100%] flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <p
              onClick={() => FilterByCategory()}
              className="text-[18px] text-blue-500 font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[5px] hover:cursor-pointer hover:bg-blue-100"
            >
              Categories
            </p>
            <p
              onClick={() => FilterByCategory()}
              className="text-[18px] text-blue-500 font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[5px] hover:cursor-pointer hover:bg-blue-100"
            >
              Brands
            </p>
            <p
              onClick={() => FilterByCategory()}
              className="text-[18px] text-blue-500 font-[600] pl-[20px] pr-[20px] pt-[10px] pb-[10px] rounded-[5px] hover:cursor-pointer hover:bg-blue-100"
            >
              Banners
            </p>
          </div>
          <button
            className="w-[111px] h-[40px] bg-blue-500 rounded text-[white] font-[700] "
            onClick={handleClickOpen}
          >
            + Add new
          </button>
        </div>
        <h1 className="text-[24px] text-[#111927] font-[700]">Category</h1>

        {token ? (
          <div className=" flex flex-wrap gap-[20px] p-[20px]">
            {categore?.map((element) => {
              if (element.categoryImage != "") {
                return (
                  <div key={element.id} className="group hover:bg-[#1C2536] border-[2px] border-[#91919170] w-[170px] h-[145px] flex flex-col justify-evenly items-center">
                    <img
                      className="w-[80px]  rounded"
                      src={
                        import.meta.env.VITE_APP_FILE_URL +
                        element?.categoryImage
                      }
                    />
                    <h1 className="text-[16px] text-center font-[100] group-hover:text-white">
                      {element?.categoryName}
                    </h1>
                  </div>
                );
              }
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

      <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle sx={{width:"400px"}}>Add Category</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveCategoty} action="">  
        <TextField  value={CategoryName} onChange={(e)=> setCategoryName(e.target.value)} id="outlined-basic" sx={{width:"100%", marginY:"20px"}} label="Category name" variant="outlined" />
    
         <StyledWrapper>
    <label className="custum-file-upload">
      <div className="icon">
        <img src={CategoryImage} alt="" />
      </div>
      <div className="text">
        <span>Click to upload image</span>
      </div>
      <FileBase64
        multiple={false}  // Adjust according to your need
        onDone={handleShowImage}
      />
    </label>
  </StyledWrapper>
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveCategoty} variant="contained" type="submit">Create</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon img {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
  }

  .custum-file-upload input {
    display: none;
  }
`;

export default Categories;
