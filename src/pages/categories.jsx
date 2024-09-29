import React, { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import nullData from "../assets/illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetBrand, GetByCategory, deleteCategory, postCategroy } from "../api/api";
import Slide from "@mui/material/Slide";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import styled from "styled-components";
import FileBase64 from "react-file-base64";
import { handleaddBrand, setEditBrand, setEditBrandDId } from "../reducers/adminSlice";
import { PostBrand, deleteBrand, editBrandPr } from "../api/apibrand";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Categories = () => {
  const token = localStorage.getItem("token");
  const { categore } = useSelector((state) => state.AdminSlice);
  const { brandses } = useSelector((state) => state.AdminSlice);
  const { addBrand } = useSelector((state) => state.AdminSlice);
  const [editId, setEditId] = useState(null);
  const [editBrand, setEditBrand] = useState("");
  const [editCategoryId, seteditCategoryId] = useState(null);
  const [editCategoryName, seteditCategoryName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openBrands, setOpenBrands] = useState(false);
  function handleLog() {
    navigate("/login");
  }




  useEffect(() => {
    dispatch(GetByCategory());
    dispatch(GetBrands())
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlesavebrand = () => {
    let err = {
      brandName: addBrand,
    };
    dispatch(PostBrand(err));
    handleaddBrand(" ");
  };


  const handleClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState(true);
  const [Brands, setBrands] = useState(false);
  const [Banners, setBanners] = useState(false);

  const [CategoryImage, setCategoryImage] = useState(
    "https://avatars.mds.yandex.net/i?id=16e1568c6cd332ae5c6bfffa13c6c531996a96e1df09497e-12623317-images-thumbs&n=13"
  );
  const [CategoryName, setCategoryName] = useState("");
  const [categoryFile, setCategoryFile] = useState("");
  const handleShowImage = (e) => {
    setCategoryImage(e.base64);
    setCategoryFile(e.file);
  };

  const handleSaveCategoty = (e) => {
    e.preventDefault();
    dispatch(postCategroy({ categoryFile, CategoryName }));
    setCategoryName("");
    setCategoryImage(
      "https://avatars.mds.yandex.net/i?id=16e1568c6cd332ae5c6bfffa13c6c531996a96e1df09497e-12623317-images-thumbs&n=13"
    );
    setOpen(false);
  };

  

  const CloseBrand = () => {
    setOpenBrands(false);
  };

  const saveEditBrand = () => {
    const updateBrand = {
      id: editId,
      brandName: editBrand,
    };
    dispatch(editBrandPr(updateBrand)); 
    setOpenBrands(false);
  };

  const saveEditCategory = () => {
    const categoryElem = {
      id: editCategoryId,
      brandName: editCategoryName,
    };
    dispatch(editCategory(categoryElem)); 
    setOpenBrands(false);
  };

  const handleeditCategory = (categoryElem) => {
    setOpenBrands(true);
    setEditBrand(brandElem.brandName);
    setEditId(brandElem.id); // Исправлено
  };

  const handleEditBrand = (brandElem) => {
    setOpenBrands(true);
    setEditBrand(brandElem.brandName);
    setEditId(brandElem.id); // Исправлено
  };
  


  return (
    <div className="w-[100%] flex">
      <Navigation />

      <div className="w-[100%] flex flex-col gap-[20px] p-[10px] ">
        <div>
          <Button
            variant={`${categories ? "contained" : "text"}`}
            onClick={() => {
              setCategories(true);
              setBrands(false);
              setBanners(false);
            }}
          >
            Categories
          </Button>
          <Button  onClick={() => {
            setCategories(false);
            setBrands(true);
            setBanners(false);
          }}
          variant={`${Brands ? "contained" : "text"}`}>Brands</Button>
          <Button  onClick={() => {
            setCategories(false);
            setBrands(false);
            setBanners(true);
          }}
          variant={`${Banners ? "contained" : "text"}`}>Banners</Button>
        </div>

        {categories && <div>
          <div>
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="text-[24px] text-[#111927] font-[700]">
                Category
              </h1>
              <button
                className="w-[111px] h-[40px] bg-blue-500 rounded text-[white] font-[700] "
                onClick={handleClickOpen}
              >
                + Add new
              </button>
            </div>
            {token ? (
              <div className=" flex flex-wrap gap-[20px] p-[20px]">
                {categore?.map((element) => {
                  if (element.categoryImage != "") {
                    return (
                      <div
                        key={element.id}
                        className="group hover:bg-[#1C2536] hover:text-white border-[2px] border-[#91919170] w-[170px] h-[170px] flex flex-col justify-evenly items-center"
                      >
                        <img
                          className="w-[80px]  rounded"
                          src={import.meta.env.VITE_APP_FILE_URL + element?.categoryImage}
                        />import { GetBrands } from './../api/apibrand';

                        <h1 className="text-[18px] text-center font-[600] group-hover:text-white">
                          {element?.categoryName.slice(0, 12)}
                        </h1>
                        <div className="w-[100] flex items-center gap-[20px] justify-center">
                          <button>
                          <EditIcon
                          onClick={() => handleeditCategory(elem)}
                            fontSize="medium"
                            sx={{
                              color: "#1E5EFF",
                              marginRight: "10px",
                              ":hover": {
                                border: "1px solid #1E5EFF",
                                borderRadius: "4px",
                              },
                            }}
                          />
                          </button>
                          <button onClick={() => dispatch(deleteCategory(element.id))}>
                          <DeleteIcon
                            fontSize="medium"
                            sx={{
                              color: "#F04438",
                              marginRight: "0px",
                              ":hover": {
                                border: "1px solid #F04438",
                                borderRadius: "4px",
                              },
                            }}
                          />
                          </button>
                        </div>
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
                  All the upcoming orders from your store will be visible in
                  this page. <br /> You can add orders by yourself if you sell
                  offline.{" "}
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

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ width: "400px" }}>Add Category</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSaveCategoty} action="">
                <TextField
                  value={CategoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  id="outlined-basic"
                  sx={{ width: "100%", marginY: "20px" }}
                  label="Category name"
                  variant="outlined"
                />

                <StyledWrapper>
                  <label className="custum-file-upload">
                    <div className="icon">
                      <img src={CategoryImage} alt="" />
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <FileBase64
                      multiple={false}
                      onDone={handleShowImage}
                    />
                  </label>
                </StyledWrapper>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleSaveCategoty}
                variant="contained"
                type="submit"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        }
        {Brands && (
        <div className=" p-[10px] flex justify-between">
          <table className="w-[40%]">
            <thead>
              <tr className="border-b-2 text-left">
                <th>Brands</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(brandses) && brandses.map((elem) => {
                return (
                  <tr key={elem.id} className="border-b-2 h-[50px]">
                    <td>{elem.brandName}</td>
                    <td>
                      <div className="flex items-center">
                        <div>
                          <EditIcon
                            onClick={() => handleEditBrand(elem)}
                            fontSize="large"
                            sx={{
                              color: "#1E5EFF",
                              marginRight: "10px",
                              ":hover": {
                                border: "1px solid #1E5EFF",
                                borderRadius: "4px",
                              },
                            }}
                          />
                        </div>

                        <div>
                          <DeleteIcon
                            onClick={() => dispatch(deleteBrand(elem.id))}
                            fontSize="large"
                            sx={{
                              color: "#F04438",
                              marginRight: "0px",
                              ":hover": {
                                border: "1px solid #F04438",
                                borderRadius: "4px", // Optional: Add some border-radius for a smoother look
                              },
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-[50%]">
            <div className="flex overflow-hidden flex-col p-7 bg-white rounded border border-solid border-neutral-200 max-w-[524px] max-md:px-5">
              <div className="text-xl font-bold leading-snug text-gray-900 max-md:max-w-full">
                Add new brand
              </div>
              <div className="flex flex-col justify-center mt-6 w-full text-base min-h-[56px] rotate-[6.938893903907228e-18rad] text-neutral-500 max-md:max-w-full">
                <input
                  type="text"
                  value={addBrand}
                  onChange={(e) => dispatch(handleaddBrand(e.target.value))}
                  placeholder="Brand name"
                  className="overflow-hidden flex-1 shrink gap-3 self-stretch p-4 w-full bg-white rounded border border-solid border-neutral-200 max-md:max-w-full"
                />
              </div>
              <Button
                onClick={handlesavebrand}
                variant="contained"
                sx={{ width: "50%", marginLeft: "50%", marginY: "20px" }}
              >
                Create
              </Button>
            </div>
          </div>


          <Dialog open = { openBrands } onClose = {CloseBrand}>
            <DialogTitle>Edit name brand</DialogTitle>
            <div className="p-10 w-[350px]">
              <TextField
                value={editBrand}
                onChange={(e) => dispatch(setEditBrand(e.target.value))}
                id="outlined-basic"
                label="Brand Name"
                variant="outlined"
              />
            </div>
            <DialogActions>
              <Button onClick={CloseBrand}>Cancel</Button>
              <Button onClick={saveEditBrand} variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {Banners && (
          <div className="flex flex-col px-7 pt-7 pb-32 max-md:px-5 max-md:pb-24">
          <div className="flex flex-wrap gap-10 items-start mt-10 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
              <div className="text-xl font-bold leading-snug text-gray-900 max-md:max-w-full">
                Main sliders
              </div>
              <div className="flex overflow-hidden flex-col mt-2.5 w-full text-center max-md:max-w-full">
                <div className="flex flex-col justify-center px-16 py-5 bg-white rounded border border-dashed border-slate-400 max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-center px-8 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/67299a8bb25e10e3c47d047498aa69cdb9deb43d5ff8b948e1c279fb11ac94fe?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain w-10 aspect-square rounded-[32px]"
                    />
                    <div className="flex flex-col mt-2 max-w-full w-[259px]">
                      <div className="self-center text-xs font-bold leading-4 text-gray-900">
                        <span className="font-semibold">Click to upload</span>
                        <span className="font-semibold"> or drag and drop</span>
                      </div>
                      <div className="mt-1 text-xs leading-4 text-gray-500">
                        (SVG, JPG, PNG, or gif maximum 900x400)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex overflow-hidden flex-col mt-2.5 w-full text-sm rounded border border-solid border-slate-200 max-md:max-w-full">
                <div className="flex overflow-hidden gap-5 items-start p-3 w-full leading-none text-gray-500 bg-neutral-100 max-md:max-w-full">
                  <div className="w-20">Image</div>
                  <div className="flex-1 shrink basis-0">File name</div>
                  <div>Action</div>
                </div>
                <div className="flex flex-col px-3 pt-3 pb-4 w-full font-medium leading-loose text-gray-900 whitespace-nowrap max-md:max-w-full">
                  <div className="flex gap-5 items-center w-full max-md:max-w-full">
                    <img
                      loading="lazy"

                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain shrink-0 self-stretch my-auto w-20 aspect-[1.25]"
                    />
                    <div className="flex-1 shrink self-stretch my-auto basis-0">
                      Healthcare_Erbology.png
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/436434c477904d4c4b58088221ba6372bb73cb4b7a8b9a8a6acef5adebbc51ad?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                    />
                  </div>
                  <div className="flex gap-5 items-center mt-4 w-full max-md:max-w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain shrink-0 self-stretch my-auto w-20 aspect-[1.25]"

                      />
                      <div className="flex-1 shrink self-stretch my-auto basis-0">
                        Healthcare_Erbology.png
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/436434c477904d4c4b58088221ba6372bb73cb4b7a8b9a8a6acef5adebbc51ad?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                        className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                      />
                    </div>
                    <div className="flex gap-5 items-center mt-4 w-full max-md:max-w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c52529d36888b306c87d7b75342d3ea7febf89916fe8afda85649f8074cb431b?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                        className="object-contain shrink-0 self-stretch my-auto w-20 aspect-[1.25]"
                      />
                      <div className="flex-1 shrink self-stretch my-auto basis-0">
                        Healthcare_Erbology.png
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/436434c477904d4c4b58088221ba6372bb73cb4b7a8b9a8a6acef5adebbc51ad?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                        className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex overflow-hidden flex-col p-7 mt-2.5 w-full bg-white rounded border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center w-full min-h-[56px] rotate-[6.938893903907228e-18rad]">
                      <div className="flex relative gap-3 items-start p-4 w-full bg-white rounded border border-solid border-neutral-200">
                        <div className="z-0 flex-1 shrink my-auto text-base font-medium basis-0 text-neutral-800">
                          Enhance Your Music Experience
                        </div>
                        <div className="absolute left-3.5 gap-2.5 self-start px-0.5 text-xs leading-none whitespace-nowrap bg-white text-neutral-500 top-[-7px]">
                          Subtitle
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center mt-4 w-full min-h-[56px] rotate-[6.938893903907228e-18rad]">
                    <div className="flex relative gap-3 items-start p-4 w-full bg-white rounded border border-solid border-neutral-200">
                      <div className="z-0 flex-1 shrink my-auto text-base font-medium basis-0 text-neutral-800">
                        Enhance Your Music Experience
                      </div>
                      <div className="absolute left-3.5 gap-2.5 self-start px-0.5 text-xs leading-none whitespace-nowrap bg-white text-neutral-500 top-[-7px]">
                        Title
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-1 self-end px-4 py-2.5 mt-6 max-w-full text-sm font-medium leading-none text-center text-white whitespace-nowrap bg-blue-600 rounded w-[120px]">
                  Save
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
              <div className="text-xl font-bold leading-snug text-gray-900 max-md:max-w-full">
                Banner
              </div>
              <div className="flex overflow-hidden flex-col mt-2.5 w-full text-center max-md:max-w-full">
                <div className="flex flex-col justify-center px-16 py-5 bg-white rounded border border-dashed border-slate-400 max-md:px-5 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-center px-8 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4552e87d05406a38277a7c5af802bb5834d73f86be2571d7a6e1d21c8fde52c4?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain w-10 aspect-square rounded-[32px]"
                    />
                    <div className="flex flex-col mt-2 max-w-full w-[259px]">
                      <div className="self-center text-xs font-bold leading-4 text-gray-900">
                        <span className="font-semibold">Click to upload</span>
                        <span className="font-semibold"> or drag and drop</span>
                      </div>
                      <div className="mt-1 text-xs leading-4 text-gray-500">
                        (SVG, JPG, PNG, or gif maximum 900x400)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2.5 w-full text-sm rounded border border-solid border-slate-200 max-md:max-w-full">
                <div className="flex overflow-hidden gap-5 items-start p-3 w-full leading-none text-gray-500 bg-neutral-100 max-md:max-w-full">
                  <div className="w-20">Image</div>
                  <div className="flex-1 shrink basis-0">File name</div>
                  <div>Action</div>
                </div>
                <div className="flex flex-col px-3 pt-3 pb-4 w-full font-medium leading-loose text-gray-900 whitespace-nowrap max-md:max-w-full">
                  <div className="flex gap-5 items-center w-full max-md:max-w-full">
                    <img
                      loading="lazy"

                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/759bbea67b94b8d4a489dddc461c09716fa3b6c23e21bcaa54aa4429dd085783?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain shrink-0 self-stretch my-auto w-20 aspect-[1.25]"
                    />
                    <div className="flex-1 shrink self-stretch my-auto basis-0">
                      Healthcare_Erbology.png
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/436434c477904d4c4b58088221ba6372bb73cb4b7a8b9a8a6acef5adebbc51ad?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                      className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex overflow-hidden flex-col p-7 mt-2.5 w-full bg-white rounded border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col justify-center w-full text-base whitespace-nowrap rotate-[6.938893903907228e-18rad] text-neutral-500">
                    <div className="flex overflow-hidden gap-2 items-center py-4 pr-3 pl-4 w-full bg-white rounded border border-solid border-neutral-200">
                      <div className="flex-1 shrink self-stretch my-auto basis-0">
                        Categories
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f9e6a9e85b5b30c6d00f8ba4733296ffa48270a8f91e4d05084e3a6d951558?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-4 w-full text-base font-medium whitespace-nowrap min-h-[56px] rotate-[6.938893903907228e-18rad] text-neutral-800">
                    <div className="flex overflow-hidden gap-3 items-center p-4 w-full bg-white rounded border border-solid border-neutral-200">
                      <div className="flex-1 shrink self-stretch my-auto basis-0">
                        05d/23h/59m/35s
                      </div>
                      <img
                        loading="lazy"

                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f512465102521a3adc0205ce1ac0572f6c3455e7135998d2d9a32dd654a1c8b3?placeholderIfAbsent=true&apiKey=e940a6a49e084455a40af88cc6d38123"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-4 w-full min-h-[56px] rotate-[6.938893903907228e-18rad]">
                    <div className="flex relative gap-3 items-start p-4 w-full bg-white rounded border border-solid border-neutral-200">
                      <div className="z-0 flex-1 shrink my-auto text-base font-medium basis-0 text-neutral-800">
                        Enhance Your Music Experience
                      </div>
                      <div className="absolute left-3.5 gap-2.5 self-start px-0.5 text-xs leading-none whitespace-nowrap bg-white text-neutral-500 top-[-7px]">
                        Title
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-1 self-end px-4 py-2.5 mt-6 max-w-full text-sm font-medium leading-none text-center text-white whitespace-nowrap bg-blue-600 rounded w-[120px]">
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
  
      )}

      </div>
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
