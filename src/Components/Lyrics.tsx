import React, {useContext} from 'react'
import LyricLists from './LyricLists';
import { Context} from './Context'

import{ Droppable, DragDropContext  } from 'react-beautiful-dnd'


const Lyrics = () =>{
  // Πρόσβαση στις τιμές περιβάλλοντος χρησιμοποιώντας το useContex
  const ctxt = useContext(Context)  ;
  if (ctxt == null) return <div>No context yet</div>;
  const [state]:any = ctxt



  const { track_list, heading } = state;



   //Εάν το track_list είναι undefined ή κενό, εμφανίζεται Loading. 
  if (track_list === undefined || track_list.length === 0) {
    return <h1>Loading...</h1>;
  } else {

    //συνάρτηση onDragEnd
    const onDragEnd =(result:any) => {
         if(!result.destination) 
         return;
    }

    return (
      <>
        <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId="droppable">
        {(provided) => ( 

        /*Μέσα σε ένα <div> με την κλάση "row", αντιστοιχίζεται στον πίνακα track_list
        και παίρνονται στοιχεία από το LyricLists, περνώντας τις παραμέτρους. */
          <div{...provided.droppableProps}
          ref={provided.innerRef}>
          <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">  
          {track_list.map((item:any, index:number) => (
            <LyricLists 
            key={item.track.track_id} 
            track={item.track} 
            index={index} />

           
          

          ))}
           {provided.placeholder}
        </div>
      
          </div>
          

        )}
        
          
        
        </Droppable>
        </DragDropContext>
      
      </>
    );
  }
};


export default Lyrics;
