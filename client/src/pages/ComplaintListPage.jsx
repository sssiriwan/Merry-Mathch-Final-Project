import { useEffect, useState } from "react";
import AdminControlPanel from "./admin/AdminControlPanel";
import ComplaintSearch from "./admin/ComplaintSearch";
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
import axios from "axios";


// Mock data
const complaints = [
  {
    user: "John",
    issue: "lorem ipsum",
    description: "asdasdasdasdasdasdasdasdasd",
    date: "23/02/2022",
    status: "pending",
  },
  {
    user: "INV001",
    issue: "Paid",
    description: "$250.00",
    date: "Credit Card",
    status: "New",
  },
  {
    user: "David",
    issue: "sdfsdf",
    description: "xcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxcvxc",
    date: "01/02/03",
    status: "Resolved",
  },
  {
    user: "INV001",
    issue: "Paid",
    description: "$250.00",
    date: "Credit Card",
    status: "pending",
  },
  {
    user: "INV001",
    issue: "Paid",
    description: "$250.00",
    date: "Credit Card",
    status: "pending",
  },
  {
    user: "INV001",
    issue: "Paid",
    description: "$250.00",
    date: "Credit Card",
    status: "pending",
  },
];

function ComplaintListPage() {
  const newStatus = "h-7 ml-2 rounded-lg bg-pbeige-100 text-black";
  const pendingStatus = "h-7 ml-2 rounded-lg bg-pyellow-100 text-black";
  const resolveStatus = "h-7 ml-2 rounded-lg bg-pgreen-100 text-pgreen-500";
  const cancelStatus = "h-7 ml-2 rounded-lg bg-pgray-200 text-pgray-700";

  const [items, setItems] = useState([]);

  const fetchPackage = async () => {
    const result = await axios.get('http://localhost:4000/admin/package');
    console.log(result.data.data)
    setItems(result.data.data)
  }

  useEffect(()=> {
    fetchPackage();
  }, [])



  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex-col bg-pgray-200 items-center">
        <ComplaintSearch />

        <div class=" min-h-screen flex flex-col justify-start items-center">
          <div class="w-5/6 bg-white mt-12 rounded-2xl shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="text-base">
                  <TableHead className="w-1/6 ">User</TableHead>
                  <TableHead className="w-1/6">Issue</TableHead>
                  <TableHead className="w-3/6 ">Description</TableHead>
                  <TableHead className="w-1/6">Date Submitted</TableHead>
                  <TableHead className="w-1/6">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((complaints, index) => (
                  <TableRow key={index}>
                    <TableCell>{complaints.user}</TableCell>
                    <TableCell>{complaints.issue}</TableCell>
                    <TableCell>{complaints.description}</TableCell>
                    <TableCell>{complaints.date}</TableCell>
                    <TableCell>
                      <BadgeDemo className={newStatus}>{complaints.status}</BadgeDemo>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintListPage;