import { useEffect } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const DetailPage = () => {
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)

    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading) {
        return <Loader />
    }

    return ( 
        <>
            { !loading && link && <LinkCard link={link} /> }
        </>
     );
}
 
export default DetailPage;