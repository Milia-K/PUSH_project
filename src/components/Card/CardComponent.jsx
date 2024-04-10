import React from 'react'

function CardComponent(props) {

const {id, title, body, handlePostClick, isSelected} = props;

  return (
    <div className={`card ${isSelected ? 'selected' : 'card_component '}`} id={id} onClick={() => handlePostClick(id)}>
        <p className='card_component_title'>{title}</p>
        <div className='card_component_body'>{body}</div>
    </div>
  )
}

export default CardComponent
