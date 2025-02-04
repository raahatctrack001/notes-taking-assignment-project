import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../Components/Notes/DashSidebar";
import NotesArea from "../../Components/Notes/NotesArea";
import Favourites from "../../Components/Notes/Favourites";
import { useSelector } from "react-redux";

export default function Dashboard(){
    const location = useLocation();   
    const [tab, setTab] = useState(''); 
    const { currentUser } = useSelector(state=>state.user)  
    // console.log("current user from redux", currentUser)
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
      window.scroll(0, 0)
    }, [location.search]);
    
    return (
      <div className="flex gap-2 h-screen">
        {/* Sidebar - Fixed Position */}
        <div className="w-full max-w-60 border-2 h-screen sticky top-0">
          <DashSidebar user={currentUser} />
        </div>
    
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "home" && <NotesArea />}
          {tab === "favorites" && <Favourites />}
        </div>
      </div>
    );
    
}