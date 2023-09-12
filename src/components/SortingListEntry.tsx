import { useDrag } from 'react-dnd'

export default function SortingListEntry({entry}:EncasedBookListEntry) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type: 'READINGLISTENTRY',
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
        {/* The drag ref marks this node as being the "pick-up" node */}
        <div role="Handle" className="Box" ref={drag}>
            {entry.book.title}, {entry.book.author}
            </div>
    </div>
  )
}