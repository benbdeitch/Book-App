import { useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserProvider";

export default function SortingList(){
const dragEntry = useRef<number|null>();      

const {readingList, setReadingList} = useContext(UserContext)
const [list, setList] = useState(readingList);
const dragOverItem = useRef<number|null>();

const dragStart = ( position:number) => {
    dragEntry.current = position;
  };

const drop = (e:React.DragEvent<HTMLDivElement>) => {
    
    if (dragEntry.current!=null && dragOverItem.current!= null){
         const readingListCopy = [...readingList];
        const dragItemContent = readingListCopy[dragEntry.current];
    
        readingListCopy.splice(dragEntry.current, 1);
        readingListCopy.splice(dragOverItem.current, 0, dragItemContent);
        dragEntry.current = null;
        dragOverItem.current = null;
        for (let i = 0; i<readingListCopy.length; i++){
            readingListCopy[i].priority=readingListCopy.length-i

        }
        setList(readingListCopy);
        setReadingList(readingListCopy)

    }
};

const dragEnter = (e:React.DragEvent<HTMLDivElement>, position:number) => {
    dragOverItem.current = position;
    if (e.target && e.target)
    console.log(e.target);
  };
return (
  <>
  <div className="Box">
  {
  list.map((entry, index) => (
    <div style={{backgroundColor:'green', margin:'20px ', textAlign:'center', fontSize:'16px', borderRadius:'10px', }}
      key={index}
      onDragStart={() => dragStart(index)}
      onDragEnter={(e:React.DragEvent<HTMLDivElement>) => dragEnter(e, index)}
      onDragEnd={drop}
      draggable>
        <hr/>
        {readingList.length - entry.priority + 1})  {entry.book.title}, {entry.book.author}, {entry.dateAdded}
    </div>
    ))}
    </div>
  </>
);
};
