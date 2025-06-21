import { useState } from 'react';
import { getUser } from '../services/getUser';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBInput,
    MDBBtn,
    MDBSpinner,
    MDBIcon
} from 'mdb-react-ui-kit';
import PropertyService from '../services/PropertyService';

const NewProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        likes: 0,
        shares: 0,
        sold: false,
        address: '',
        city: '',
        zipCode: '',
        bedrooms: 1,
        bathrooms: 1,
        type: '',
        squareFootage: '',
        amenities: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial'];
    const user = getUser();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ text: '', type: '' });
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append('agent', user)
        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            await PropertyService.createProperty(formDataToSend);
            setStatusMessage({
                text: 'Property added successfully!',
                type: 'success'
            });

            setFormData({
                title: '',
                description: '',
                price: '',
                likes: 0,
                shares: 0,
                sold: false,
                address: '',
                city: '',
                zipCode: '',
                bedrooms: 1,
                bathrooms: 1,
                type: '',
                squareFootage: '', // Reset square footage
                amenities: '' // Reset amenities
            });
            setImageFile(null);
            setPreviewImage(null);
            setTouchedFields({});
        } catch (error) {
            setStatusMessage({
                text: 'Error adding property: ' + error.message,
                type: 'danger'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isInvalid = (fieldName) => {
        return touchedFields[fieldName] && !formData[fieldName];
    };

    return (
        <MDBContainer className="py-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="8" lg="6">
                    <MDBCard className="shadow-5">
                        <MDBCardBody className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <MDBCardTitle tag="h3" className="fw-bold mb-3">
                                    <MDBIcon icon="home" className="me-2" />
                                    Add New Property
                                </MDBCardTitle>
                                <p className="text-muted">Fill in the details of your property listing</p>
                            </div>

                            {statusMessage.text && (
                                <div className={`mb-4 p-3 rounded ${statusMessage.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                                    {statusMessage.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <MDBInput
                                            label="Title*"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                            invalid={isInvalid('title')}
                                            onBlur={() => setTouchedFields(prev => ({ ...prev, title: true }))}
                                        />

                                        <MDBInput
                                            label="Price*"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                            invalid={isInvalid('price')}
                                            onBlur={() => setTouchedFields(prev => ({ ...prev, price: true }))}
                                        />

                                        <MDBInput
                                            label="Address*"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                            invalid={isInvalid('address')}
                                            onBlur={() => setTouchedFields(prev => ({ ...prev, address: true }))}
                                        />

                                        <MDBRow>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    label="City*"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                    className="mb-4"
                                                    invalid={isInvalid('city')}
                                                    onBlur={() => setTouchedFields(prev => ({ ...prev, city: true }))}
                                                />
                                            </MDBCol>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    label="Zip Code*"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleChange}
                                                    required
                                                    className="mb-4"
                                                    invalid={isInvalid('zipCode')}
                                                    onBlur={() => setTouchedFields(prev => ({ ...prev, zipCode: true }))}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>

                                    <MDBCol md="6">
                                        <div className="mb-4">
                                            <label className="form-label">Property Image*</label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                accept=".jpg,.jpeg"
                                                onChange={handleFileChange}
                                                required
                                            />
                                            {previewImage && (
                                                <div className="mt-3 text-center">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <MDBInput
                                            label="Description*"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            textarea
                                            rows="3"
                                            required
                                            className="mb-4"
                                            invalid={isInvalid('description')}
                                            onBlur={() => setTouchedFields(prev => ({ ...prev, description: true }))}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="4">
                                        <MDBInput
                                            label="Bedrooms*"
                                            name="bedrooms"
                                            type="number"
                                            min="1"
                                            value={formData.bedrooms}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                        />
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <MDBInput
                                            label="Bathrooms*"
                                            name="bathrooms"
                                            type="number"
                                            min="1"
                                            value={formData.bathrooms}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                        />
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <MDBInput
                                            label="Square Footage*"
                                            name="squareFootage"
                                            type="number"
                                            min="1"
                                            value={formData.squareFootage}
                                            onChange={handleChange}
                                            required
                                            className="mb-4"
                                            invalid={isInvalid('squareFootage')}
                                            onBlur={() => setTouchedFields(prev => ({ ...prev, squareFootage: true }))}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="4">
                                        <div className="mb-4">
                                            <label className="form-label">Property Type*</label>
                                            <select
                                                className="form-select"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select type</option>
                                                {propertyTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBInput
                                            label="Amenities (optional)"
                                            name="amenities"
                                            value={formData.amenities}
                                            onChange={handleChange}
                                            textarea
                                            rows="3"
                                            className="mb-4"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg"  // Only allows JPG/JPEG
                                        onChange={handleFileChange}
                                        multiple
                                        required
                                    />
                                </MDBRow>

                                <div className="text-center mt-4">
                                    <MDBBtn
                                        type="submit"
                                        color="primary"
                                        size="lg"
                                        disabled={isSubmitting}
                                        className="w-100"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                                Adding Property...
                                            </>
                                        ) : (
                                            'Add Property'
                                        )}
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default NewProperty;
