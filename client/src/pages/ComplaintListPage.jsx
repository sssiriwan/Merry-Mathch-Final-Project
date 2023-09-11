import { useEffect, useState } from "react";
import AdminControlPanel from "./admin/AdminControlPanel";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



// Convert date format from (created_at) column into dd/mm/yy form
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

function ComplaintListPage() {
  const newStatus = "h-7 ml-2 rounded-lg bg-pbeige-100 text-black";
  const pendingStatus = "h-7 ml-2 rounded-lg bg-pyellow-100 text-black";
  const resolveStatus = "h-7 ml-2 rounded-lg bg-pgreen-100 text-pgreen-500";
  const cancelStatus = "h-7 ml-2 rounded-lg bg-pgray-200 text-pgray-700";


  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchInput, setSearchInput] = useState("Search...");
  const [selectedStatus, setSelectedStatus] = useState("All status");

  const fetchComplaints = async () => {
    const result = await axios.get("http://localhost:4000/admin/package");
    console.log(result.data.data);
    setFilteredComplaints(result.data.data);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSelectedStatus = (e) => {
    e.preventDefault();
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    fetchComplaints();
  }, [searchInput, selectedStatus]);

  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex-col bg-pgray-200 items-center">
        {/* <ComplaintSearch /> */}

        {/* Navbar */}
        <div className="w-full flex flex-row bg-white h-20 justify-between items-center px-20 border-b">
          <div className="flex items-center text-lg font-semibold ml-5">Complaint List</div>
          <div className="flex flex-row">
            <Input
              className="flex w-80 p-3 items-center gap-4 rounded-md border border-gray-300 bg-white mr-2"
              placeholder="Search..."
              onChange={handleSearchInput}
            />
            <div>
              <Select>
                <SelectTrigger className="w-[200px] flex p-3  items-start gap-8  rounded-md border border-gray-400 bg-neutral-0">
                  <SelectValue 
                  placeholder="All status"
                  value={selectedStatus}
                  onChange={handleSelectedStatus}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Cancel">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div class=" min-h-screen flex flex-col justify-start items-center">
          <div class="w-5/6 bg-white mt-12 rounded-2xl shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="text-base">
                  <TableHead className="w-1/6 ">User</TableHead>
                  <TableHead className="w-1/6">Issue</TableHead>
                  <TableHead className="w-2/6 ">Description</TableHead>
                  <TableHead className="w-1/6">Date Submitted</TableHead>
                  <TableHead className="w-1/6">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredComplaints.map((complaint, index) => (
                  <TableRow key={index}>
                    <TableCell>{complaint.user}</TableCell>
                    <TableCell>{complaint.issue}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{formatDate(complaint.created_at)}</TableCell>
                    <TableCell>
                      <BadgeDemo className={newStatus}>{complaint.status}</BadgeDemo>
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
