import * as React from "react";
import boy from "../../public/imgs/boy-complaint-form-page.png";
import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { ButtonDemo } from "@/components/base/button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ComplaintFormPage() {
  const [userId, setUserID] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  // แก้ ปฎิทิน
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("New");

  const navigate = useNavigate();

  const getMyProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    console.log(result.data.data);
    setUserID(result.data.data.user_id);
  };

  const createComplaint = async () => {
    await axios.post("http://localhost:4000/auth/complaint", {
      userId,
      issue,
      description,
      date,
      status,
    });

    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComplaint();
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      <NavbarRegistered />
      <section className="flex h-screen justify-center items-center">
        {/* <small>COMPLAINT</small> */}

        <Card className="w-1/2 h-[90%] mr-5 border-hidden flex flex-col justify-evenly py-20 ">
          <CardHeader className="">
            <CardTitle className="text-pbeige-700">
              <TypographySmall>COMPLAINT</TypographySmall>
            </CardTitle>
            <CardDescription>
              <TypographyH1>If you have any trouble</TypographyH1>
              <TypographyH1>Don't be afraid to tell us!</TypographyH1>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 ">
                  <Label htmlFor="issue-title">Issue</Label>
                  <Input
                    id="issue-title"
                    placeholder="Enter your issue here"
                    onChange={(event) => {
                      setIssue(event.target.value);
                    }}
                    value={issue}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="issue-desc">Description</Label>
                  <Textarea
                    id="issue-desc"
                    placeholder="Description..."
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    value={description}
                  ></Textarea>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="issue-created-at">Date Submitted</Label>
                  <Input
                    className="w-[453px] mb-[40px]"
                    placeholder="01/01/2022"
                    type="date"
                    id="Date"
                    name="Date"
                    defaultValue="2022-01-01"
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                    value={date}
                  />
                </div>
              </div>
              <div className=" pt-6">
                <ButtonDemo>Submit</ButtonDemo>
              </div>
            </form>
          </CardContent>
        </Card>
        <img src={boy} />
      </section>
      <Footer />
    </>
  );
}

export default ComplaintFormPage;
