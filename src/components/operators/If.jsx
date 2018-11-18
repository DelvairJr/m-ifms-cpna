import React from 'react'

export default props => {
    if(props.test) {
        //se for TRUE retorne todos os components filhos dentro da tag IF
        return props.children
    } else {
        return false
    }
}