import { useState } from "react";
import ComplaintAction from "./ComplaintAction";
import ComplaintDetail from "./ComplaintDetail";
import AdminControlPanel from "./AdminControlPanel";
import { Button } from "@/components/ui/button";
import BadgeDemo from "@/components/base/button/Badge";

function ComplaintDetailPage() {
  const [issueTitle, setIssueTitle] = useState("I was insulted by Ygritte");
  const pendingStatus = "h-7 ml-2 rounded-lg bg-pyellow-100 text-black";
  const resolveStatus = "h-7 ml-2 rounded-lg bg-pgreen-100 text-pgreen-500";
  const cancelStatus = "h-7 ml-2 rounded-lg bg-pgray-200 text-pgray-700";

  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex flex-col bg-pgray-200 items-center">
        <div className="w-full flex flex-row bg-white h-20 justify-between items-center px-20 border-b">
          <div className="flex items-center">
            <Button variant="ghost">
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
            <div className="text-lg font-semibold ml-5">{issueTitle}</div>
            <BadgeDemo status="resolved" className={resolveStatus} />
          </div>
          <ComplaintAction />
        </div>
        <div className="bg-white rounded-2xl border-pgray-200 border-2 m-7 w-11/12">
          <ComplaintDetail />
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetailPage;
