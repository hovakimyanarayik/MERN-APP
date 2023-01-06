import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const [link, setLink] = useState('')
    const { request } = useHttp()
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()

    const keyDownHandler = async (e) => {
        if(e.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate', 
                    "POST", 
                    {from: link},
                    {Authorization: `Bearer ${token}`}
                )
                navigate(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return ( 
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        id="link" 
                        type="text" 
                        onChange={e => setLink(e.target.value)}
                        value={link}
                        onKeyDown={keyDownHandler}
                    />
                    <label htmlFor="link">Add a Link</label>
                </div>
            </div>
        </div>
     );
}
 
export default CreatePage;