import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

//Ορισμός διεπαφής
/*Αυτή η διεπαφή καθορίζει το σχήμα της τιμής περιβάλλοντος. 
Περιλαμβάνει ιδιότητες track_list και επικεφαλίδων, οι οποίες μπορεί
 να έχουν διάφορους τύπους όπως πίνακα, συμβολοσειρά ή αριθμό. Το [key: string]: 
 any επιτρέπει οποιεσδήποτε άλλες πρόσθετες ιδιότητες*/
 interface ContextPro {
  track_list?:({} | null)[] | string[] | number ; 
  heading?: ({} | null)[] | [] |" ";  
  [key: string]: any;
}

 // export const Context = createContext<ContextPro | null>(null);
 export const Context = createContext({} as ContextPro );
//export const Context = createContext<ContextPro | undefined>(undefined);


/*Αυτό το στοιχείο είναι υπεύθυνο για την παροχή της τιμής
 περιβάλλοντος στα θυγατρικά του στοιχεία. Χρησιμοποιεί τα useState και useEffect 
 για τη διαχείριση της κατάστασης και την ανάκτηση δεδομένων από το Musixmatch API.
Μέσα στο useEffect, υποβάλλεται ένα αίτημα HTTP GET για την ανάκτηση των 10 κορυφαίων κομματιών
 από το Musixmatch API. Στη συνέχεια, τα δεδομένα που λαμβάνονται αποθηκεύονται χρησιμοποιώντας τη συνάρτηση setState. 
 Τέλος, το στοιχείο αποδίδει το στοιχείο Context.Provider, παρέχοντας την τιμή περιβάλλοντος 
([state, setState]) στα θυγατρικά του στοιχεία.*/

export const ContextP: React.FC<React.PropsWithChildren> = ({ children }) =>  {
   
  const [state, setState] = useState<ContextPro[] | null | {} | string[]>([
 {
    track_list:[],
    heading:" ",
     },

  ]);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
         process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
         console.log(res.data);
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 10 Tracks"
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
} 