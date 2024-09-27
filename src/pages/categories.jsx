import { useEffect } from 'react';
import Navigation from '../components/navigation'
import nullData from "../assets/illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetByCategory } from '../api/api';
import { Link } from "react-router-dom";

const Categories = () => {
  const token = localStorage.getItem("token");
  const { categore } = useSelector((state) => state.AdminSlice);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  console.log(categore.data);

  function handleLog() {
    navigate('/login')
  }

  useEffect(() => {
    dispatch(GetByCategory());
  }, []);

  return (
    <div className='w-[100%] flex'> 
      <Navigation/>
      <div className='p-[10px]'>
      {token ? (
          <div>
            {categore?.slice(0, 6)?.map((element) => {
              return (
                <Link to={`/allProduct/${element.id}`}>
                  <div className="group hover:bg-[#DB4444] border-[2px] border-[#91919170] w-[170px] h-[145px] flex flex-col justify-evenly items-center">
                    <img
                      className="w-[50px] h-[50px] rounded"
                      src={
                        import.meta.env.VITE_APP_FILE_URL +
                        element?.categoryImage
                      }
                      alt=""
                    />
                    <h1 className="text-[16px] text-center font-[100] group-hover:text-white">
                      {element?.categoryName}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="m-auto flex flex-col gap-[10px] items-center justify-center">
            <img
              className=" w-[104px] h-[108px]"
              src={nullData}
              alt="Image when no token"
            />
            <h1 className="text-[20px] font-[800]">No Orders Yet</h1>
            <p className="text-[16px] text-[#5A607F] text-center">All the upcoming orders from your store will be visible in this page. <br /> You can add orders by yourself if you sell offline. </p>
            <button onClick={() => {handleLog()}} className="w-[140px] h-[40px] bg-blue-500 text-white text-[16px] rounded hover:bg-blue-400">Log in</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
