

export default function Box({ children }: {children:JSX.Element | JSX.Element[]} ){

    return (
        <div className="Box">
        {children}
        </div>
    )



}