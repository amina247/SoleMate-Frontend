import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function AddShoePage() {
    const [alertShown, setAlertShown] = useState(false);
    const [alertText, setAlertText] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [description, setDescription] = useState();
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState();

    const cloudinaryref = useRef();
    const widgetRef = useRef();

    const navigate = useNavigate();

    const API_URL = 'http://localhost:5005';
    const { getToken, getUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner = getUser()._id;
        const requestBody = { brand, model, description, size, price, imageUrl, owner };

        axios
            .post(`${API_URL}/api/shoes`, requestBody, { headers: { 'authorization': `Bearer ${getToken()}` } })
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


    return (
        <div style={{
            display: 'block',
            width: 700,
            padding: 30
        }}>
            <h4>Add shoe to your collection</h4>
            <div hidden={!alertShown}>
                <Alert key={"danger"} variant={"danger"}>
                    {alertText}
                </Alert>
            </div>


            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Image:</Form.Label>
                    <Button variant="primary" onClick={() => widgetRef.current.open()}>
                        Upload
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type="text"
                        onChange={(event) => setBrand(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control type="text"
                        onChange={(event) => setModel(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text"
                        onChange={(event) => setDescription(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control type="text"
                        onChange={(event) => setSize(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="text"
                        onChange={(event) => setPrice(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add To my collection
                </Button>
            </Form>
        </div>
    );


}

export default AddShoePage;