import { useState, useEffect } from "react";
import ComplaintAction from "./admin/ComplaintAction";
import AdminControlPanel from "./admin/AdminControlPanel";
import { Button } from "@/components/ui/button";
import BadgeDemo from "@/components/base/button/Badge";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ComplaintActionPage() {
  const [name, setName] = useState("");
  const [userId, setUserID] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  // แก้ ปฎิทิน
  const [createAt, setCreateAt] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const param = useParams();

  const getComplaint = async () => {
    const result = await axios.get(
      `http://localhost:4000/admin/complaint/${param.complainId}`
    );
    console.log(result.data.data);

    setUserID(result.data.data.user_id);
    setIssue(result.data.data.issue);
    setDescription(result.data.data.description);
    setCreateAt(result.data.data.created_at);
    setStatus(result.data.data.complaint_status);
    setName(result.data.data.users.fullname);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    getComplaint();
  }, []);

  const pendingStatus = "h-7 ml-2 rounded-lg bg-pyellow-100 text-black";
  const h4style = "font-semibold text-pgray-700 mb-2";
  const divStyle = "m-5";

  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex flex-col bg-pgray-200 items-center">
        <div className="w-full flex bg-white h-20 justify-between items-center px-20 border-b">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => {
                navigate(`/admin/complain`);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7915 7.00501H3.62148L8.50148 2.12501C8.89148 1.73501 8.89148 1.09501 8.50148 0.705006C8.11148 0.315006 7.48148 0.315006 7.09148 0.705006L0.501484 7.29501C0.111484 7.68501 0.111484 8.31501 0.501484 8.70501L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00501H14.7915C15.3415 9.00501 15.7915 8.55501 15.7915 8.00501C15.7915 7.45501 15.3415 7.00501 14.7915 7.00501Z"
                  fill="#9AA1B9"
                />
              </svg>
            </Button>
            <div className="text-lg font-semibold ml-5 pr-2">
              {issue}
            </div>
            <BadgeDemo className={pendingStatus}>{status}</BadgeDemo>
          </div>
          <ComplaintAction />
        </div>
        <div className="bg-white rounded-2xl border-pgray-200 border-2 m-7 w-11/12">
          <div className="px-10 py-5">
            <div className={divStyle}>
              <h4 className={h4style}>
                Complaint by: <small className="text-black">{name}</small>
              </h4>
            </div>
            <div className="flex justify-center">
              <hr className="border-pgray-500 border-1 w-[95%]" />
            </div>
            <div className={divStyle}>
              <h4 className={h4style}>Issue</h4>
              <p>{issue}</p>
            </div>
            <div className={divStyle}>
              <h4 className={h4style}>Description</h4>
              <p>{description}</p>
            </div>
            <div className={divStyle}>
              <h4 className={h4style}>Date Submitted</h4>
              <p>{formatDate(createAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintActionPage;
