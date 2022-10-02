import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ openModal, key, largeImageURL, webformatURL }) {

        return <li className={css.ImageGalleryItem} onClick={() => openModal({largeImageURL})} key={key}>
           
            <img className={css.ImageGalleryItem_image} src={webformatURL} alt={largeImageURL} />

      </li>
   };
    

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
    openModal: PropTypes.func,
    id: PropTypes.number,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
}
