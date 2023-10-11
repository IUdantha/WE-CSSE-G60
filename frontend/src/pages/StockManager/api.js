import axios from 'axios';

const URL = 'http://localhost:3000';

export const addSupplier = async (data) => {
  try {
    return await axios.post(`${URL}/admin-portal/stock-management/addsupplier`, data);
  } catch (error) {
    console.log('Error while calling add Supplier API', error);
  }
};

export const getSuppliers = async () => {
  try {
    return await axios.get(`${URL}/admin-portal/stock-management/getsuppliers`);
  } catch (error) {
    console.log('Error while calling getSuppliers API', error);
  }
};

export const getSupplierId = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.log('Error while calling getSupplierId API', error);
  }
};

export const editsupplier = async (supplier, id) => {
  try {
    return await axios.put(`${URL}/${id}`, supplier);
  } catch (error) {
    console.log('Error while calling editSupplier API', error);
  }
};

export const deleteSupplier = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.log('Error while calling deletSupplier API', error);
  }
};
