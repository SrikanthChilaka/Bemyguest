import './SearchCard.scss';
 
const SearchCard = ({children}) => {
   
   return (
      <div className = "search-card">
         <div className="search-card-overlay">
            <p className = "search-card-title">Find it. Tour It. Own It</p>
            {children}
         </div>
      </div>
   );
}
 
export default SearchCard;