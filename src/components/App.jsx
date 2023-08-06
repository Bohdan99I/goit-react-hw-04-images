import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { getImages } from '../services/pixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    const getImagesToArray = async () => {
      try {
        setIsLoading(true);
        const { totalHits, hits } = await getImages(value, page);
        const pageCount = totalHits / 12;
        setTotalPages(pageCount);
        setTimeout(() => {
          if (page !== 1) {
            setImages(prevImages => [...prevImages, ...hits]);
          } else {
            setImages(hits);
          }
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    if (page !== 1 || value !== '') {
      getImagesToArray();
    }
  }, [page, value]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = id => {
    setIsLoading(true);
    const largeImage = images.find(image => image.id === id);

    setTimeout(() => {
      setLargeImageURL(largeImage.largeImageURL);
      setIsLoading(false);
      toggleModal();
    }, 500);
  };

  const handleSubmit = value => {
    setImages([]);
    setValue(value);
    setPage(1);
    if (!value) {
      Notiflix.Notify.warning('Enter your request!');
    }
  };

  const buttonOnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      {value !== '' && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {page < totalPages && <Button onClick={buttonOnClick} />}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={value} />
        </Modal>
      )}
    </Container>
  );
};
