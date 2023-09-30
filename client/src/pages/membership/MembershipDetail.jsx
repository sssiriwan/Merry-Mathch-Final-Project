import React from "react";
import BadgeDemo from "@/components/base/button/Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../admin/ConfirmationModal";

const cardSvg = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5C4.93913 5 3.92172 5.42143 3.17157 6.17157C2.42143 6.92172 2 7.93913 2 9V10H30V9C30 7.93913 29.5786 6.92172 28.8284 6.17157C28.0783 5.42143 27.0609 5 26 5H6Z" fill="#FFB1C8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30 13H2V23C2 24.0609 2.42143 25.0783 3.17157 25.8284C3.92172 26.5786 4.93913 27 6 27H26C27.0609 27 28.0783 26.5786 28.8284 25.8284C29.5786 25.0783 30 24.0609 30 23V13ZM6 18C6 17.7348 6.10536 17.4804 6.29289 17.2929C6.48043 17.1054 6.73478 17 7 17H15C15.2652 17 15.5196 17.1054 15.7071 17.2929C15.8946 17.4804 16 17.7348 16 18C16 18.2652 15.8946 18.5196 15.7071 18.7071C15.5196 18.8946 15.2652 19 15 19H7C6.73478 19 6.48043 18.8946 6.29289 18.7071C6.10536 18.5196 6 18.2652 6 18ZM7 21C6.73478 21 6.48043 21.1054 6.29289 21.2929C6.10536 21.4804 6 21.7348 6 22C6 22.2652 6.10536 22.5196 6.29289 22.7071C6.48043 22.8946 6.73478 23 7 23H11C11.2652 23 11.5196 22.8946 11.7071 22.7071C11.8946 22.5196 12 22.2652 12 22C12 21.7348 11.8946 21.4804 11.7071 21.2929C11.5196 21.1054 11.2652 21 11 21H7Z" fill="#FFB1C8"/>
</svg>
const merryDetailIcon = <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00022 15.6386C3.78126 15.6386 0.361328 12.2187 0.361328 7.99973C0.361328 3.78077 3.78126 0.36084 8.00022 0.36084C12.2192 0.36084 15.6391 3.78077 15.6391 7.99973C15.6391 12.2187 12.2192 15.6386 8.00022 15.6386ZM7.23862 11.0553L12.6393 5.65383L11.5592 4.57369L7.23862 8.89501L5.07758 6.73397L3.99744 7.8141L7.23862 11.0553Z" fill="#CF4FA9"/>
</svg>;

function MembershipDetail() {
  const status = " text-base text-pbeige-600  bg-pbeige-200 flex ";
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState({});
  const [packageStatus, setPackageStatus] = useState("Active");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
  });

  const getMembershipData = async () => {
      const response = await axios.get(`http://localhost:4000/post/membership`);
      if (response.data.data.length > 0) {
        setName(response.data.data[0].merry_packages.package_name);
        setPrice(response.data.data[0].merry_packages.price);
        setLimit(response.data.data[0].merry_packages.package_limit);
        setIcon(response.data.data[0].merry_packages.package_icon);
      } else {
        // Redirect to the package page when there's no data
        navigate("/package"); // Replace "/package" with the actual route to your package page
      }
  }

  const handleDeletePackage = async () => {
    setShowConfirmation(true);
  }


const confirmCancel = async () => {
  try {
    await axios.delete(`http://localhost:4000/post/membership`);
    navigate("/package")
    setPackageStatus("Inactive");
  } catch (error) {
    console.log(error)
  }

  setShowConfirmation(false);
}

const cancelDelete = () => {
  setShowConfirmation(false);
};

  useEffect(() => {
    getMembershipData();
  }, []);

  return (
    <div>
      {/*Merry  Membership Package */}
      <p className=" text-2xl font-bold text-ppurple-500">Merry Membership Package</p>
      {/* กล่องใหญ่โชว์สถานะ membership */}
      <div className="flex flex-col mt-6  h-[222px]  p-8  rounded-[32px]  bg-gradient-to-br from-ppurple-800 to-ppurple-400 shadow-xl">
        {/* กล่อง detail ด้านบน */}
        <div className=" flex flex-row justify-between">
          {/* รูป / ชื่อ package ราคา */}
          <div className="flex flex-row justify-between">
            <div className="bg-pgray-100 w-[78px] h-[78px] rounded-2xl flex justify-center items-center">
              <img
                className="w-10 h-10"
                src={icon}
                alt="icon_vector"
              />
            </div>
            <div className="flex ml-4 flex-col justify-between">
              <h1 className="text-3xl font-bold text-white">{name}</h1>
              <h2 className="text-xl text-ppurple-200">{formatter.format(price)} /Month</h2>
            </div>

            {/* รายละเอียดแต่ละ package */}
          </div>
          <div className="flex flex-col">
            <h3 className="ml-[12px] text-purple-100 flex items-center">
              {merryDetailIcon}
              ‘Merry’ more than a daily limited
            </h3>
            <h3 className="ml-[12px] text-purple-100 flex items-center">
              {merryDetailIcon}
              Up to {limit} Merry per day
            </h3>
          </div>

          {/* membership status */}
          <div>
            <BadgeDemo className={status}>{packageStatus}</BadgeDemo>
          </div>
        </div>
        <hr className=" mt-10" />
        {/* กล่องโชว์ cancel package */}
        <div className=" mt-5 flex flex-row justify-end">
          {packageStatus === "Active" && (
            <button className="text-white" onClick={handleDeletePackage}>Cancel Package</button>
          )}
        </div>
        {showConfirmation && (
        <ConfirmationModal
          message="Do you sure to cancel Membership to get more Merry?"
          confirmLabel="Yes, I want to cancel"
          cancelLabel="No, I still want to be member"
          onConfirm={confirmCancel}
          onCancel={cancelDelete}
        />
      )}
      </div>

      {/* Payment Method */}
      <p className=" mt-16 text-2xl font-bold text-ppurple-500">Payment Method</p>
      <div className="flex flex-col mt-6  h-[194px]  p-8  rounded-[32px]   border border-pgray-400 bg-white">
        <div className=" flex flex-row justify-between">
          {/* รูป + visa ending*/}
          <div className="flex flex-row justify-between">
            <div className="w-16 h-16 flex justify-center items-center bg-pgray-100 rounded-xl">
            {cardSvg}
            </div>
            <div className="flex ml-4 flex-col">
              <h1 className=" text-2xl  font-bold  text-ppurple-600">Visa ending *9899</h1>
              <h2 className=" text-base font-normal text-pgray-700">Expire 04/2025</h2>
            </div>
          </div>
        </div>
        <hr className=" mt-6" />
        <div className=" mt-5 flex flex-row justify-end">
          <button className=" font-bold text-pred-500">Edit Payment Method</button>
        </div>
      </div>

      {/* Billing History */}
      <p className=" mt-16 text-2xl font-bold text-ppurple-500">Billing History</p>
      <div className="flex flex-col  mt-6  h-[470px]  p-8  rounded-[32px]   border border-pgray-400 bg-white">
        <div className=" text-pgray-700 py-2">Next Billing : 01/09/2022</div>

        <hr />
        <div>
          <Table className="text-pgray-700">
            <TableBody>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <hr />
          <div className=" mt-5 flex flex-row justify-end">
            <button className=" font-bold text-pred-500">Request PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipDetail;
