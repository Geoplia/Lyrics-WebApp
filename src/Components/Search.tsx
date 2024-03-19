import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Context } from "./Context";

const Search = () => {
  // Πρόσβαση στο περιβάλλον χρησιμοποιώντας το useContext
  const ctxt = useContext(Context) 
  const [state, setState]:{} | any = ctxt; //Καταστροφή της κατάστασης του
  const [userInput, setUserInput] = useState(""); //Κατάσταση για εισαγωγή χρήστη
  const [trackTitle, setTrackTitle] = useState(""); //Κατάσταση του τίτλο του κομματιού

  useEffect(() => { 
    //Αίτημα API για την ανάκτηση των αποτελεσμάτων αναζήτησης κομματιών
      axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      /*Η πρόσβαση στην απάντηση γίνεται χρησιμοποιώντας την ιδιότητα res.data. 
      Η λίστα κομματιών εξάγεται από την απάντηση και αποθηκεύεται στη μεταβλητή track_list.*/
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });//Ενημέρωση της κατάστασης με τη νέα λίστα κομματιών που ανακτήθηκε
      })
      //διαχείρηση σε περίπτωση error 
      .catch(err => console.log(err));
  }, [trackTitle]); /* Eκτελείται ξανά κάθε φορά που αλλάζει η κατάσταση του trackTitle.
   Έτσι το αίτημα API ενεργοποιείται με τον ενημερωμένο τίτλο του κομματιού. */

  /*Συνάρτηση findTrack που ενεργοποιείται όταν ο χρήστης υποβάλλει τη φόρμα αναζήτησης.
   Περιορισμός με e.preventDefault(), ορίζει την κατάσταση trackTitle με την τιμή του userInput 
   και ενεργοποιεί το αίτημα API. */
  const findTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrackTitle(userInput); //Ρύθμιση της κατάστασης του τίτλου του κομματιού με την είσοδο χρήστη
  };

  /*Η συνάρτηση onChange είναι ένας χειριστής συμβάντων για το πεδίο εισαγωγής. 
  Ενημερώνει την κατάσταση userInput καθώς ο χρήστης πληκτρολογεί στο πεδίο εισαγωγής. 
  Ενεργοποιείται από το συμβάν onChange του πεδίου εισαγωγής
  και το e.target.value παρέχει την τρέχουσα τιμή του πεδίου εισαγωγής. */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value); //Ενημέρωση της κατάστασης εισαγωγής χρήστη καθώς ο χρήστης πληκτρολογεί στο πεδίο εισαγωγής
  };

 //φόρμα αναζήτησης και τα στοιχεία της
 
 //onSubmit, το οποίο ενεργοποιείται όταν υποβάλλεται η φόρμα. Καλεί τη συνάρτηση findTrack, περνώντας στο αντικείμενο συμβάντος e.
 
 /*Μέσα στη φόρμα, υπάρχει ένα div με την ομάδα φόρμας κλάσης που περιέχει ένα στοιχείο εισαγωγής. 
 Αυτό το πεδίο εισαγωγής επιτρέπει στους χρήστες να εισάγουν τον τίτλο του τραγουδιού που θέλουν να αναζητήσουν. 
 Το πρόγραμμα χειρισμού συμβάντων onChange είναι συνδεδεμένο για να ενημερώνεται η κατάσταση userInput καθώς πληκτρολογείται ο χρήστης. */ 
 
 /*Κάτω από το πεδίο εισαγωγής, υπάρχει ένα στοιχείο κουμπιού με την κλάση btn btn-κύριο btn-lg btn-block mb-7. 
 Αυτό το κουμπί αντιπροσωπεύει το κουμπί υποβολής για τη φόρμα. Όταν γίνεται κλικ, ενεργοποιεί την υποβολή της φόρμας 
 και καλεί τη συνάρτηση findTrack. */
 return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For Lyrics
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={(e) =>findTrack(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-7" type="submit">
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;