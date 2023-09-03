import * as React from "react";
import boy from "../../public/imgs/boy-complaint-form-page.png";
import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

function ComplaintFormPage() {
  const [date, setDate] = React.useState(Date);
  return (
    <div className="">
    <NavbarRegistered />
      <section className="flex h-screen justify-center items-center">
        {/* <small>COMPLAINT</small> */}
        <Card className="w-1/2 border-hidden">
          <CardHeader>
            <CardTitle className="text-pbeige-700">
              <TypographySmall>COMPLAINT</TypographySmall>
            </CardTitle>
            <CardDescription>
              <TypographyH1>If you have any trouble</TypographyH1>
              <TypographyH1>Don't be afraid to tell us!</TypographyH1>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="issue-title">Issue</Label>
                  <Input id="issue-title" placeholder="Enter your issue here" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="issue-desc">Description</Label>
                  <Textarea
                    id="issue-desc"
                    placeholder="Description..."
                  ></Textarea>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="issue-created-at">Date Submitted</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Submit</Button>
          </CardFooter>
        </Card>
        <img src={boy} />
      </section>
      <Footer />
    </div>
  );
}

export default ComplaintFormPage;
