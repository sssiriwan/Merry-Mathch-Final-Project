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

function MembershipDetail() {
  const status = " text-base text-pbeige-600  bg-pbeige-200 flex ";
  return (
    <div>
      {/* Membership Package */}
      <p className=" text-2xl font-bold text-ppurple-500">Merry Membership Package</p>
      {/* กล่องใหญ่โชว์สถานะ membership */}
      <div className="flex flex-col mt-6  h-[222px]  p-8  rounded-[32px]  bg-gradient-to-br from-ppurple-800 to-ppurple-400 shadow-xl">
        {/* กล่อง detail ด้านบน */}
        <div className=" flex flex-row justify-between">
          {/* รูป / ชื่อ package ราคา */}
          <div className="flex flex-row justify-between">
            <img
              className="w-[78px] h-[78px] rounded-2xl"
              src="https://files.vogue.co.th/uploads/makeup_steps_to_natural_look3.jpg"
              alt="icon_vector"
            />
            <div className="flex ml-4 flex-col justify-between">
              <h1 className=" text-3xl  text-white">Premium</h1>
              <h2 className="  text-xl text-white">THB 149.00/Month</h2>
            </div>

            {/* รายละเอียดแต่ละ package */}
          </div>
          <div className="flex flex-col">
            <h3 className="ml-[12px] text-base  text-purple-100">
              ‘Merry’ more than a daily limited
            </h3>
            <h3 className="ml-[12px] text-base text-purple-100">
              ‘Merry’ more than a daily limited
            </h3>
          </div>

          {/* membership status */}
          <div>
            <BadgeDemo className={status}>Active</BadgeDemo>
          </div>
        </div>
        <hr className=" mt-10" />
        {/* กล่องโชว์ cancel package */}
        <div className=" mt-5 flex flex-row justify-end">
          <button className="text-white">Cancel Package</button>
        </div>
      </div>

      {/* Payment Method */}
      <p className=" mt-16 text-2xl font-bold text-ppurple-500">Payment Method</p>
      <div className="flex flex-col mt-6  h-[194px]  p-8  rounded-[32px]   border border-pgray-400 bg-white">
        <div className=" flex flex-row justify-between">
          {/* รูป + visa ending*/}
          <div className="flex flex-row justify-between">
            <img
              className="w-[66px] h-[66px] rounded-2xl"
              src="https://files.vogue.co.th/uploads/makeup_steps_to_natural_look3.jpg"
              alt="icon_vector"
            />
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
