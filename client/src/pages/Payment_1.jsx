import { NavbarRegistered } from "@/components/base/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCallback, useEffect, useState } from "react";
import CheckoutForm from "./payment/CheckoutForm";
import { usePackage } from "@/contexts/packageProvider";
import axios from "axios";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Payment_1 = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [ packageData, setPackageData ] = useState({})
  const { packageId } = usePackage();
  console.log("หน้าจ่ายเงิน",packageData)

  const getPackageData = useCallback(async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/auth/package/${packageId}`);
    setPackageData(result.data.data[0])
  }, [packageId])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {setClientSecret(data.clientSecret); console.log(data)});
  }, []);

  useEffect(() => {
    getPackageData();
  }, [getPackageData])

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: '#C70039',
      spacingGridRow: '20px',
      borderRadius: '15px',
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <NavbarRegistered />
      <div className="w-screen flex justify-center">
        <div className="w-[928px] h-[554px] flex justify-between mt-[80px]">
          {/* left card */}
          <div className="w-[358px] h-[244px] bg-pgray-100 flex flex-col justify-center items-center border rounded-3xl border-pgray-400">
            <div className="w-[310px] h-[180px] flex flex-col justify-between">
              <div className="w-[310px] h-[30px] flex items-center">
                <img src="./icons/package.png" alt="package" />
                <p className="ml-[12px] text-xl text-pgray-700">
                  Merry Membership
                </p>
              </div>
              <div className="w-[310px] h-[126px]">
                <div className="w-[310px] h-[48px] flex justify-between items-center">
                  <span className="text-base text-pgray-700">Package </span>
                  <span className="text-base text-pgray-700">
                    Price ({packageData.package_limit} limit)
                  </span>
                </div>
                <div className="w-[310px] h-[78px] flex justify-between items-center border-t-2 border-pgray-300 text-pgray-900 text-xl font-bold">
                  <span className="">{packageData.package_name}</span>
                  <span className="">{formatter.format(packageData.price)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* form of register credit card */}
          <section className="w-[548px] h-[554px]">
            <div className="border-2 rounded-3xl">
              {/* head */}
              <div className="w-full h-[78px] flex justify-center items-center bg-pgray-100 rounded-t-3xl ">
                <div className="w-[500px] h-[30px] flex justify-between items-center">
                  <div className=" text-pgray-700 text-xl font-bold">
                    <h2>Credit Card</h2>
                  </div>
                  <div className="w-[100px] h-[28px] flex justify-between items-center">
                    <img src="./icons/bank_Visa.png" alt="Visa" />
                    <img src="./icons/bank_MasterCard.png" alt="MasterCar" />
                  </div>
                </div>
              </div>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Payment_1;
