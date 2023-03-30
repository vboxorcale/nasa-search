import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Search from './components/Search';
import Navbar from './components/Navbar';
import DatePicker from './components/Datepicker';
import './App.css';

const App =()=>{
  return(
<div> 
   <Navbar/>
   <DatePicker/>  
   <Search/>       
</div>
  )
}

export default App;