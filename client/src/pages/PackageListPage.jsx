import axios from "axios";
import AdminControlPanel from "./admin/AdminControlPanel";
import PackageSearch from "./admin/PackageSearch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import merryicon from "../../public/icons/merry.png"

const packagedetail = [
  {
    no: "1",
    icon: "lorem ipsum",
    Packagename: "asdasdasdasdas",
    MerryLimit: "23",
    Createddate: "23/02/2022",
    Updatedate: "25/02/2022",
  },
  {
    no: "2",
    icon: "lorem ipsum",
    Packagename: "asdasdasdasdas",
    MerryLimit: "25",
    Createddate: "23/02/2022",
    Updatedate: "25/02/2022",
  },
];

function PackageListPage() {
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
      <div className="w-full flex flex-col bg-white items-center">
        <div className="w-full flex bg-white h-20 justify-between items-center px-20 border-b">
          Merry Package
          <PackageSearch />
        </div>
        <div className="w-full flex-col  bg-pgray-200 items-center">
          <div class="w-full w-5/9 bg-white flex flex-col justify-start items-center">
            <div class="w-5/9 flex bg-white mt-12 rounded-2xl shadow-lg">
              <Table>
                <TableHeader class="bg-pgray-300 rounded-t-2xl">
                  <TableRow className="text-base">
                    <TableHead className="w-1/9 "></TableHead>
                    <TableHead className="w-1/9 "></TableHead>
                    <TableHead className="w-1/9 ">Icon</TableHead>
                    <TableHead className="w-3/9">Package name</TableHead>
                    <TableHead className="w-1/9 ">Merry Limit</TableHead>
                    <TableHead className="w-1/9">Created date</TableHead>
                    <TableHead className="w-1/9">Update date</TableHead>
                    <TableHead className="w-1/9"></TableHead>
                    <TableHead className="w-1/9"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {items.map((packagedetail, index) => (
                    <TableRow key={index}>
                      <TableCell class=" flex flex-row m-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="18"
                          viewBox="0 0 5 18"
                          fill="none"
                        >
                          <path
                            d="M2.5 2V2.01V2ZM2.5 9V9.01V9ZM2.5 16V16.01V16ZM2.5 3C2.23478 3 1.98043 2.89464 1.79289 2.70711C1.60536 2.51957 1.5 2.26522 1.5 2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1C2.76522 1 3.01957 1.10536 3.20711 1.29289C3.39464 1.48043 3.5 1.73478 3.5 2C3.5 2.26522 3.39464 2.51957 3.20711 2.70711C3.01957 2.89464 2.76522 3 2.5 3ZM2.5 10C2.23478 10 1.98043 9.89464 1.79289 9.70711C1.60536 9.51957 1.5 9.26522 1.5 9C1.5 8.73478 1.60536 8.48043 1.79289 8.29289C1.98043 8.10536 2.23478 8 2.5 8C2.76522 8 3.01957 8.10536 3.20711 8.29289C3.39464 8.48043 3.5 8.73478 3.5 9C3.5 9.26522 3.39464 9.51957 3.20711 9.70711C3.01957 9.89464 2.76522 10 2.5 10ZM2.5 17C2.23478 17 1.98043 16.8946 1.79289 16.7071C1.60536 16.5196 1.5 16.2652 1.5 16C1.5 15.7348 1.60536 15.4804 1.79289 15.2929C1.98043 15.1054 2.23478 15 2.5 15C2.76522 15 3.01957 15.1054 3.20711 15.2929C3.39464 15.4804 3.5 15.7348 3.5 16C3.5 16.2652 3.39464 16.5196 3.20711 16.7071C3.01957 16.8946 2.76522 17 2.5 17Z"
                            stroke="#D6D9E4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="5"
                            height="18"
                            viewBox="0 0 5 18"
                            fill="none"
                          >
                            <path
                              d="M2.5 2V2.01V2ZM2.5 9V9.01V9ZM2.5 16V16.01V16ZM2.5 3C2.23478 3 1.98043 2.89464 1.79289 2.70711C1.60536 2.51957 1.5 2.26522 1.5 2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1C2.76522 1 3.01957 1.10536 3.20711 1.29289C3.39464 1.48043 3.5 1.73478 3.5 2C3.5 2.26522 3.39464 2.51957 3.20711 2.70711C3.01957 2.89464 2.76522 3 2.5 3ZM2.5 10C2.23478 10 1.98043 9.89464 1.79289 9.70711C1.60536 9.51957 1.5 9.26522 1.5 9C1.5 8.73478 1.60536 8.48043 1.79289 8.29289C1.98043 8.10536 2.23478 8 2.5 8C2.76522 8 3.01957 8.10536 3.20711 8.29289C3.39464 8.48043 3.5 8.73478 3.5 9C3.5 9.26522 3.39464 9.51957 3.20711 9.70711C3.01957 9.89464 2.76522 10 2.5 10ZM2.5 17C2.23478 17 1.98043 16.8946 1.79289 16.7071C1.60536 16.5196 1.5 16.2652 1.5 16C1.5 15.7348 1.60536 15.4804 1.79289 15.2929C1.98043 15.1054 2.23478 15 2.5 15C2.76522 15 3.01957 15.1054 3.20711 15.2929C3.39464 15.4804 3.5 15.7348 3.5 16C3.5 16.2652 3.39464 16.5196 3.20711 16.7071C3.01957 16.8946 2.76522 17 2.5 17Z"
                              stroke="#D6D9E4"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="18"
                          viewBox="0 0 5 18"
                          fill="none"
                        >
                          <path
                            d="M2.5 2V2.01V2ZM2.5 9V9.01V9ZM2.5 16V16.01V16ZM2.5 3C2.23478 3 1.98043 2.89464 1.79289 2.70711C1.60536 2.51957 1.5 2.26522 1.5 2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1C2.76522 1 3.01957 1.10536 3.20711 1.29289C3.39464 1.48043 3.5 1.73478 3.5 2C3.5 2.26522 3.39464 2.51957 3.20711 2.70711C3.01957 2.89464 2.76522 3 2.5 3ZM2.5 10C2.23478 10 1.98043 9.89464 1.79289 9.70711C1.60536 9.51957 1.5 9.26522 1.5 9C1.5 8.73478 1.60536 8.48043 1.79289 8.29289C1.98043 8.10536 2.23478 8 2.5 8C2.76522 8 3.01957 8.10536 3.20711 8.29289C3.39464 8.48043 3.5 8.73478 3.5 9C3.5 9.26522 3.39464 9.51957 3.20711 9.70711C3.01957 9.89464 2.76522 10 2.5 10ZM2.5 17C2.23478 17 1.98043 16.8946 1.79289 16.7071C1.60536 16.5196 1.5 16.2652 1.5 16C1.5 15.7348 1.60536 15.4804 1.79289 15.2929C1.98043 15.1054 2.23478 15 2.5 15C2.76522 15 3.01957 15.1054 3.20711 15.2929C3.39464 15.4804 3.5 15.7348 3.5 16C3.5 16.2652 3.39464 16.5196 3.20711 16.7071C3.01957 16.8946 2.76522 17 2.5 17Z"
                            stroke="#D6D9E4"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </TableCell>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>
                      <img src={merryicon} className="w-10 h-10" />
                      </TableCell>
                      <TableCell>{packagedetail.package_name}</TableCell>
                      <TableCell>{packagedetail.package_limit}</TableCell>
                      <TableCell>{packagedetail.created_at}</TableCell>
                      <TableCell>{packagedetail.updated_at}</TableCell>
                      <TableCell>
                        <Button class="bg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.5 4.47795V4.70495C17.799 4.82373 19.0927 4.99454 20.378 5.21695C20.4751 5.23376 20.5678 5.26952 20.6511 5.32218C20.7343 5.37485 20.8063 5.4434 20.8631 5.52391C20.9198 5.60441 20.9601 5.69531 20.9817 5.7914C21.0033 5.88749 21.0058 5.9869 20.989 6.08395C20.9722 6.18099 20.9364 6.27378 20.8838 6.35701C20.8311 6.44023 20.7626 6.51227 20.682 6.56901C20.6015 6.62575 20.5106 6.66607 20.4146 6.68768C20.3185 6.70929 20.2191 6.71176 20.122 6.69495L19.913 6.65995L18.908 19.7299C18.8501 20.4835 18.5098 21.1875 17.9553 21.701C17.4008 22.2146 16.6728 22.4999 15.917 22.4999H8.08401C7.3282 22.4999 6.60026 22.2146 6.04573 21.701C5.4912 21.1875 5.15095 20.4835 5.09301 19.7299L4.08701 6.65995L3.87801 6.69495C3.78096 6.71176 3.68155 6.70929 3.58546 6.68768C3.48937 6.66607 3.39847 6.62575 3.31796 6.56901C3.15537 6.45442 3.04495 6.27994 3.01101 6.08395C2.97706 5.88795 3.02236 5.6865 3.13694 5.52391C3.25153 5.36131 3.42601 5.2509 3.62201 5.21695C4.90727 4.99427 6.20099 4.82347 7.50001 4.70495V4.47795C7.50001 2.91395 8.71301 1.57795 10.316 1.52695C11.4387 1.49102 12.5623 1.49102 13.685 1.52695C15.288 1.57795 16.5 2.91395 16.5 4.47795ZM10.364 3.02595C11.4547 2.99106 12.5463 2.99106 13.637 3.02595C14.39 3.04995 15 3.68395 15 4.47795V4.59095C13.0018 4.46959 10.9982 4.46959 9.00001 4.59095V4.47795C9.00001 3.68395 9.60901 3.04995 10.364 3.02595ZM10.009 8.97095C10.0052 8.87246 9.98203 8.77568 9.94082 8.68614C9.89961 8.59661 9.84117 8.51606 9.76883 8.44911C9.69649 8.38216 9.61168 8.33011 9.51923 8.29594C9.42678 8.26177 9.3285 8.24614 9.23001 8.24995C9.13152 8.25376 9.03474 8.27693 8.9452 8.31814C8.85567 8.35935 8.77512 8.41779 8.70817 8.49012C8.64122 8.56246 8.58917 8.64728 8.555 8.73973C8.52083 8.83218 8.5052 8.93046 8.50901 9.02895L8.85601 18.0289C8.8637 18.2277 8.95004 18.4153 9.09604 18.5504C9.16833 18.6173 9.25309 18.6693 9.34548 18.7035C9.43787 18.7376 9.53608 18.7533 9.63451 18.7494C9.73293 18.7456 9.82964 18.7225 9.91912 18.6813C10.0086 18.6401 10.0891 18.5817 10.156 18.5094C10.2229 18.4371 10.2749 18.3524 10.3091 18.26C10.3432 18.1676 10.3588 18.0694 10.355 17.9709L10.009 8.97095ZM15.489 9.02895C15.4963 8.92857 15.4834 8.82773 15.4509 8.73246C15.4185 8.63719 15.3672 8.54942 15.3001 8.47439C15.233 8.39936 15.1515 8.3386 15.0604 8.29574C14.9694 8.25287 14.8706 8.22877 14.77 8.22488C14.6694 8.22098 14.5691 8.23737 14.475 8.27307C14.3809 8.30877 14.2949 8.36304 14.2222 8.43266C14.1496 8.50227 14.0916 8.58581 14.0519 8.67829C14.0122 8.77077 13.9915 8.8703 13.991 8.97095L13.644 17.9709C13.6363 18.1699 13.708 18.3637 13.8432 18.5098C13.9784 18.6559 14.1661 18.7423 14.365 18.7499C14.5639 18.7576 14.7577 18.686 14.9038 18.5508C15.0499 18.4156 15.1363 18.2279 15.144 18.0289L15.489 9.02895Z"
                              fill="#FF6390"
                            />
                          </svg>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button class="bg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21.7313 2.26906C21.239 1.77687 20.5714 1.50037 19.8753 1.50037C19.1791 1.50037 18.5115 1.77687 18.0193 2.26906L16.8623 3.42606L20.5743 7.13806L21.7313 5.98106C22.2234 5.48879 22.4999 4.82117 22.4999 4.12506C22.4999 3.42894 22.2234 2.76133 21.7313 2.26906ZM19.5133 8.19906L15.8013 4.48706L7.40125 12.8871C6.78411 13.5039 6.33043 14.2648 6.08125 15.1011L5.28125 17.7861C5.24263 17.9156 5.23975 18.0532 5.27292 18.1843C5.30608 18.3154 5.37407 18.435 5.46967 18.5306C5.56527 18.6262 5.68494 18.6942 5.81601 18.7274C5.94709 18.7606 6.08469 18.7577 6.21425 18.7191L8.89925 17.9191C9.73548 17.6699 10.4964 17.2162 11.1133 16.5991L19.5133 8.19906Z"
                              fill="#FF6390"
                            />
                            <path
                              d="M5.25 5.25C4.45435 5.25 3.69129 5.56607 3.12868 6.12868C2.56607 6.69129 2.25 7.45435 2.25 8.25V18.75C2.25 19.5456 2.56607 20.3087 3.12868 20.8713C3.69129 21.4339 4.45435 21.75 5.25 21.75H15.75C16.5456 21.75 17.3087 21.4339 17.8713 20.8713C18.4339 20.3087 18.75 19.5456 18.75 18.75V13.5C18.75 13.3011 18.671 13.1103 18.5303 12.9697C18.3897 12.829 18.1989 12.75 18 12.75C17.8011 12.75 17.6103 12.829 17.4697 12.9697C17.329 13.1103 17.25 13.3011 17.25 13.5V18.75C17.25 19.1478 17.092 19.5294 16.8107 19.8107C16.5294 20.092 16.1478 20.25 15.75 20.25H5.25C4.85218 20.25 4.47064 20.092 4.18934 19.8107C3.90804 19.5294 3.75 19.1478 3.75 18.75V8.25C3.75 7.85218 3.90804 7.47064 4.18934 7.18934C4.47064 6.90804 4.85218 6.75 5.25 6.75H10.5C10.6989 6.75 10.8897 6.67098 11.0303 6.53033C11.171 6.38968 11.25 6.19891 11.25 6C11.25 5.80109 11.171 5.61032 11.0303 5.46967C10.8897 5.32902 10.6989 5.25 10.5 5.25H5.25Z"
                              fill="#FF6390"
                            />
                          </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageListPage;
