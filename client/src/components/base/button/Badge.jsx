import { Badge } from "@/components/ui/badge"

function BadgeDemo(props) {
    return <Badge className={props.className}>{props.status}</Badge>
}

export default BadgeDemo;