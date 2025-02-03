import { BsCalendarCheck, BsHouseFill, BsImage, BsStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom'


export default function Sidebar(){
    return <div className="flex flex-col min-h-screen justify-between">
        <div className="">
            <div className="border-b-2 h-20 pl-2 text-2xl font-bold flex justify-start items-center gap-4">
                <BsCalendarCheck />
                <h1> AI Notes </h1>
            </div>
            <div>
                <Link to={'/dashboard?tab=home'}>
                    <div 
                        className="text-2xl flex justify-start items-center gap-2 h-14  rounded-3xl pl-2 text-gray-500 font-semibold hover:bg-purple-200 hover:text-purple-900"
                        title="Hidden Posts" // Tooltip for Hidden Posts
                      >
                        <BsHouseFill className="text-2xl"/>
                        Home
                    </div>
                </Link>
                <Link to={'/dashboard?tab=favorites'}>
                    <div 
                        className="text-2xl flex justify-start items-center gap-2 h-14 rounded-3xl pl-2 text-gray-500 font-semibold hover:bg-purple-200 hover:text-purple-900"
                        title="Hidden Posts" // Tooltip for Hidden Posts
                        >
                        <BsStarFill className="text-2xl"/>
                        Favourites
                    </div>
                </Link>
            </div>
        </div>
        <div className="flex justify-start items-center text-2xl text-gray border-2 rounded-xl bg-purple-300 mb-20 w-56">
            <BsImage />
            User@someone
        </div>
    </div>
}