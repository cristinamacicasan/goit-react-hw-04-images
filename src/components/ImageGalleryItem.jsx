import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'; 

const ImageGalleryItem = ({ imageUrl, onClick }) => (
  <li className={styles.galleryItem}>
    <img
      src={imageUrl}
      alt="Gallery Item"
      className={styles.image}
      onClick={() => onClick(imageUrl)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
