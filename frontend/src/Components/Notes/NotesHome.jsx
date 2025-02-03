import { useEffect, useState } from "react";
import Favourites from "./Favourites";
import NotesArea from "./NotesArea";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

export default function NotesHome(){
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