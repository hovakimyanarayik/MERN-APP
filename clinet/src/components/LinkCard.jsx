
const LinkCard = ({ link }) => {
    return ( 
        <>
            <h2>Link</h2>
            <p>Your Shortened Link: <a href={link.to} target='_blank' rel="noreferrer noopener">{link.to}</a></p>
            <p>From: <a href={link.from} target='_blank' rel="noreferrer noopener">{link.from}</a></p>
            <p>Clicks count: <strong>{link.clicks}</strong></p>
            <p>Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong> </p>
        </>
     );
}
 
export default LinkCard;