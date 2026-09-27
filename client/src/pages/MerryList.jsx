import Footer from "@/components/base/Footer";
import { NavbarRegistered } from "@/components/base/Navbar";
import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import MerryCard from "./match/MerryCard";
import MerryCardChosen from "./match/MerryCardChosen";

function MerryList() {
  const [user, setUser] = useState({});
  console.log(user);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLading] = useState(false);

  // const [status, setStatus] = useState()

  const checkUser = useCallback(async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/post/check`);
    setUserId(result.data.data.id);
  }, []);

  const getUser = useCallback(async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/post/match-list`);
    // console.log(result.data.data);
    setUser(result.data.data);
    // setStatus(result.data.data.status)
  }, []);

  const handleGetdata = useCallback(async () => {
    setIsLading(true);
    await getUser();
    await checkUser();
    setIsLading(false);
  }, [getUser, checkUser]);

  const callbackValue = async (item) => {
    console.log("AAA", item);
    handleGetdata();
  };

  useEffect(() => {
    handleGetdata();
  }, [handleGetdata]);

  if (isLoading)
    return (
      <div className="h-[500px] w-screen flex items-center justify-center">
        <div className="custom-loader"></div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <NavbarRegistered />
      <section className="min-h-screen w-6/12 mb-20">
        <article className="flex items-end justify-between my-20">
          <div className="text-pbeige-700">
            <TypographySmall>MERRY LIST</TypographySmall>
            <TypographyH1>Let&rsquo;s know each other</TypographyH1>
            <TypographyH1>with Merry!</TypographyH1>
          </div>
          <div className="w-[260px] flex flex-col items-end">
            <div>
              Merry limit today <span className=" text-pred-500">2/20</span>
            </div>
            <div>Reset in 12h..</div>
          </div>
        </article>
        {user.length > 0 && (
          <div className="flex flex-col items-center">
            {/* .filter((v)=>v.status.toLowerCase() !== "unmatch") */}
            {user?.map((item, index) => {
              //เหมือนต้องเขียนเช็ค status ที่ match ด้วย ให้แค่ merry กับ match มา render เท่านั้น
              //item.chooser !== userId && item.status.toLowerCase() !== "unmatch"
              //mapคนที่เขาปัดเรา
              if (item.chooser !== userId) {
                return (
                  <MerryCard
                    user={item}
                    id={userId}
                    callbackValue={callbackValue}
                    status={item.status}
                    key={index}
                  />
                );
              }
              //mapคนที่เราปัดเขา
              //item.chooser == userId && item.status.toLowerCase() !== "unmatch"
              if (item.chooser == userId) {
                console.log("ทดสอยฮะ");
                return (
                  <MerryCardChosen
                    user={item}
                    id={userId}
                    status={item.status}
                    callbackValue={callbackValue}
                    key={index}
                  />
                );
              }
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default MerryList;
