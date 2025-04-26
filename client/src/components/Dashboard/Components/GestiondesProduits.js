import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproduct, getproduct, updateproduct, addproduct } from '../../../JS/ProductsSlice';
import Navbardash from './Navbardash';

const GestiondesProduits = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((store) => store.Product?.product);

    const [searchLetter, setSearchLetter] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        Image: "",
        description: "",
        Category: ""
    });
    const [updatedProduct, setUpdatedProduct] = useState({
        name: "",
        price: "",
        Image: "",
        description: "",
        Category: ""
    });

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer ce produit ?")) {
            dispatch(deleteproduct(id)).then(() => {
                dispatch(getproduct());
            });
        }
    };

    const handleUpdateClick = (product) => {
        setShowUpdateForm(true);
        setSelectedProduct(product);
        setUpdatedProduct({
            name: product?.name || "",
            price: product?.price || "",
            Image: product?.image || "",
            description: product?.description || "",
            Category: product?.category || ""
        });
    };

    const handleUpdateSubmit = () => {
        if (selectedProduct) {
            dispatch(updateproduct({ id: selectedProduct._id, upproduct: updatedProduct })).then(() => {
                setShowUpdateForm(false);
                dispatch(getproduct());
            });
        }
    };

    const handleAddSubmit = () => {
        dispatch(addproduct(newProduct)).then(() => {
            setShowAddForm(false);
            setNewProduct({
                name: "",
                price: "",
                Image: "",
                description: "",
                Category: ""
            });
            dispatch(getproduct());
        });
    };

    const filteredProducts = allProducts?.filter(product =>
        searchLetter === "" || product?.name?.toLowerCase().startsWith(searchLetter.toLowerCase())
    );

    return (
        <div>
            <Navbardash />
            <div className="box-gestionuserdash">
                <h1>Gestion des Produits</h1>

                <div className="search-add-container">
                    <input
                        type="text"
                        placeholder="Rechercher par première lettre..."
                        value={searchLetter}
                        onChange={(e) => setSearchLetter(e.target.value)}
                    />
                    <button className="add-product-btn" onClick={() => setShowAddForm(true)}>
                        Ajouter un produit
                    </button>
                </div>

                {showAddForm && (
                    <div className="add-product-form">
                        <h2>Ajouter un nouveau produit</h2>
                        <label>Nom :</label>
                        <input
                            type="text" placeholder='Nom de votre produit'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />

                        <label>Prix :</label>
                        <input
                            type="text" placeholder='Prix de votre produit'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />

                        <label>Image (URL) :</label>
                        <input
                            type="text" placeholder='lien image '
                            value={newProduct.Image}
                            onChange={(e) => setNewProduct({ ...newProduct, Image: e.target.value })}
                        />

                        <label>Description :</label>
                        <input
                            type="text" placeholder='description de votre produit'
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />

                        <label>Catégorie :</label>
                        <input
                            type="text" placeholder='IPTV / Accessoires / smartphones / produitscolaire'
                            value={newProduct.Category}
                            onChange={(e) => setNewProduct({ ...newProduct, Category: e.target.value })}
                        />

                        <button className="btn-add-ok" onClick={handleAddSubmit}>Valider</button>
                        <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Annuler</button>
                    </div>
                )}

                {showUpdateForm && selectedProduct && (
                    <div className="updatecarsettings">
                        <h2>Modifier le produit</h2>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />

                        <label>Prix :</label>
                        <input
                            type="text"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />

                        <label>Image (URL) :</label>
                        <input
                            type="text"
                            value={updatedProduct.Image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, Image: e.target.value })}
                        />

                        <label>Description :</label>
                        <input
                            type="text"
                            value={updatedProduct.description}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        />

                        <label>Catégorie :</label>
                        <input
                            type="text"
                            value={updatedProduct.Category}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, Category: e.target.value })}
                        />

                        <button className="btn-up-ok" onClick={handleUpdateSubmit}>Valider</button>
                        <button className="btn-cancel" onClick={() => setShowUpdateForm(false)}>Annuler</button>
                    </div>
                )}
            </div>

            <div className="bodygestionuserdash">
                <table>
                    <thead className="tetetable">
                        <tr>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Catégorie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.map((product) => (
                            <tr key={product?._id}>
                                <td data-label="Nom">{product?.name}</td>
                                <td data-label="Prix">{product?.price} TND</td>
                                <td data-label="Image">
                                    <img src={product?.Image} alt={product?.name} style={{ width: "80px", height: "auto" }} />
                                </td>
                                <td data-label="Description">{product?.description}</td>
                                <td data-label="Catégorie">{product?.Category}</td>
                                <td data-label="Actions">
                                    <div className="settingsadmin">
                                        <button className="deletebtn" onClick={() => handleDelete(product?._id)}>Delete</button>
                                        <button className="updatebtn" onClick={() => handleUpdateClick(product)}>Update</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestiondesProduits;
