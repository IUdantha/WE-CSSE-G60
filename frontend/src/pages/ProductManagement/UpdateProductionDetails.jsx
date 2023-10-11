import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Container,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function UpdateProductionDetails(props) {
  // function exportAsPDF(id) {
  //   console.log(id);
  //   const pdf = new jsPDF('landscape');
  //   const pdfContent = document.getElementById('pdfContent');
  //   const excludeElements = [
  //     document.getElementById('excludeThisElement')
  //   ];

  //   // add HTML content to the PDF
  //   pdf.html(pdfContent, {
  //     html2canvas: {
  //       scale: .15,
  //       excludeDoctype: true,
  //       excludeElements: excludeElements
  //     },
  //     callback: function (pdf) {
  //       pdf.save('Production Record ${id}.pdf'), { autoDownload: true };
  //     }
  //   });
  // }

  function exportAsPDF(id) {
    console.log(id);
    const pdf = new jsPDF('landscape');
    const pdfContent = document.getElementById('pdfContent');
    const excludeElements = [document.getElementById('excludeThisElement')];

    // add HTML content to the PDF
    pdf.html(pdfContent, {
      html2canvas: {
        scale: 0.15,
        excludeDoctype: true,
        excludeElements: excludeElements
      },
      callback: function (pdf) {
        pdf.save(`Production Record.pdf`, { autoDownload: true });
      }
    });
  }

  const [product, setProduction] = useState({
    batchNumber: '',
    productName: '',
    quantityProduced: '',
    productionDate: '',
    expirationDate: '',
    salesPrice: '',
    productionCost: {
      rawMaterials: '',
      labor: '',
      packing: '',
      other: ''
    }
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const sale = product.salesPrice;
  const qyt = product.quantityProduced;
  const totalValue = sale * qyt;
  const totalCost =
    parseInt(product.rawMaterials) +
    parseInt(product.labor) +
    parseInt(product.packing) +
    parseInt(product.other);
  const profit = totalValue - totalCost;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin-portal/production-management/${id}`)
      .then((res) => {
        setProduction({
          batchNumber: res.data.batchNumber,
          productName: res.data.productName,
          quantityProduced: res.data.quantityProduced,
          productionDate: res.data.productionDate,
          expirationDate: res.data.expirationDate,
          salesPrice: res.data.salesPrice,
          rawMaterials: res.data.productionCost.rawMaterials,
          labor: res.data.productionCost.labor,
          packing: res.data.productionCost.packing,
          other: res.data.productionCost.other
        });
      })
      .catch((err) => {
        console.log('Error from UpdateProduction');
      });
  }, [id]);

  const onChange = (e) => {
    setProduction({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      batchNumber: product.batchNumber,
      productName: product.productName,
      quantityProduced: product.quantityProduced,
      salesPrice: product.salesPrice,
      productionCost: {
        rawMaterials: product.rawMaterials,
        labor: product.labor,
        packing: product.packing,
        other: product.other
      }
    };

    axios
      .put(`http://localhost:3000/admin-portal/production-management/${id}`, data)
      .then((res) => {
        navigate(`/product-management/production-records`);
      })
      .catch((err) => {
        console.log('Error in UpdateProduct!');
      });
  };

  return (
    <div id="pdfContent" className="">
      <div className="bg-white m-16 rounded-2xl h-[90vh]">
        <div className="row">
          <div className="p-8 flex flex-row justify-between items-center">
            <div className="">
              <Link
                to="/product-management/production-records"
                className="btn btn-accent text-white">
                <p>Go to Production records</p>
              </Link>
            </div>

            <h1 className="text-2xl pt-4"> Production Record Information</h1>
            <img className="h-16 pl-8 py-auto" src="../../../logo.png" alt="logo"></img>
          </div>
          <hr></hr>
        </div>
        <div className="grid gap-2 p-8">
          <div className="">Batch Number : {product.batchNumber}</div>
          <div className="">Record ID : {id}</div>
          <div className="">
            Production Date : {new Date(product.productionDate).toLocaleDateString()}
          </div>
          <div className="">
            Expiration Date : {new Date(product.expirationDate).toLocaleDateString()}
          </div>
        </div>
        <div className="col-md-8 m-auto">
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-5 p-8 pt-0">
            <div className="flex flex-col">
              <label className="text-secondary">Product Name</label>
              <TextField
                name="productName"
                placeholder="Product Code"
                value={product.productName}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Quantity Produced</label>
              <TextField
                name="quantityProduced"
                placeholder="quantityProduced"
                value={product.quantityProduced}
                onChange={onChange}
                type="Number"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Sales Price (Unit price)</label>
              <TextField
                name="salesPrice"
                placeholder="salesPrice"
                value={product.salesPrice}
                onChange={onChange}
                type="Number"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-secondary">Total Value</label>
              <TextField placeholder="salesPrice" value={totalValue} readOnly />
            </div>

            <div className="col-span-2 grid grid-cols-4 gap-5 border rounded-xl p-4">
              <div className="col-span-4">Production Cost</div>
              <div className="flex flex-col">
                <label className="text-secondary">Raw Material Cost</label>
                <TextField
                  name="rawMaterials"
                  placeholder="rawMaterials"
                  value={product.rawMaterials}
                  onChange={onChange}
                  type="Number"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-secondary">Labor</label>
                <TextField
                  name="labor"
                  placeholder="labor"
                  value={product.labor}
                  onChange={onChange}
                  type="Number"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-secondary">Packing</label>
                <TextField
                  name="packing"
                  placeholder="packing"
                  value={product.packing}
                  onChange={onChange}
                  type="Number"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-secondary">Additional Expences</label>
                <TextField
                  name="other"
                  placeholder="other"
                  value={product.other}
                  onChange={onChange}
                  type="Number"
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <label className="text-secondary">Total Cost</label>
                <TextField value={totalCost} readOnly />
              </div>

              <div className="col-span-2 flex flex-col">
                <label className="text-secondary">Astimated Profit</label>
                <TextField value={profit} readOnly />
              </div>
            </div>

            <div id="excludeThisElement" className="col-span-2 flex flex-row justify-end gap-5">
              <button onClick={() => exportAsPDF({ id })} className="btn btn-accent text-white">
                Export as PDF
              </button>
              <button type="submit" className="btn btn-accent text-white">
                Update Product Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductionDetails;
