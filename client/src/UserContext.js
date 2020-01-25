import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) =>{

    const params = new URLSearchParams(window.location.search);
    let access_token = params.get("access_token");
    let user_id = params.get("user_id");

    if (params == null || access_token == null || user_id == null){
        const storage = JSON.parse(localStorage.getItem("context"));
        if (!storage) {
            window.location.href = "localhost:3000";
        }
        else{
            access_token = storage.accessToken;
            user_id = storage.userId;
        }
    }else{
        refreshLocalStorage(access_token, user_id);
    }

    const [state, setState] = useState(
        {
            accessToken: access_token,
            userId: user_id,
        }
    )

    return(
        <UserContext.Provider value={[state,setState]}>
            {props.children}
        </UserContext.Provider>
    );

    
}

function refreshLocalStorage(access_token, user_id) {
    localStorage.setItem("context", JSON.stringify({
        accessToken: access_token,
        userId: user_id
    }));
}


