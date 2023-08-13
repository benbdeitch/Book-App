




export default function List_Add_Button({string}:encasedString){

    function sayIdName() {
        alert(string)
    }

    return(
        <>
        <button onClick = {sayIdName}>
            Add to History?
        </button>
        
        </>
    )




}