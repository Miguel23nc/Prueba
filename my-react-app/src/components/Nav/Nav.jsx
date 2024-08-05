import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Options from "../../recicle/Option"
import Logout from "../Logout/Logout"
import SearchBar from "../Nav/SearchBar"
const imagen = "https://cdn-icons-png.freepik.com/512/10975/10975953.png"

const Nav = () => {
    const { user } = useAuth()

    return (
        <div className="flex justify-between ml-20 items-center px-12
                        h-20  border-b border-t-stone-400">
            <div className=" flex justify-around 
                            items-center  m-2 rounded-lg h-14">
                <img src={imagen} alt="buscador"
                    className="w-10 bg-white h-200" />
                <SearchBar></SearchBar>
            </div>
            {user ? (
                <div className=" flex justify-around items-center m-2  h-1">
                    <Options
                        content={<p>🔔</p>}
                    />
                    <Options
                        content={<img src="" alt="foto"></img>}
                        children={
                            <div className="flex flex-col justify-center items-start"  >
                                <Logout></Logout>
                                <button className="m-2">
                                    <a href="/profile">
                                        Perfil
                                    </a>
                                </button>
                                <button className="m-2">
                                    <a href="/settings">
                                        Configuración
                                    </a>
                                </button>
                            </div>
                        }
                        classname1="mr-0"
                    />

                </div>
            ) : (
                <div>
                    <Link to="/">Sign In</Link>
                </div>
            )}

        </div>
    )
}

export default Nav