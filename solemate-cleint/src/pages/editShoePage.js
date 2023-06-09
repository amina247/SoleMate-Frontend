import { AuthContext } from "../context/auth.context";
import NavigationBar from "../components/navBar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function EditShoePage() {
    const [shoe, setShoe] = useState();
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [description, setDescription] = useState();
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [forSale, setForSale] = useState();

    const { id: shoeId } = useParams();

    const cloudinaryref = useRef();
    const widgetRef = useRef();

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_SERVER;
    const { getToken, getUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner = getUser()._id;
        const requestBody = { brand, model, description, size, price, imageUrl, owner, forSale };

        axios
            .put(`${API_URL}/api/shoes/${shoeId}`, requestBody, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                console.log(response.data._id);
                navigate(`/shoe-details/${response.data._id}`);
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setAlertText(error.response.data.message);
            });

    }

    useEffect(() => {
        cloudinaryref.current = window.cloudinary;
        widgetRef.current = cloudinaryref.current.createUploadWidget({
            cloudName: 'dkylu6vrb',
            uploadPreset: 'solemate',
        }, function (error, result) {
            if (error) {
                console.log(error);
                setAlertShown(true);
                setAlertText('Upload image failed');
            }
            if (result && result.event == "success") {
                setImageUrl(result.info.url);
            }
        })
    }, []);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/shoes/${shoeId}`, { headers: { 'authorization': `Bearer ${getToken()}` } })
            .then((response) => {
                setShoe(response.data);
                setBrand(response.data.brand);
                setModel(response.data.model);
                setDescription(response.data.description);
                setSize(response.data.size);
                setPrice(response.data.price);
                setImageUrl(response.data.imageUrl);
                setForSale(response.data.forSale);
            })
            .catch((error) => {
                console.log(error);
                setAlertShown(true);
                setAlertText(error.response.data.message);
            });

    }, []);


    return (
        <div>
            <NavigationBar />

            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol lg="8" md="10">
                        <div className="mt-4">
                            <h4 className="text-center mb-4">Edit Shoe</h4>
                            <div className="card p-4">
                                <div hidden={!alertShown}>
                                    <Alert key={"danger"} variant={"danger"}>
                                        {alertText}
                                    </Alert>
                                </div>

                                {shoe &&
                                    <Form onSubmit={handleSubmit} className="mt-3">
                                        <Form.Group>
                                            <Form.Label>Image:</Form.Label>
                                            <Button variant="secondary" onClick={() => widgetRef.current.open()} className="ml-2">
                                                Upload
                                            </Button>
                                        </Form.Group>
                                        <Image src={imageUrl} fluid className="my-3" />
                                        <Form.Group>
                                            <Form.Label>For Sale:</Form.Label>
                                            <Form.Check type="checkbox" checked={forSale}
                                                onChange={() => setForSale(!forSale)} className="ml-2" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Brand:</Form.Label>
                                            <Form.Control type="text"
                                                value={brand} onChange={(event) => setBrand(event.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Model:</Form.Label>
                                            <Form.Control type="text"
                                                value={model} onChange={(event) => setModel(event.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description:</Form.Label>
                                            <Form.Control type="text"
                                                value={description} onChange={(event) => setDescription(event.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Size:</Form.Label>
                                            <Form.Control type="text"
                                                value={size} onChange={(event) => setSize(event.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Price:</Form.Label>
                                            <Form.Control type="text"
                                                value={price} onChange={(event) => setPrice(event.target.value)} />
                                        </Form.Group>
                                        <Button variant="secondary" type="submit" className="w-100 mt-3">
                                            Save Changes
                                        </Button>
                                    </Form>
                                }
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default EditShoePage;