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
import { useAdmin } from "@/contexts/adminPackageContext";
import { useState } from "react";

function PackageAddDetail() {
  const {
    errorName,
    errorPrice,
    errorLimit,
    setName,
    setLimit,
    icon,
    setIcon,
    setPrice,
    detailList,
    setDetailList,
    errorDetail,
  } = useAdmin();
  const [newDetail, setNewDetail] = useState("");
  console.log(newDetail, "กับ", detailList);

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setIcon({
      ...icon,
      [uniqueId]: event.target.files[0],
    });
  };

  const handleRemoveImage = (event, iconKey) => {
    event.preventDefault();
    delete icon[iconKey];
    setIcon({ ...icon });
  };

  const handleAddDetail = () => {
    if (newDetail.trim() !== "") {
      setDetailList([...detailList, newDetail]);
      setNewDetail("");
    }
  };

  return (
    <CardContent className="grid gap-6 p-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="subject">Package name *</Label>
          <Input
            id="Package"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {errorName && (
            <p className="text-red-500 text-sm font-bold mt-1">{errorName}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="area">Merry limit *</Label>
          <Select
            onValueChange={(event) => {
              setLimit(event);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={25}>25</SelectItem>
              <SelectItem value={45}>45</SelectItem>
              <SelectItem value={75}>75</SelectItem>
              <SelectItem value={100}>100</SelectItem>
            </SelectContent>
          </Select>
          {errorLimit && (
            <p className="text-red-500 text-sm font-bold mt-1">{errorLimit}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <div className="flex items-center mt-1">
          <Input
            id="price"
            type="number"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            className="w-40"
          />
          <span className="ml-3">Baht</span>
        </div>
        {errorPrice && (
          <p className="text-red-500 text-sm font-bold mt-1">{errorPrice}</p>
        )}
      </div>
      <Label htmlFor="subject">Icon *</Label>
      <label
        className={`bg-pgray-100 h-24 w-24 rounded-xl flex flex-col justify-center items-center ${
          Object.keys(icon).length == 1 ? "hidden" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
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
        <div className="text-ppurple-600 text-sm">Upload icon</div>
        <input
          id="upload"
          name="icon"
          type="file"
          onChange={handleFileChange}
          hidden
        />
      </label>
      {Object.keys(icon).map((iconKey) => {
        const file = icon[iconKey];
        return (
          <div
            key={iconKey}
            className="w-24 h-24 bg-pgray-100 rounded-2xl relative flex justify-center items-center"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="object-cover rounded-2xl"
            />
            <button
              onClick={(event) => {
                handleRemoveImage(event, iconKey);
              }}
              className="rounded-full absolute -top-1 -right-1 w-6 h-6 bg-putility-300 text-white text-sm"
            >
              ✕
            </button>
          </div>
        );
      })}
      <div className="border-t"></div>
      <div className="grid gap-4">
        <Label htmlFor="description">PackageDetail</Label>
        <ul>
          {detailList.map((detailItem, index) => (
            <li key={index}>
              <div className="flex  space-x-2 justify-between items-center">
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
                  id={`PackageDetail_${index}`}
                  placeholder=""
                  value={detailItem}
                  onChange={(event) => {
                    const updatedDetailsList = [...detailList];
                    updatedDetailsList[index] = event.target.value;
                    setDetailList(updatedDetailsList);
                  }}
                />
                <Button className="bg-white text-pgray-500">Delete</Button>
              </div>
            </li>
          ))}
        </ul>
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
            value={newDetail}
            onChange={(event) => {
              setNewDetail(event.target.value);
            }}
          />
          <Button className="bg-white text-pgray-500">Delete</Button>
        </div>
      </div>
      {errorDetail && (
        <p className="text-red-500 text-sm font-bold mt-1">{errorDetail}</p>
      )}
      <div className="flex h-20 justify-start items-start">
        <button
          onClick={handleAddDetail}
          className="border bg-pred-500 px-7 py-3 text-white rounded-full"
        >
          + Add detail
        </button>
      </div>
    </CardContent>
  );
}
export default PackageAddDetail;
