import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ picturies, openModal }) {
 const elements = picturies.map(({ id, largeImageURL, webformatURL }) => {
         return <ImageGalleryItem
              key={id}
              largeImageURL={largeImageURL}
              webformatURL={webformatURL}
              openModal={openModal}
            />
    })
    return (
        <ul className={css.ImageGallery}>{elements}</ul>
    )
}

export default ImageGallery;


ImageGallery.defaultProps = {
    items: []
}


ImageGallery.propTypes = {
    openModal: PropTypes.func,
    picturies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    )
}