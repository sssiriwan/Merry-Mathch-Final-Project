function MatchCard(props) {
  return (
    <>
      <div className="relative w-[550px] h-[550px] z-10" id="card">
        <div className="" id="card-detail">
          <img
            className="w-[550px] h-[550px] rounded-3xl object-cover"
            src={props.user.avatar_url}
          />
          <div className="shadowcss"></div>
          {/* แถบชื่อ และ ปุ่ม */}
          <div className="w-full absolute bottom-10 z-10 flex justify-between items-center px-10">
            {/* ชื่อ */}
            <div className="flex font-bold text-3xl text-white items-center">
              <h1>{props.user.fullname}</h1>
              <h2 className="ml-2 text-pgray-400">{props.user.age}</h2>
              <button className="rounded-full w-7 h-7 flex justify-center items-center ml-2 bg-white bg-opacity-30 hover:bg-opacity-10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.531497 8.47203C0.41398 8.16668 0.41398 7.82858 0.531497 7.52323C1.11328 6.01482 2.13826 4.71798 3.47146 3.80347C4.80467 2.88896 6.38358 2.39967 8.0003 2.40002C11.4059 2.40002 14.3147 4.52802 15.4691 7.52803C15.5867 7.83283 15.5859 8.17123 15.4691 8.47683C14.8873 9.98523 13.8623 11.2821 12.5291 12.1966C11.1959 13.1111 9.61701 13.6004 8.0003 13.6C4.5947 13.6 1.6859 11.472 0.531497 8.47203ZM11.2003 8.00003C11.2003 8.84872 10.8632 9.66265 10.263 10.2628C9.66292 10.8629 8.84899 11.2 8.0003 11.2C7.1516 11.2 6.33767 10.8629 5.73755 10.2628C5.13744 9.66265 4.8003 8.84872 4.8003 8.00003C4.8003 7.15133 5.13744 6.3374 5.73755 5.73728C6.33767 5.13717 7.1516 4.80002 8.0003 4.80002C8.84899 4.80002 9.66292 5.13717 10.263 5.73728C10.8632 6.3374 11.2003 7.15133 11.2003 8.00003Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            {/* ปุ่ม */}
            <div>
              <button
                className="rounded-3xl hover:scale-125"
                onClick={props.onClick2}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.9732 18.9509H17.5039L22.5147 13.8056C22.9151 13.3944 22.9151 12.7196 22.5147 12.3084C22.1142 11.8972 21.4674 11.8972 21.0669 12.3084L14.3003 19.2567C13.8999 19.6679 13.8999 20.3321 14.3003 20.7433L21.0669 27.6916C21.4674 28.1028 22.1142 28.1028 22.5147 27.6916C22.9151 27.2804 22.9151 26.6161 22.5147 26.2049L17.5039 21.0596H28.9732C29.5379 21.0596 30 20.5852 30 20.0053C30 19.4254 29.5379 18.9509 28.9732 18.9509Z"
                    fill="#F6F7FC"
                  />
                </svg>
              </button>
              <button
                className="rounded-3xl hover:scale-125"
                onClick={props.onClick}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0268 21.0491L26.4961 21.0491L21.4853 26.1944C21.0849 26.6056 21.0849 27.2804 21.4853 27.6916C21.8858 28.1028 22.5326 28.1028 22.9331 27.6916L29.6997 20.7433C30.1001 20.3321 30.1001 19.6679 29.6997 19.2567L22.9331 12.3084C22.5326 11.8972 21.8858 11.8972 21.4853 12.3084C21.0849 12.7196 21.0849 13.3839 21.4853 13.7951L26.4961 18.9404L15.0268 18.9404C14.4621 18.9404 14 19.4148 14 19.9947C14 20.5746 14.4621 21.0491 15.0268 21.0491Z"
                    fill="#F6F7FC"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* matching button */}
          {/* เด้ง  left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] */}
        </div>
      </div>
    </>
  );
}

export default MatchCard;
