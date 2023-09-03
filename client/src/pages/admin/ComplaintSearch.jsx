import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ComplaintSearch() {
  return (
    <div>
      <div className="w-full flex flex-row bg-white h-20 justify-between items-center px-20 border-b">
        <div className="flex items-center text-lg font-semibold ml-5">Complaint List</div>

        <div className="flex flex-row">
          <Input
            className="flex w-80 p-3 items-center gap-4 rounded-md border border-gray-300 bg-white mr-2"
            placeholder="Search..."
          />
          <div>
            <Select>
              <SelectTrigger className="w-[200px] flex p-3  items-start gap-8  rounded-md border border-gray-400 bg-neutral-0">
                <SelectValue placeholder="All status" />
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
    </div>
  );
}

export default ComplaintSearch;