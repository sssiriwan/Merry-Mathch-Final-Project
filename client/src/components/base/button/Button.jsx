import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

export function ButtonDemo(props) {
  return (
    <Button className="bg-pred-500 rounded-full font-semibold">
      {props.children}
    </Button>
  );
}
export function ButtonPrimary(props) {
  return (
    <Badge className=" text-white font-semibold bg-pred-500 hover:bg-pred-400 active:bg-pred-600  focus:bg-pgray-300 ">
      {props.children}
    </Badge>
  );
}

export function ButtonSecondary(props) {
  return (
    <Badge className=" text-pred-600 font-semibold bg-pred-100 hover:bg-pred-200 active:bg-pred-300  focus:bg-pgray-300 ">
      {props.children}
    </Badge>
  );
}
