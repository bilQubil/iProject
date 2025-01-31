import PropTypes from "prop-types";
const Title = ({text1, text2}) => {
     
  return (
    <div className="inline-flex gap-2 item-center mb-3">
      <p className="text-gray-800"> {text1} <span className="text-gray-700 font-medium"> {text2}</span></p>
      {/* <p className=" w-4 sm:w-4 h-[1px] sm:h[1px] bg-red-600"> </p> */}
    </div>
  )
}

Title.propTypes = {
    text1: PropTypes.string.isRequired, 
    text2: PropTypes.string,            
  };

export default Title
