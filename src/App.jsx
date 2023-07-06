import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";

import { db,auth } from "./config/firebase";
import { getDocs, collection,addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore";

function App() {
  const [movies, setMovies] = useState([]);

const [newMovieTitle,setNewMovieTitle]=useState("")
const [newReleaseDate,setNewReleaseDate]=useState(0)
const [isOscar,setIsOscar]=useState(false)

const [updatedTitle,setUpdatedTitle]=useState('')

  const movieCollectionRef = collection(db, "movies");
  const deleteMovie=async(id)=>{
    const movieDoc=doc(db,'movies',id)
    await deleteDoc(movieDoc)
      } 
      const updateMovieTitle= async (id)=>{
const movieDoc=doc(db,"movies",id)
await updateDoc(movieDoc,{
  title:updatedTitle
})
      }
  const getMovies = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setMovies(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getMovies();
  }, [movies]);



  const onSubmitMovie=async ()=>{
    try {
      await addDoc(movieCollectionRef,{
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        oscar:isOscar,
        userId:auth?.currentUser?.uid
      })
      getMovies()
    } catch (error) {
      console.log(error);
    }

  }
 
  return (
    <div>
      <Auth />
      <div>
        <input onChange={(e)=>setNewMovieTitle(e.target.value)} type="text" placeholder="Movie Name" />
        <input onChange={(e)=>setNewReleaseDate(Number(e.target.value))} type="number" placeholder="Year"/>
        <label htmlFor="oscar">oscar recieved</label>
        <input checked={isOscar} onChange={(e)=>setIsOscar(e.target.value)} type="checkbox"  name="oscar" id="" />
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>
      <div>
        {movies.map((movie) => {
          return (
            <div>
              <h1 style={{ color: movie.oscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p>Date:{movie.releaseDate}</p>
              <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
              <input type="text" placeholder="new title" onChange={(e)=>setUpdatedTitle(e.target.value)} />
              <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
