import React from "react";
import { Link } from "react-router-dom";

export const FakeAd2 = () => {
    return (
        <>
            <div className="w-full h-[200px] px-4" >
              
               <Link to={"https://fownix.com/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA/msh?utm_source=zoomit&utm_medium=janflashbanner&utm_campaign=T9"}>
                <div className="w-full h-full mt-1 rounded border  shadow-lg">
                   
                    <img src="https://api2.zoomit.ir/media/6846746e8f4699ff6ab9affe" alt=""
                   className="w-full h-full rounded" /> 
                </div></Link>
            </div>
        </>
    );
};
