import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
//import Moment from "react-moment";


const Lyric = () => {
  const [track, setTrack] = useState<any>([]); // Μεταβλητή για αποθήκευση δεδομένων τραγουδιού 
  const [lyrics, setLyrics] =useState<any>([]); // Μεταβλητή για αποθήκευση Lyrics 
  const params = useParams(); // Μεταβλητή για πρόσβαση στις παραμέτρους του URL 

// Ανάκτηση πληροφοριών τραγουδιού 
/* Το useEffect χρησιμοποιείται για την ανάκτηση δεδομένων από το Musixmatch API και την ενημέρωση των μεταβλητών 
κατάστασης κομματιού και στίχων με βάση την τιμή params.id.
Το useEffect ενεργοποιείται κάθε φορά που αλλάζει η τιμή params.id. Αυτό διασφαλίζει ότι τα δεδομένα 
ανακτώνται ξανά και οι μεταβλητές κατάστασης ενημερώνονται κάθε φορά που αλλάζει η παράμετρος αναγνωριστικού
 στη διεύθυνση URL. */
  useEffect(() => {
    axios
    /* Aίτημα HTTP GET στο Musixmatch API χρησιμοποιώντας τη βιβλιοθήκη axios. Περιλαμβάνει το τελικό σημείο track.lyrics.get
    με την παράμετρο track_id. Tο κλειδί API περιλαμβάνεται επίσης στη διεύθυνση URL. */
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      /* Λαμβάνει την απάντηση από το API ως παράμετρο res. Μέσα σε αυτήν την επανάκληση, στη μεταβλητή lyrics 
      εκχωρείται η τιμή res.data.message.body.lyrics, η οποία περιέχει τα δεδομένα των στίχων.*/
      .then(res => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({ lyrics });

        /* Αυτό το δεύτερο αίτημα ανακτά τα δεδομένα κομματιού χρησιμοποιώντας το τελικό σημείο track.get */
                return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      /* Λαμβάνει την απάντηση από το API ως παράμετρο res. Μέσα σε αυτήν την επανάκληση, στη μεταβλητή κομματιού 
      εχωρείται η τιμή του res.data.message.body.track, η οποία περιέχει τα δεδομένα κομματιού. */
      .then(res => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      /* συνάρτηση για τυχόν σφάλματα που προκύπτουν κατά τη διάρκεια των αιτημάτων axios*/
      .catch(err => console.log(err));
  }, [params.id]);

  if (
    track === undefined || // Εάν τα δεδομένα του κομματιού δεν είναι καθορισμένα
    lyrics === undefined ||  // ή τα δεδομένα των στίχων δεν έχουν οριστεί
    Object.keys(track).length === 0 || // ή το αντικείμενο του κομματιού είναι κενό
    Object.keys(lyrics).length === 0  // ή οι στίχοι είναι κενοί
  ) {
    return <h1>Loading...</h1>;
  } else { 
    //Κουμπί go back me link sto Home page
    //Αποδίδει μια κάρτα με το όνομα του κομματιού και το όνομα καλλιτέχνη.
    //Αποδίδει τους στίχους του κομματιού.
    //Εμφάνιση πρόσθετων πληροφοριών σχετικά με το κομμάτι, όπως το άλμπουμ, το είδος... 
    return ( <> 
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back 
        </Link>
    
        <div className="card"> 
          <h5 className="card-header">
            {track.track.track_name} by{" "}
            <span className="text-secondary">{track.track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            {/* <Moment format="MM/DD/YYYY">
              {track.track.first_release_date}
            </Moment> */}
          </li>
        </ul>
      </>
    );
  }
};

export default Lyric;