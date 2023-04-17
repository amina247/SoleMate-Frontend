import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";


function Offer(props) {
    const { offer } = props;
    const [emailShown, setEmailShown] = useState(false);
    const navigate = useNavigate();
    const { getToken, getUser } = useContext(AuthContext);

    const API_URL = 'http://localhost:5005';

    const handleAccept = (offerId) => {
        console.log('accept', offerId);
        setEmailShown(true);
    }

    const handleReject = (offerId) => {
        console.log('reject', offerId);
        axios
            .delete(`${API_URL}/api/transactions/${offerId}`, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Image src={offer.shoe.imageUrl} fluid onClick={() => { navigate(`/shoe-details/${offer.shoe._id}`) }} />
            <p>shoe Brand :{offer.shoe.brand}</p>
            <p>offered price: {offer.price}</p>
            <div hidden={!emailShown}>
                <p>you can contact the buyer with Email: {offer.buyer.email} </p>
            </div>


            <Button variant="primary" onClick={() => { handleAccept(offer._id) }}>
                Accept Offer </Button>
            <Button variant="primary" type="submit" onClick={() => { handleReject(offer._id) }}>
                Reject Offer
            </Button>
        </div>
    )
}

export default Offer;