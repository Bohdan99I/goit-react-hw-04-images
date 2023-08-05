import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { getImages } from '../services/pixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    value: '',
    totalPages: 0,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.value !== prevState.value
    ) {
      this.getImagesToArray(prevState);
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = id => {
    this.setState({ isLoading: true });
    const largeImage = this.state.images.find(image => image.id === id);

    setTimeout(() => {
      this.setState({
        largeImageURL: largeImage.largeImageURL,
        isLoading: false,
      });
      this.toggleModal();
    }, 500);
  };

  handleSubmit = value => {
    this.setState({ images: [], value: value, page: 1 });
    if (!value) {
      Notiflix.Notify.warning('Enter your request!');
    }
  };

  buttonOnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getImagesToArray = async prevState => {
    try {
      this.setState({ isLoading: true });
      const { value, page } = this.state;
      const { totalHits, hits } = await getImages(value, page);
      const pageCount = totalHits / 12;
      this.setState({
        totalPages: pageCount,
      });
      setTimeout(() => {
        if (page !== prevState.page) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            isLoading: false,
          }));
        } else {
          this.setState({ images: hits, isLoading: false });
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      images,
      value,
      isLoading,
      page,
      totalPages,
      showModal,
      largeImageURL,
    } = this.state;
    return (
      <Container>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        {value !== '' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {page < totalPages && <Button onClick={this.buttonOnClick} />}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={value} />
          </Modal>
        )}
      </Container>
    );
  }
}
