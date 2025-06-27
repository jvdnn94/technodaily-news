import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../container/Container";
import logo from "../../assets/images/technodaily_darkened3.png";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/searchpage?query=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <div className="nav-custom border-2 border-b-black">
      <Container>
        <div className="justify-between flex-row-reverse items-center flex">
    
          <ul className="flex gap-2 text-blue-700 font-bold text-xl items-center mt-0.5 " dir="rtl" >
              <li>
              <img src={logo} alt="لوگو" className="h-13" />
            </li>
             <li className="mt-2 ml-4  hover:text-blue-950 hover:text-2xl duration-100">
              <Link to="/">صفحه اصلی</Link>
            </li>
             <li className="mt-2 ml-4  hover:text-blue-950 hover:text-2xl duration-100">
            <Link to="/contact us"> ارتباط با ما</Link>
            </li>
             <li className="mt-2 ml-4 text-shadow hover:text-blue-950 hover:text-2xl duration-100">
               <Link to="/about us"> درباره ما</Link>
            </li>          
          </ul>

      
          <form onSubmit={handleSubmit} className="flex gap-3 mt-2 items-center">
            <Link to="/login">
              <button className="bg-rose-500 border-rose-950 border-2 py-2 w-24 rounded-md">
                ورود/ثبت نام
              </button>
            </Link>
            <div className="flex items-center w-full max-w-sm border-black border-2 rounded-md">
              <input
                type="search"
                name="searchbar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="...جستجو"
                aria-label="جستجو"
                className="SearchBox flex-grow px-3 py-2 text-right text-black border-gray-300 rounded-r-none rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className=" Searchbtn px-4 py-2  text-blue-300 
                 hover:bg-blue-700 focus:outline-none rounded-r-md "
              >
                <i className="fas fa-search text-gray-950" />
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
