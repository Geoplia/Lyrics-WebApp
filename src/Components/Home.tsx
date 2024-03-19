import React from 'react'
import Lyrics from './Lyrics'
import Search from './Search'

//Αρχική σελίδα της εφαρμογής Home
/*Μέσα στη return, τα στοιχεία Search και Lyrics αποδίδονται χρησιμοποιώντας σύνταξη JSX.
Είναι τυλιγμένα μέσα σε ένα στοιχείο React.Fragment για να ομαδοποιηθούν χωρίς να εισάγεται ένα πρόσθετο στοιχείο HTML.
Το στοιχείο Home εξάγεται ως default, καθιστώντας το διαθέσιμο για εισαγωγή και χρήση σε άλλα μέρη της εφαρμογής.*/


/*https://cors-anywhere.herokuapp.com/corsdemo */


function Home() {
  return (
  
    <div>
    
      <React.Fragment>
          <Search />
        
          <Lyrics />
      
      </React.Fragment>
    </div>
   
  )
}

export default Home