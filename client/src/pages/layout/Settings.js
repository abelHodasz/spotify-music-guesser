import React, {Suspense, useState } from "react";
import Playlists from "../Playlists";

import { Link } from "react-router-dom";

const Settings = () => {
    console.log("Render Settings");
    const [playlists, setPlaylists] = useState([]);


    const select = (playlist)=>{
        let index = playlists.indexOf(playlist);
        if(index !== -1){
            setPlaylists(playlists.slice(0, index).concat(playlists.slice(-index)));
        }else{
            setPlaylists(playlists.concat(playlist));
        }
    }
    

    return (
        <React.Fragment>
            <div>
                <Link
                    to={{
                        pathname: "/Game",
                        state: playlists
                    }}
                >
                    Start game
                </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Playlists select={(playlist)=>select(playlist)} />
            </Suspense>
        </React.Fragment>
    );
};




export default Settings;
