import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signupp from './Components/Signupp'
import Log from './Components/Log'
import Homein from './Components/Homein'
import AddMed from './Components/AddMed'
import Filter from './Components/Filter'
import Update from './Components/Update'
import PasswordReset from './Components/PasswordReset'
import ItemList from './Components/Itemlist'
import PrescriptionDetails from './PrescriptionDetails'
import PrescriptionDetailsPage from './PrescriptionDetailsPage'
import Patientsearch from './Components/patientsearch'
import ForgotPassword from './Components/ForgotPassword'
import Otp from './Components/Otp'
import NewPass from './Components/NewPass'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/Signupp" element={<Signupp />}></Route>
      <Route path = "/log" element={<Log />}></Route>
      <Route path = "/forgotpass" element={<ForgotPassword />}></Route>
      <Route path = "/otp" element={<Otp />}></Route>
      <Route path = "/newpass" element={<NewPass />}></Route>
      <Route path = "/Homein" element={<Homein />}></Route>
      <Route path = "/AddMed" element={<AddMed />}></Route>
      <Route path = "/Filter" element={<Filter />}></Route>
      <Route path = "/edit/:id" element={<Update />}></Route>
      <Route path = "/PasswordReset" element={<PasswordReset />}></Route>
      <Route path = "/item" element={<ItemList />}></Route>
      <Route path = "/details" element={<PrescriptionDetails />}></Route>
      <Route path = "/prescription/:id" element={<PrescriptionDetailsPage />}></Route>
      <Route path = "/patient" element={<Patientsearch />}></Route>
    </Routes>
    </BrowserRouter>
  )
 
  }
  
export default App
