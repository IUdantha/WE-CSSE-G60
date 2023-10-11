import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleProduct(props) {
  const [product, setProducts] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin-portal/product-management/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails');
      });
  }, [id]);

  const onDeleteClick = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Product?');
    if (!confirmed) {
      return;
    }
    await axios
      .delete(`http://localhost:3000/admin-portal/product-management/${id}`)
      .then((res) => {
        navigate('/product-management/products');
      })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };

  const ProductItem = (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-4">
        <span className="text-2xl">
          <strong>{product.productName}</strong> - ({product.weight})
        </span>
        <br></br>
        <p className="text-gray mb-5">{product.productCode}</p>
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-[440px] rounded-2xl object-cover"
        />
        <img
          src="https://gs1go2.azureedge.net/cdn/ff/cZ3F6dcJl8sWBI28YukX7o4W2WKvpRVdZK8NNwIdAVM/1635150529/public/2021-05/gs1-128.png"
          alt={product.productName}
          className="w-full h-[150px] rounded-2xl mt-5 p-5"
        />
      </div>
      <div className="col-span-8">
        <div className="border p-4 rounded-xl">
          <label className="text-secondary">Product Description</label>
          <p>{product.certifications}</p>
        </div>
        <div className="border p-4 rounded-xl mt-5">
          <label className="text-secondary">Qulity Contral Infromation</label>
          <p>{product.qualityControlInformation}</p>
        </div>
        <div className="grid grid-cols-2 gap-5  mt-5  ">
          <div className="border p-4 rounded-xl">
            <label className="text-secondary">Inventory Status</label>
            <p>{product.inventoryStatus}</p>
          </div>
          <div className="border p-4 rounded-xl">
            <label className="text-secondary">Product Type</label>
            <p>{product.type}</p>
          </div>
          <div className="border p-4 rounded-xl">
            <label className="text-secondary">Flavor</label>
            <p>{product.flavour}</p>
          </div>
          <div className="border p-4 rounded-xl">
            <label className="text-secondary">Seriel Number</label>
            <p>{product.serialNumber}</p>
          </div>
        </div>

        <div className="flex flex-row gap-5 justify-end mt-5">
          <div className="">
            <button
              type="button"
              className="btn  btn-secondary text-white"
              onClick={() => {
                onDeleteClick(product._id);
              }}>
              Delete Product
            </button>
          </div>
          <div className="">
            <Link
              to={`/product-management/single-product/edit/${product._id}`}
              className="btn btn-primary text-white">
              Edit Product
            </Link>
          </div>
        </div>
      </div>

      {/* <table className="table table-hover table-dark">
        <tbody className="grid grid-cols-2 gap-5">
          <tr>
            <td>Product Name</td>
            <td>{product.productName}</td>
          </tr>
          <tr>
            <td>Product Code</td>
            <td>{product.productCode}</td>
          </tr>
          <tr>
            <td>Product Type</td>
            <td>{product.type}</td>
          </tr>
          <tr>
            <td>Flavor</td>
            <td>{product.flavour}</td>
          </tr>
          <tr>
            <td>Qulity Contral Infromation</td>
            <td>{product.qualityControlInformation}</td>
          </tr>
          <tr>
            <td>Certifications</td>
            <td>{product.certifications}</td>
          </tr>
          <tr>
            <td>Inventory Status</td>
            <td>{product.inventoryStatus}</td>
          </tr>
          <tr>
            <td>Package Type</td>
            <td>{product.packageType}</td>
          </tr>
          <tr>
            <td>Product Weight</td>
            <td>{product.weight}</td>
          </tr>
          <tr>
            <td>BarCode</td>
            <td>{product.barcode}</td>
          </tr>
          <tr>
            <td>Seriel Number</td>
            <td>{product.serialNumber}</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );

  return (
    <div className="ShowBookDetails">
      <div className="bg-white m-16 rounded-2xl h-[90vh]">
        <div className="">
          <div className="p-8 flex flex-row justify-between items-center">
            <div className="">
              <Link to="/product-management/products" className="btn btn-accent text-white">
                <p>Go Back</p>
              </Link>
            </div>

            <h1 className="text-2xl pt-4">Product Details</h1>
            <img className="h-16 pl-8 py-auto" src="../../../logo.png" alt="logo"></img>
          </div>
          <hr></hr>

          <div className="p-8">{ProductItem}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
