import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signupp from './Components/Signupp'
import Log from './Components/Log'
import ItemList from './Components/Itemlist'
import Patientsearch from './Components/patientsearch'
// import AddPat from './Components/AddPat'
import AddPatient from './Components/AddPatient'
import PatientDetails from './Components/PatientDetails'
import DocHome from './Components/dochome'
import PrescriptionDetails from './Components/PrescriptionDetails'
import PrescriptionDetailsPage from './Components/PrescriptionDetailsPage'
import ForgotPassword from './Components/ForgotPassword'
import Otp from './Components/Otp'
import NewPass from './Components/NewPass'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/log" element={<Log />}></Route>
      <Route path = "/forgotpass" element={<ForgotPassword />}></Route>
      <Route path = "/otp" element={<Otp />}></Route>
      <Route path = "/newpass" element={<NewPass />}></Route>
      <Route path = "/home" element={<DocHome />}></Route>
      <Route path = "/item/:opno" element={<ItemList />}></Route>
      <Route path = "/patient" element={<Patientsearch />}></Route>
      <Route path = "/AddPatient" element={<AddPatient />}></Route>
      <Route path="/patient/:opno" element={<PatientDetails />} />
      <Route path = "/detail" element={<PrescriptionDetails />}></Route>
      <Route path = "/prescriptions/:id" element={<PrescriptionDetailsPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
 
  }
  
export default App
