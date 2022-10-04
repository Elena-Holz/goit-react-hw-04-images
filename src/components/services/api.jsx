import axios from "axios";

export const getPicturies = async (page = 1, search) => {
    const {data} = await  axios.get(`https://pixabay.com/api/?key=29134253-bbfb6b627ddeed17a742fb71a&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${search}`)
    return data;
}

