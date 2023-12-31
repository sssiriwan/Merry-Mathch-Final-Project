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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Convert date format from (created_at) column into dd/mm/yy form

function ComplaintListPage() {
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const getDataFromSearchBar = async () => {
    try {
      setIsLoading(true);
      console.log(selectedStatus);
      const result = await axios.get(
        `http://localhost:4000/admin/complaintz?keywords=${searchInput}&status=${selectedStatus}`
      );
      console.log("จากเซิช", result.data);
      setFilteredComplaints(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("เออเร่อจาก complainList", error);
    }
  };

  const handleRowClick = async (complaint) => {
    // Update the status of the complaint to Pending
    try {
      if (complaint.complaint_status.toLowerCase() === "new") {
        const updateComplaint = {
          status: "Pending",
        };
        const result = await axios.put(
          `http://localhost:4000/admin/complaint/${complaint.complaint_id}`,
          updateComplaint
        );
        //  Navigate to the complaint action page
        navigate(`/admin/complain/action/${complaint.complaint_id}`);
      } else if (complaint.complaint_status.toLowerCase() === "pending") {
        //  Navigate to the complaint action page
        navigate(`/admin/complain/action/${complaint.complaint_id}`);
      } else {
        //  Navigate to the complaint detail page
        navigate(`/admin/complain/detail/${complaint.complaint_id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    // fetchComplaints();
    getDataFromSearchBar();
  }, [searchInput, selectedStatus]);

  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex-col bg-pgray-200 items-center">
        {/* <ComplaintSearch /> */}

        {/* Navbar */}
        <div className="w-full flex flex-row bg-white h-20 justify-between items-center px-20 border-b">
          <div className="flex items-center text-lg font-semibold ml-5">
            Complaint List
          </div>
          <div className="flex flex-row">
            <Input
              className="flex w-80 p-3 items-center gap-4 rounded-md border border-gray-300 bg-white mr-2"
              placeholder="Search..."
              onChange={handleSearchInput}
            />
            <div>
              <Select
                onValueChange={(event) => {
                  setSelectedStatus(event);
                }}
              >
                <SelectTrigger className="w-[200px] flex p-3  items-start gap-8  rounded-md border border-gray-400 bg-neutral-0">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
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
                {filteredComplaints?.map((complaint, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(complaint)}
                  >
                    <TableCell>{complaint.user_id}</TableCell>
                    <TableCell>{complaint.issue}</TableCell>
                    <TableCell className=" line-clamp-1 ">
                      {complaint.description}
                    </TableCell>
                    {/* <TableCell>{complaint.created_at}</TableCell> */}
                    <TableCell>{formatDate(complaint.created_at)}</TableCell>
                    <TableCell>
                      <BadgeDemo
                        className={
                          "rounded-lg " +
                          (complaint.complaint_status.toLowerCase() === "new"
                            ? "bg-pbeige-100 text-black"
                            : complaint.complaint_status.toLowerCase() ===
                              "pending"
                            ? "bg-pyellow-100 text-black"
                            : complaint.complaint_status.toLowerCase() ===
                              "resolved"
                            ? "bg-pgreen-100 text-pgreen-500"
                            : complaint.complaint_status.toLowerCase() ===
                              "cancel"
                            ? "bg-pgray-200 text-pgray-700"
                            : "")
                        }
                      >
                        {complaint.complaint_status.toUpperCase()}
                      </BadgeDemo>
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
