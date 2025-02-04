import { BsCalendarCheck, BsHouseFill, BsStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signoutSuccess } from "../../redux/features/user.slice";
import { useEffect, useState } from "react";


export default function DashSidebar({user}){
    const location = useLocation();   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tab, setTab] = useState("");
    // console.log("user in sidebar", user)

    useEffect(() => {
          const urlParams = new URLSearchParams(location.search);
          const tabFromUrl = urlParams.get('tab');
          if (tabFromUrl) {
            setTab(tabFromUrl);
          }
          window.scroll(0, 0)
        }, [location.search]);

    async function handleLogout(){
        try {
            const response = await fetch("/api/v1/auth/logout", {
                method: "POST",
            })

            const data = await response.json();
            if(data.success){
                console.log(data);
                dispatch(signoutSuccess());
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <div className="flex flex-col min-h-screen justify-between">
        <div className="">
            <div className="border-b-2 h-20 pl-2 text-2xl font-bold flex justify-start items-center gap-4">
                <BsCalendarCheck />
                <h1>{user?.fullName}&apos;s Notes</h1>

            </div>
            <div>
                <Link to={'/dashboard?tab=home'}>
                    <div 
                        className={`text-xl flex justify-start items-center gap-2 h-10 rounded-3xl pl-2 text-gray-500 font-semibold hover:bg-purple-200 hover:text-purple-900 ${tab == 'home' && 'text-purple-900 bg-purple-200'} `}
                        title="Hidden Posts" // Tooltip for Hidden Posts
                      >
                        <BsHouseFill className="text-2xl"/>
                        Home
                    </div>
                </Link>
                <Link to={'/dashboard?tab=favorites'}>
                    <div 
                        className={`text-xl flex justify-start items-center gap-2 h-10 rounded-3xl pl-2 text-gray-500 font-semibold hover:bg-purple-200 hover:text-purple-900  ${tab === 'favorites' && 'text-purple-900 bg-purple-200'}`}
                        title="Hidden Posts" // Tooltip for Hidden Posts
                        >
                        <BsStarFill className="text-2xl"/>
                        Favourites
                    </div>
                </Link>
            </div>
        </div>
        <div className="flex gap-2 relative bottom-10 justify-start items-center pl-10 ">
            <div className="flex justify-center items-center gap-2">                
                <span className="bg-black text-white h-8 w-8 flex justify-center items-center font-semibold rounded-full"> {user.fullName[0]} </span> <p> {user.fullName} </p>
            </div>
            <button className="border px-2 bg-gray-500 text-white rounded-xl" onClick={handleLogout}>
                logout
            </button>
        </div>
    </div>
}