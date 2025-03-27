import {createContext,useContext,useState} from 'react'

 const SideBarContext = createContext()

export const SideBarProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SideBarContext.Provider value={{isOpen,setIsOpen}}>
            {children}
        </SideBarContext.Provider>
    )
}
export const useSidebar = () => useContext(SideBarContext);
