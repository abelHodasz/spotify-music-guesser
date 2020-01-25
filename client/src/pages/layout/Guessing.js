import React, { useState, useEffect } from "react";

export function Guessing(props) {
    const formatName = name =>{
        let newName = name.split(" - ")[0];
        newName.replace(/\(.*?\)/g  ,'');
        return newName;
    }

    const formatArtists = artists =>{
        return [artists[0]]
    }

    const [track, setTrack] = useState({
        name: formatName(props.name),
        artists: formatArtists(props.artists)
    });

    return (
        <div>
            <p>
            Guess the track name and artist{track.artists.length > 1 ? "s" : ""}
            !
            </p>
            <button onClick={() => props.setGuessing(false)}>
                Back To Play
            </button>
            <p>Track Name : {track.name}, Artist: {track.artists[0]}</p>
        </div>
    );
}
