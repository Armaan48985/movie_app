import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjdjMTNiMWFjNjhiOTEyZWUyNTY3MjdjOWRjYzZmNyIsInN1YiI6IjY1OWEzODVlY2E0ZjY3MDI1YTU3NTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U4aQ5ZLK66ArmJan-GIRF6XiZHpFizO6NWECOdD5ykQ'
      },
    params: {
        api_key: process.env.API_KEY
    }
})