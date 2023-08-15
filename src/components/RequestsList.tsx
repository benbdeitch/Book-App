


export default function RequestsList({array}:encasedStringArray){


    return(
        <>
        {array && array.length>0 && array.map((item) => {
            <div className="Box">
                <h5>{item}</h5>
            </div>}
            )
            }
    
            </>)

}