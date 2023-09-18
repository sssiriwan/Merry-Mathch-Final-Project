import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ComplaintDetail() {
  const navigate = useNavigate();
  const param = useParams();
  const [name, setName] = useState("");
  const [userId, setUserID] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  // แก้ ปฎิทิน
  const [createAt, setCreateAt] = useState("");
  const [status, setStatus] = useState("");
  const [updateAt, setUpdateAt] = useState("");

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
    setUpdateAt(result.data.data.updated_at);
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

  const h4style = "font-semibold text-pgray-700 mb-2";
  const divStyle = "m-5";

  return (
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
        <p>{createAt}</p>
      </div>
      <div className="flex justify-center">
        <hr className="border-pgray-500 border-1 w-[95%]" />
      </div>
      <div className={divStyle}>
        <h4 className={h4style}>{status} date</h4>
        <p>{formatDate(updateAt)}</p>
      </div>
    </div>
  );
}

export default ComplaintDetail;
