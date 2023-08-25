import './Footer.scss';
import facebookIcon from "./icons/facebook.png";
import linkedInIcon from "./icons/LinkedIn.png";
import instagramIcon from "./icons/instagram.png";
const Footer = () => {
   return (
         <footer className = "footer-section">
            <div className = "footer-left">
               <p className = "footer-text">Copyright &copy; BeMyGuest All rights reserved</p>
            </div>
            <div className = "footer-right">
               <img src = {facebookIcon} className = "footer-socials"/>
               <img src = {linkedInIcon} className = "footer-socials" />
               <img src = {instagramIcon} className = "footer-socials" />
            </div> 
         </footer>
     );
}
 
export default Footer;