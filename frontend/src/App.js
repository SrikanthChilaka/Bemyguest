/* IMPORTING PAGES */
import Home from './pages/Home/Home';
import MyBookings from './pages/MyBookings/MyBookings';
import MyPostings from './pages/MyPostings/MyPostings';
import { PostForm} from './pages/PostForm/PostForm';
import StripeContainer from './pages/Payment/StripeContainer';
import ContactUs from './pages/ContactUs/ContactUs';
/* IMPORTING ROUTING COMPONENTS */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


/* Start of App */
const App = () => {

  return (
   <>
      <Router>
         <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/mybookings" element = { <MyBookings />}/>
            <Route path = "/mypostings" element = { <MyPostings />}/>
            <Route path = "/postform" element = {<PostForm / >}/>
            <Route path = "/payments" element = {<StripeContainer / >}/>
            <Route path = "/contact" element = {<ContactUs />}/>
         </Routes>
      </Router>  
   </>
  );
}

export default App;