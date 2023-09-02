import { Button } from "@/components/ui/button"

export function ButtonDemo(props) {
  return <Button className="bg-pred-500 rounded-full font-semibold"
   >{props.children}</Button>
}