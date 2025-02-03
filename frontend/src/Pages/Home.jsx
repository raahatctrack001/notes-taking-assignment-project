import { useLocation } from "react-router-dom";
import NotesArea from "../Components/NotesArea";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import Favourites from "../Components/Favourites";

export default function Home(){
    const location = useLocation();   
  const [tab, setTab] = useState('');   
  
  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
      window.scroll(0, 0)
    }, [location.search]);
    return <div className="flex gap-2">
        <div className="w-full max-w-96 border-2 min-h-screen">
            <Sidebar />
        </div>

        {tab === 'home' && <NotesArea />}
        {tab === 'favorites' && <Favourites />} 
        
    </div>
}