import React, { useState } from 'react'

let UserContext = React.createContext();

export default UserContext;



function UserContextProvider({children}){
    const[user,setUser] = useState(null);
    
    return (
        <UserContext.Provider value={{user,setUser}}>
         {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider};