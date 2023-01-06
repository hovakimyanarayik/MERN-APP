import { Link } from "react-router-dom";

const LinksList = ({ links }) => {

    if(!links.length) {
        return <p className="center">No Links yet...</p>
    }
    return ( 
        <table>
            <thead>
                <tr>
                    <th>N</th>
                    <th>Original Link</th>
                    <th>Shorted Link</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {links.map((link, idx) => (
                    <tr key={link._id}>
                        <td>{idx + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
     );
}
 
export default LinksList;