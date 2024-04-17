import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSubmit = async (searchTerm) => {
    try {
      setSearchTerm(searchTerm); 
      setLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchTerm}&page=1&key=42285080-c22d5f6a90f49c0ab863c2d8a&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchTerm}&page=2&key=42285080-c22d5f6a90f49c0ab863c2d8a&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch more images');
      }
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <Loader loading={loading} />
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && <Button text="Load More" onClick={handleLoadMore} />}
      <Modal isOpen={modalOpen} imageUrl={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default App;
