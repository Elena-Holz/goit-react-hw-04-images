// import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
// import axios from 'axios';
import Loader from 'components/Loader/Loader.jsx'
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
import Searchbar from 'components/Searchbar/Searchbar.jsx'; 
import Button from 'components/Button/Button.jsx';
import Modal from 'components/Modal/Modal.jsx';
import { getPictures } from 'components/services/api'
import css from 'components/styles.module.css';


export class App extends Component {

  state = {
    picturies: [],
    page: 1,
    loading: false,
    error: null,
    searchName: '',
    showModal: false,
   totalHits: '',
    largeImageURL: '',
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({
        loading: true,
        
      });
    
      try {
     
        const data = await getPictures(page, searchName)
        const newPicturies = data.hits;
        const totalHits = data.totalHits;
        this.setState(({ picturies }) => {
          return {
            picturies: [...picturies, ...newPicturies],
            totalHits
          }
        })
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }
 
    onSearch = searchName => {
      this.setState({
        searchName,
        picturies: [],
        page: 1,
      })
    }

    loadMore = (page) => {
      this.setState(({ page }) => {
        return {
          page: page + 1
        }
      })
    }

    openModal = (largeImageURL) => {
      this.setState(({ showModal }) => ({
        showModal: !this.state.showModal,
        largeImageURL
      
      }))
     
    }

    closeModal = () => {
      this.setState({
        showModal: false,
        largeImageURL: '',
           
      })
    }

    render() {
 
      const { picturies, loading, error, showModal, largeImageURL,totalHits, page } = this.state;
      const { onSearch, loadMore, openModal, closeModal } = this;
      const isPictury = Boolean(picturies.length);
      const totalPage = Math.ceil(totalHits / 12);
 
      return (
        <div className={css.App}>
          {showModal && <Modal onClose={closeModal}>
            <img src={largeImageURL.largeImageURL} alt='' />
          </Modal>}
          <Searchbar onSubmit={onSearch} />
          {loading && <Loader />}
          {error && <p>Будь ласка спробуйте ще раз...</p>}
          {isPictury && <ImageGallery picturies={picturies} openModal={openModal} />}
           {isPictury && totalPage !== page && <Button loadMore={loadMore} text='Load more' />}
        </div>
      );
    };
  };


