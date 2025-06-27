import React from "react";
import { Link } from "react-router-dom";

export const FakeAd = () => {
    return (
        <>
            <div className="gap-1 grid grid-rows-3  pr-2 h-[420px]" dir="rtl">
                <Link to={"https://www.tejaratbank.ir/"}>
                    <div className="w-full h-full ml-0.5 row-span-1 rounded-[0.5rem] border border-gray-600 shadow-lg">
                        <img src="https://econews.ir/s3-files/2000x2000/images/300x100-1684129903.gif" alt=""
                            className="w-full h-full rounded-[0.5rem]" />
                    </div>
                </Link>
                <Link to={"https://me.amarkets.marketing/birthday-17-years-fa/?g=O31NP&utm_source=ZM-PA-Promo&utm_medium=ZM-DA&utm_campaign=DA-May"}>
                    <div className="w-full h-full row-span-1 ml-0.5 rounded-[0.5rem] border border-gray-600 shadow-lg">

                        <img src="https://api2.zoomit.ir/media/682b404a68460d806c1cf171" alt=""
                            className="w-full h-full rounded-[0.5rem]" />
                    </div>
                </Link>
                <Link to={"https://www.asiatech.ir/page/adsl/?utm_source=ilna&utm_medium=referral&utm_campaign=b2call1404"}>
                    <div className="w-full h-full row-span-1 ml-0.5 rounded-[0.5rem] border border-gray-600 shadow-lg">

                        <img src="https://api2.zoomit.ir/media/680de9470b041aaba916f503" alt=""
                            className="w-full h-full rounded-[0.5rem]" />
                    </div>
                </Link>



            </div>
        </>
    );
};
