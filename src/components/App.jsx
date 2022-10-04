// // import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
// import { Component } from "react";
// // import axios from 'axios';
// import Loader from 'components/Loader/Loader.jsx'
// import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
// import Searchbar from 'components/Searchbar/Searchbar.jsx'; 
// import Button from 'components/Button/Button.jsx';
// import Modal from 'components/Modal/Modal.jsx';
// import { getPicturies } from 'components/services/api'
// import css from 'components/styles.module.css';


// export class App extends Component {

//   state = {
//     picturies: [],
//     page: 1,
//     loading: false,
//     error: null,
//     searchName: '',
//     showModal: false,
//    totalHits: '',
//     largeImageURL: '',
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchName, page } = this.state;
//     if (prevState.searchName !== searchName || prevState.page !== page) {
//       this.setState({
//         loading: true,
        
//       });
    
//       try {
     
//         const data = await getPicturies(page, searchName)
//         console.log(data)
//         const newPicturies = data.hits;
//         const totalHits = data.totalHits;
//         this.setState(({ picturies }) => {
//           return {
//             picturies: [...picturies, ...newPicturies],
//             totalHits
//           }
//         })
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }
 
//     onSearch = searchName => {
//       this.setState({
//         searchName,
//         picturies: [],
//         page: 1,
//       })
//     }

//     loadMore = (page) => {
//       this.setState(({ page }) => {
//         return {
//           page: page + 1
//         }
//       })
//     }

//     openModal = (largeImageURL) => {
//       this.setState(({ showModal }) => ({
//         showModal: !this.state.showModal,
//         largeImageURL
      
//       }))
     
//     }

//     closeModal = () => {
//       this.setState({
//         showModal: false,
//         largeImageURL: '',
           
//       })
//     }

//     render() {
 
//       const { picturies, loading, error, showModal, largeImageURL,totalHits, page } = this.state;
//       const { onSearch, loadMore, openModal, closeModal } = this;
//       const isPictury = Boolean(picturies.length);
//       const totalPage = Math.ceil(totalHits / 12);
 
//       return (
//         <div className={css.App}>
//           {showModal && <Modal onClose={closeModal}>
//             <img src={largeImageURL.largeImageURL} alt='' />
//           </Modal>}
//           <Searchbar onSubmit={onSearch} />
//           {loading && <Loader />}
//           {error && <p>Будь ласка спробуйте ще раз...</p>}
//           {isPictury && <ImageGallery picturies={picturies} openModal={openModal} />}
//            {isPictury && totalPage !== page && <Button loadMore={loadMore} text='Load more' />}
//         </div>
//       );
//     };
//   };



// import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { useState, useEffect } from "react";
// import axios from 'axios';
import Loader from 'components/Loader/Loader.jsx'
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
import Searchbar from 'components/Searchbar/Searchbar.jsx'; 
import Button from 'components/Button/Button.jsx';
import Modal from 'components/Modal/Modal.jsx';
import { getPicturies } from 'components/services/api'
import css from 'components/styles.module.css';


function App() {
  const [picturies, setPicturies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
 
  useEffect(() => {
    const fetchPicturies = async () => {
      setLoading(true);
      
      try {
        const data = await getPicturies(page, searchName);
        const newPicturies = data.hits;
        const totalHits = data.totalHits;
        setPicturies((picturies) => [...picturies, ...newPicturies]);
        setTotalHits(totalHits);
   
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (!searchName) {
      return console.log('Without');
    }
    fetchPicturies();
  }, [ page, searchName])
      

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }
  

  const isPictury = Boolean(picturies.length);
  const totalPage = Math.ceil(totalHits / 12);
  

  const onSearch = (searchName) => {
    setSearchName(searchName);
    setPicturies([]);
    setPage(1);
  }

   const openModal = (largeImageURL) => {
     setShowModal(true);
     setLargeImageURL(largeImageURL);
  }

    const closeModal = () => {
      setShowModal(false);
      setLargeImageURL('');
    }
  
  return (
    <div className={css.App}>
      {showModal && <Modal onClose={closeModal}>
        <img src={largeImageURL} alt='' />
      </Modal>}
      <Searchbar onChange={onSearch} />
      {loading && <Loader />}
      {error && <p>Будь ласка спробуйте ще раз...</p>}
      {isPictury && <ImageGallery picturies={picturies} openModal={openModal} />}
      {isPictury && totalPage !== page && <Button loadMore={loadMore} text='Load more' />}
    </div>
  );
}

export default App;
  
