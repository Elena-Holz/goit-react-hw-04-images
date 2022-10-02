import css from 'components/Button/Button.module.css'
import PropTypes from 'prop-types';

 function Button({ text, loadMore }) {
  return (
      <button onClick={loadMore} className={css.Button} type='button'>{text}</button>
  )
}


export default Button

Button.propTypes = {
    text: PropTypes.string.isRequired,
    loadMore: PropTypes.func.isRequired,
}