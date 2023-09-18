import { ButtonSecondary } from "@/components/base/button/Button";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";






function PackageEditDetail() {
  const navigate = useNavigate();
  const params = useParams();


  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState("");
  const [detail, setDetail] = useState("");


  const getCurrentPackage = async () => {
      const response = await axios.get(`http://localhost:4000/admin/package/${params.packageId}`);
      console.log(response);
      setName(response.data.data.package_name);
      setLimit(response.data.data.package_limit);
      setIcon(response.data.data.package_icon);
      setDetail(response.data.data.package_detail);
    } 
  
    const handleSubmit = async () => {
      const updatePackage = {
        package_name: name,
        package_limit: limit,
      }
      const result = await axios.put(`http://localhost:4000/admin/package/${params.packageId}`, updatePackage)
      navigate('/admin')
    }

  useEffect(() => {
    getCurrentPackage()
  }, [])

  return (
    <CardContent className="grid gap-6 p-5">
      {/* <select value={limit} onChange={(event) => { setLimit(event.target.value)}}>
        <option value={25}>25</option>
        <option value={45}>45</option>
      </select> */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="subject">Package name *</Label>
          <Input
            id="Package"
            placeholder=""
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="area">Merry limit *</Label>
          {/* <Select defaultValue="billing">
            <SelectTrigger id="limit">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
          </Select> */}
          <select
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          >
            <option value={0} disabled></option>
            <option value={25}>25</option>
            <option value={45}>45</option>
            <option value={75}>75</option>
          </select>
        </div>
      </div>
      <Label htmlFor="subject">Icon *</Label>
      <Button
        variant="link"
        className=" bg-pgray-100 text-ppurple-600 text-xs flex flex-col h-20 w-20 align-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M12.5 4.5V19.5M20 12H5"
            stroke="#7D2262"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Upload icon
      </Button>
      <div className="grid gap-4">
        <Label htmlFor="description">PackageDetail</Label>
        <div className="flex h-20 space-x-2 justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="76"
            viewBox="0 0 26 76"
            fill="none"
          >
            <path
              d="M10 34.0001C9.46957 34.0001 8.96086 33.7894 8.58579 33.4143C8.21071 33.0392 8 32.5305 8 32.0001C8 31.4697 8.21071 30.961 8.58579 30.5859C8.96086 30.2108 9.46957 30.0001 10 30.0001C10.5304 30.0001 11.0391 30.2108 11.4142 30.5859C11.7893 30.961 12 31.4697 12 32.0001C12 32.5305 11.7893 33.0392 11.4142 33.4143C11.0391 33.7894 10.5304 34.0001 10 34.0001ZM10 40.0001C9.46957 40.0001 8.96086 39.7894 8.58579 39.4143C8.21071 39.0392 8 38.5305 8 38.0001C8 37.4697 8.21071 36.961 8.58579 36.5859C8.96086 36.2108 9.46957 36.0001 10 36.0001C10.5304 36.0001 11.0391 36.2108 11.4142 36.5859C11.7893 36.961 12 37.4697 12 38.0001C12 38.5305 11.7893 39.0392 11.4142 39.4143C11.0391 39.7894 10.5304 40.0001 10 40.0001ZM10 46.0001C9.46957 46.0001 8.96086 45.7894 8.58579 45.4143C8.21071 45.0392 8 44.5305 8 44.0001C8 43.4697 8.21071 42.961 8.58579 42.5859C8.96086 42.2108 9.46957 42.0001 10 42.0001C10.5304 42.0001 11.0391 42.2108 11.4142 42.5859C11.7893 42.961 12 43.4697 12 44.0001C12 44.5305 11.7893 45.0392 11.4142 45.4143C11.0391 45.7894 10.5304 46.0001 10 46.0001Z"
              fill="#C8CCDB"
            />
            <path
              d="M16 34.0001C15.4696 34.0001 14.9609 33.7894 14.5858 33.4143C14.2107 33.0392 14 32.5305 14 32.0001C14 31.4697 14.2107 30.961 14.5858 30.5859C14.9609 30.2108 15.4696 30.0001 16 30.0001C16.5304 30.0001 17.0391 30.2108 17.4142 30.5859C17.7893 30.961 18 31.4697 18 32.0001C18 32.5305 17.7893 33.0392 17.4142 33.4143C17.0391 33.7894 16.5304 34.0001 16 34.0001ZM16 40.0001C15.4696 40.0001 14.9609 39.7894 14.5858 39.4143C14.2107 39.0392 14 38.5305 14 38.0001C14 37.4697 14.2107 36.961 14.5858 36.5859C14.9609 36.2108 15.4696 36.0001 16 36.0001C16.5304 36.0001 17.0391 36.2108 17.4142 36.5859C17.7893 36.961 18 37.4697 18 38.0001C18 38.5305 17.7893 39.0392 17.4142 39.4143C17.0391 39.7894 16.5304 40.0001 16 40.0001ZM16 46.0001C15.4696 46.0001 14.9609 45.7894 14.5858 45.4143C14.2107 45.0392 14 44.5305 14 44.0001C14 43.4697 14.2107 42.961 14.5858 42.5859C14.9609 42.2108 15.4696 42.0001 16 42.0001C16.5304 42.0001 17.0391 42.2108 17.4142 42.5859C17.7893 42.961 18 43.4697 18 44.0001C18 44.5305 17.7893 45.0392 17.4142 45.4143C17.0391 45.7894 16.5304 46.0001 16 46.0001Z"
              fill="#C8CCDB"
            />
          </svg>
          <Input
            id="Package"
            placeholder=""
            value={detail}
            onChange={(event) => {
              setDetail(event.target.value);
            }}
          />
          <Button className="bg-white text-pgray-500">Delete</Button>
        </div>
      </div>
      <div className="flex h-20 justify-start items-start">
        <button
          // onClick={handleSubmit}
          className="border bg-pred-500 px-7 py-3 text-white rounded-full"
        >
          + Add detail
        </button>
      </div>
    </CardContent>
  );
}
export default PackageEditDetail;
