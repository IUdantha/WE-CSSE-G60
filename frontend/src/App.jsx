import './App.css';
import Home from './pages/Home';

import ProductManagement from './pages/ProductManagement/ProductManagement';
import ProductMainPage from './pages/ProductionManagement/Home/ProductMainPage';
import ProductUpdatePage from './pages/ProductManagementNew/Update/ProductUpdatePage';
import SingleProduct from './pages/ProductionManagement/Home/Components/SingleProduct';
import UpdateProductDetails from './pages/ProductionManagement/Home/Components/UpdateProductDetails';
import UpdateProductionDetails from './pages/ProductManagement/UpdateProductionDetails';

import AddStaff from './pages/StaffManagement/AddStaff';
import UpdateStaff from './pages/StaffManagement/UpdateStaff';
import StaffManagement from './pages/StaffManagement/StaffManagement';
import Updatepackingitem from './pages/StockManagement/PackingItem/Updatepackingitem';
import AddFirewood from './pages/StockManagement/Firewood/AddFirewoodMAnagement';
import AddSupplier from './pages/StockManagement/AddSupplierManagement';
import Updatesup from './pages/StockManagement/UpdatesupplierManagement';
import Viewsupplier from './pages/StockManagement/ViewsupplierManagement';
import Updatefire from './pages/StockManagement/Firewood/UpdatefirewoodManagement';
import Viewfirewood from './pages/StockManagement/Firewood/ViewfirewoodManagement';
import Addpacking from './pages/StockManagement/PackingItem/AddpackingManagement';
import Viewpacking from './pages/StockManagement/PackingItem/ViewpackingManagement';
import SalesManagement from './pages/SalesManagement/SalesManagement';
import MachineManagement from './pages/MachineManagement/Machine/MachineManagement.jsx';
import GeneratorManagement from './pages/MachineManagement/Generators/GeneratorManagement.jsx';
import UpdateMachine from './pages/MachineManagement/Machine/UpdateManagement.jsx';
import UpdateGenerator from './pages/MachineManagement/Generators/UpdateManagement.jsx';
import AddManagement from './pages/MachineManagement/Machine/AddManagement';
import AddManagementGen from './pages/MachineManagement/Generators/AddManagement';
import ViewManagement from './pages/MachineManagement/Machine/ViewManagement';
import ViewManagementgen from './pages/MachineManagement/Generators/ViewManagement';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddQuotation from './pages/SalesManagement/AddQuotation';
import ProductDetails from './pages/SalesManagement/ProductDetails';
import VehicleCategoryAdd from './pages/vehicleManagement/VehicleCategoryAdd';
import ViewVehicleCategory from './pages/vehicleManagement/ViewVehicleCategory';
import EditVehicleCategory from './pages/vehicleManagement/EditVehicleCategory';
import AddVehicle from './pages/vehicleManagement/AddVehicle';
import ViewVehiclePage from './pages/vehicleManagement/ViewVehiclePage';
import EditVehiclePage from './pages/vehicleManagement/EditVehiclePage';
import { ThemeProvider } from '@mui/material';
import UpdatePage from './pages/SalesManagement/UpdateSales/UpdatePage';
import { theme } from './theme';
import AddSalary from './pages/SalaryManagement/AddSalary';
import EditSalaryPage from './pages/SalaryManagement/EditSalaryPage';
import ViewSalaryPage from './pages/SalaryManagement/ViewSalaryPage';
import AddIncrement from './pages/SalaryManagement/AddIncrement';
import EditIncrement from './pages/SalaryManagement/EditIncrement';
import ViewIncrement from './pages/SalaryManagement/ViewIncrement';

import CropsManagement from './pages/CropsManagement/CropsManagement';
import Addcrops from './pages/CropsManagement/addcManagement';
import Login from './pages/Login/Login';
import Updatecrops from './pages/CropsManagement/UpdateCManagement';
import SuppliercManagement from './pages/CropsManagement/supplierc/SuppliercManagement';
import AddSupplierc from './pages/CropsManagement/supplierc/addSupplierc';
import UpdateSupplierssManagement from './pages/CropsManagement/supplierc/UpdateSManagement';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoggedIn>
                <Login />
              </LoggedIn>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/staff-management/add-staff-member" element={<AddStaff />} />
          <Route path="staff-management/update-member" element={<UpdateStaff />} />

          {/* Product Management */}
          <Route path="/product-management" element={<ProductMainPage />} />
          {/* NewLinks Start */}
          <Route path="/product-management/products" element={<ProductMainPage />} />
          <Route path="/product-management/single-product/:id" element={<SingleProduct />} />
          <Route
            path="/product-management/single-product/edit/:id"
            element={<UpdateProductDetails />}
          />
          {/* New links end */}
          <Route
            path="/product-management/products/productions/:id"
            element={<ProductUpdatePage />}
          />
          <Route path="/product-management/production-records" element={<ProductManagement />} />
          <Route
            path="/product-management/production-records/:id"
            element={<UpdateProductionDetails />}
          />
          {/* end product Management */}

          <Route path="/sales-management" element={<SalesManagement />} />
          <Route path="/sales-management/add-quotation" element={<AddQuotation />} />
          <Route path="/sales-management/product-details" element={<ProductDetails />} />
          <Route path="/sales-management/sales/:id" element={<UpdatePage />} />

          <Route path="/stock-management" element={<Viewsupplier />} />
          <Route path="/stock-management/supplier/:id" element={<Updatesup />} />
          <Route path="/stock-management/add-supplier" element={<AddSupplier />} />
          <Route path="/stock-management/all-suppliers" element={<Viewsupplier />} />
          <Route path="/stock-management/all-suppliers/supplier/:id" element={<Updatesup />} />

          <Route path="/stock-management/add-firewood-stocks" element={<AddFirewood />} />
          <Route path="/stock-management/firewood" element={<Viewfirewood />} />
          <Route path="/stock-management/all-firewood-stocks" element={<Viewfirewood />} />
          <Route path="/stock-management/firewood/:id" element={<Updatefire />} />
          <Route path="/stock-management/all-firewood-stocks/:id" element={<Updatefire />} />

          <Route path="/stock-management/packing" element={<Viewpacking />} />
          <Route path="/stock-management/packing/:id" element={<Updatepackingitem />} />
          <Route path="/stock-management/add-packing-materials" element={<Addpacking />}></Route>
          <Route path="/stock-management/all-packing-materials" element={<Viewpacking />} />

          <Route path="/machine-management/add-machine" element={<AddManagement />} />
          <Route path="/machine-management" element={<MachineManagement />} />
          <Route path="/machine-management/machines/:id" element={<UpdateMachine />} />
          <Route path="/machine-management/all-machines" element={<ViewManagement />} />
          <Route path="/machine-management/all-machines/machines/:id" element={<UpdateMachine />} />
          {/* 
          <Route path="generator-management/add-generator" element={<AddManagementGen />} />
          <Route path="/generator-management" element={<GeneratorManagement />} />
          <Route path="/generator-management/generators/:id" element={<UpdateGenerator />} />
          <Route path="/generator-management/all-generators" element={<ViewManagementgen />} />
          <Route
            path="/generator-management/all-generators/generators/:id"
            element={<UpdateGenerator />}
          />
 */}
          {/* Vehicle Management */}
          <Route path="/vehicle-management" element={<ViewVehiclePage />} />
          <Route path="/vehicle-management/add-vehicle" element={<AddVehicle />} />
          <Route path="/vehicle-management/add-vehicle-category" element={<VehicleCategoryAdd />} />
          <Route path="/vehicle-management/category" element={<ViewVehicleCategory />} />
          <Route path="/vehicle-management/edit-category/:id" element={<EditVehicleCategory />} />
          <Route path="/vehicle-management/:id" element={<EditVehiclePage />} />
          {/* end vehicle Management */}

          <Route path="machine-management/add-generator" element={<AddManagementGen />} />
          <Route path="/machine-management" element={<GeneratorManagement />} />
          <Route path="/machine-management/generators/:id" element={<UpdateGenerator />} />
          <Route path="/machine-management/all-generators" element={<ViewManagementgen />} />
          <Route
            path="/machine-management/all-generators/generators/:id"
            element={<UpdateGenerator />}
          />

          <Route path="/crops-management" element={<CropsManagement />} exact />
          <Route path="/crops-management/add-crops" element={<Addcrops />}></Route>

          {/* Salary Management */}
          <Route path="/salary-management" element={<ViewSalaryPage />} />
          <Route path="/salary-management/add-salary" element={<AddSalary />} />
          <Route path="/salary-management/add-increment" element={<AddIncrement />} />
          <Route path="/salary-management/increment" element={<ViewIncrement />} />
          <Route path="/salary-management/edit-increment/:id" element={<EditIncrement />} />
          <Route path="/salary-management/edit-salary/:id" element={<EditSalaryPage />} />
          <Route path="/crops-management/crops/:id" element={<Updatecrops />} exact />

          <Route path="/supplierc-management" element={<SuppliercManagement />} exact />
          <Route path="/supplierc-management/add-supplier" element={<AddSupplierc />}></Route>
          <Route
            path="/supplierc-management/supplierc/:id"
            element={<UpdateSupplierssManagement />}
            exact
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// const LoggedOut = ({ children }) => {
//   if (localStorage.getItem('token')) {
//     return children;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

export const LoggedIn = ({ children }) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};
