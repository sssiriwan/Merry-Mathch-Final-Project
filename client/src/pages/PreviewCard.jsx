import axios from "axios"
import { useEffect, useState } from "react"

function PreviewCard({clicked, setClicked, userId}) {
    const [isLoading, setIsLoading] = useState(false)
    const initialValue = {
        fullname: "",
        date_of_birth: "",
        location: "",
        city: "",
        sexual_identity: "",
        sexual_preference: "",
        racial_preference: "",
        meeting_interest: "",
        about_me: "",
    }
    console.log(userId)
    const [profile, setProfile] = useState(initialValue);
    const [hobbies, setHobbies] = useState({})
    const [avatars, setAvatars] = useState({})
    const [count, setCount] = useState(2)
    console.log(count)
    const handleNextImage = () => {
        if(count < 6) {
            setCount(count + 1)
        } else {
            setCount(2)
        }
    };
    
    const handlePrevImage = () => {
        if(count === 2) {
            setCount(6)
        } else {
            setCount(count - 1)
        }
    }
    let hobbyArr = []
    for(const hobby in hobbies) {
        if(hobbies[hobby] == null) {
            break;
        }
        if(typeof hobbies[hobby] == 'string') {
            hobbyArr.push(hobbies[hobby])
        }
    }
    console.log(hobbyArr)
    
    const age = (birthday) => {
        const today = new Date();
        const userAge =
        today.getFullYear() -
        birthday.getFullYear() -
        (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
        today.getDate() < birthday.getDate()));
        return userAge;
    };
        
    const getData = async () => {
        setIsLoading(true)
        const result = await axios.get(`http://localhost:4000/post/profile/${userId}`)
        console.log(result.data.data)
        setIsLoading(false)
        setProfile(result.data.data)
        setHobbies(result.data.data.hobbies)
        setAvatars(result.data.data.profile_image)
        console.log("รูปจ้ารูป",result.data.data.profile_image)
    }
    useEffect(()=>{
        getData()
    }, [])

    return (
        <div id="popup-preview-card" className="w-[1140px] h-[740px] bg-white border rounded-4xl absolute top-1/4 flex justify-center items-center shadow-3xl">
            <div className="w-[980px] h-[579px] flex justify-between">
                <div className="shadow-md rounded-4xl w-[478px] h-[526px]">
                    {!isLoading && (
                        <>
                        <img src={Object.values(avatars)[count]} className="w-[478px] h-[478px] object-cover rounded-4xl" />
                    <div className="flex items-center justify-between px-10">
                        <div>{count-1}/5</div>
                        <div>
                            {/* ปุ่มใน รูป <- -> */}
                            <button onClick={handlePrevImage} className="rounded-3xl hover:scale-125">
                                <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M28.9732 18.9509H17.5039L22.5147 13.8056C22.9151 13.3944 22.9151 12.7196 22.5147 12.3084C22.1142 11.8972 21.4674 11.8972 21.0669 12.3084L14.3003 19.2567C13.8999 19.6679 13.8999 20.3321 14.3003 20.7433L21.0669 27.6916C21.4674 28.1028 22.1142 28.1028 22.5147 27.6916C22.9151 27.2804 22.9151 26.6161 22.5147 26.2049L17.5039 21.0596H28.9732C29.5379 21.0596 30 20.5852 30 20.0053C30 19.4254 29.5379 18.9509 28.9732 18.9509Z"
                                    fill="#9AA1B9"
                                />
                                </svg>
                            </button>
                            <button onClick={handleNextImage} className="rounded-3xl hover:scale-125">
                                <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.0268 21.0491L26.4961 21.0491L21.4853 26.1944C21.0849 26.6056 21.0849 27.2804 21.4853 27.6916C21.8858 28.1028 22.5326 28.1028 22.9331 27.6916L29.6997 20.7433C30.1001 20.3321 30.1001 19.6679 29.6997 19.2567L22.9331 12.3084C22.5326 11.8972 21.8858 11.8972 21.4853 12.3084C21.0849 12.7196 21.0849 13.3839 21.4853 13.7951L26.4961 18.9404L15.0268 18.9404C14.4621 18.9404 14 19.4148 14 19.9947C14 20.5746 14.4621 21.0491 15.0268 21.0491Z"
                                    fill="#9AA1B9"
                                />
                                </svg>
                            </button>
                        </div>
                    </div>
                    </>
                    )}
                    {isLoading && <h1>load อยู่ อย่ารีบ</h1>}
                </div>
                <div className="w-[478px] h-[579px] flex flex-col ml-10" onClick={() => { setClicked(!clicked)} }>
                    <div className="w-[418px] h-[96px] flex flex-col">
                        <div className="flex">
                            <h1 className=" font-extrabold text-5xl">{profile.fullname}</h1>
                            <h1 className="font-extrabold text-5xl text-pgray-700 ml-4">{age(new Date(profile.date_of_birth))}</h1>
                        </div>
                        <div className="flex mt-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6276 22.7196L11.6312 22.7208C11.8676 22.824 11.9996 22.8 11.9996 22.8C11.9996 22.8 12.1316 22.824 12.3692 22.7208L12.3716 22.7196L12.3788 22.716L12.4004 22.7064C12.5143 22.6535 12.6268 22.5975 12.7376 22.5384C12.9608 22.4232 13.2728 22.2504 13.646 22.0188C14.39 21.558 15.38 20.8596 16.3748 19.9008C18.362 17.9856 20.3996 14.9916 20.3996 10.8C20.3996 9.69692 20.1823 8.60462 19.7602 7.58548C19.3381 6.56635 18.7193 5.64034 17.9393 4.86033C17.1593 4.08032 16.2333 3.46158 15.2141 3.03944C14.195 2.6173 13.1027 2.40002 11.9996 2.40002C10.8965 2.40002 9.8042 2.6173 8.78507 3.03944C7.76593 3.46158 6.83992 4.08032 6.05991 4.86033C5.2799 5.64034 4.66116 6.56635 4.23902 7.58548C3.81688 8.60462 3.59961 9.69692 3.59961 10.8C3.59961 14.9904 5.63721 17.9856 7.62561 19.9008C8.45811 20.7004 9.37233 21.4103 10.3532 22.0188C10.7331 22.2547 11.124 22.4726 11.5244 22.6716L11.5988 22.7064L11.6204 22.716L11.6276 22.7196ZM11.9996 13.5C12.7157 13.5 13.4024 13.2156 13.9088 12.7092C14.4151 12.2029 14.6996 11.5161 14.6996 10.8C14.6996 10.0839 14.4151 9.39718 13.9088 8.89084C13.4024 8.38449 12.7157 8.10002 11.9996 8.10002C11.2835 8.10002 10.5968 8.38449 10.0904 8.89084C9.58407 9.39718 9.29961 10.0839 9.29961 10.8C9.29961 11.5161 9.58407 12.2029 10.0904 12.7092C10.5968 13.2156 11.2835 13.5 11.9996 13.5Z" fill="#FFB1C8"/>
                            </svg>
                            <h2 className="ml-3 text-xl text-pgray-700 font-semibold">{profile.location}, {profile.city}</h2>
                        </div>
                    </div>
                    <div className=" my-11 grid gap-4">
                        <div className="flex">
                            <h1 className="w-52">Sexual Identities</h1>
                            <h1 className=" font-semibold text-pgray-700 text-xl">{profile.sexual_identity}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="w-52">Sexual Preferences</h1>
                            <h1 className=" font-semibold text-pgray-700 text-xl">{profile.sexual_preference}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="w-52">Racial Preferences</h1>
                            <h1 className=" font-semibold text-pgray-700 text-xl">{profile.racial_preference}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="w-52">Meeting Interests</h1>
                            <h1 className=" font-semibold text-pgray-700 text-xl">{profile.meeting_interest}</h1>
                        </div>
                    </div>
                    <div className="text-pgray-900 mb-10 grid gap-4">
                        <h1 className="font-bold text-2xl leading-8 tracking-tight">About me</h1>
                        <p>{profile.about_me}</p>
                    </div>
                    <div className="text-pgray-900 grid gap-4">
                        <h1 className="font-bold text-2xl leading-8 tracking-tight">Hobbies and Interests</h1>
                        <div className="flex">
                            {hobbyArr.map((tag, index) => {
                            return (
                            <div key={index} className="border-2 border-ppurple-300 text-ppurple-600 rounded-xl flex py-2 px-4 mr-3">
                                {tag}
                            </div>
                        )})}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className=" bg-orange-50 flex">
                <img src={profile.avatar_url} className="w-[500px] h-[500px] object-cover rounded-2xl" />
            </div>
            <div className="ml-10 mt-10">
                <div>
                    <div className="flex">
                        <h1 className="font-extrabold text-5xl mr-5">{profile.fullname}</h1>
                        <h1 className="font-extrabold text-5xl text-pgray-700">{profile.age}</h1>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default PreviewCard