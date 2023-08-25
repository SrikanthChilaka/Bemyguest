import "./InfoWindow.scss";
const InfoWindowContent = ({img,name,price, maxCapacity, applications}) => {
   return (
      <div className="infowindow-container">
         <img src = {img} className = "infowindow-img" />
         <div className="infowindow-content">
            <p className = "infowindow-name">{name}</p>
            <div className="infowindow-stats">
               <p className = "infowindow-price">{`Cost : $ ${price}`}</p>
               <p className = "infowindow-max-capacity">{`capacity : ${maxCapacity}`}</p>
               <p className = "infowindow-applications">{`applications filled : ${applications}`}</p>
            </div>
         </div>
      </div>
   );
}
 
export default InfoWindowContent; 