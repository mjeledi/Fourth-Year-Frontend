import PropTypes from "prop-types";

export default function Spinner({ size = 16, color = "border-goldenrod" }){
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 ${color} border-t-transparent`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
    />
  );
}


Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};