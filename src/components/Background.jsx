import React from 'react'
import img from '../background.jpg'
export default function Background({children, image}) {
    return (
        <div style={{ backgroundImage: `url(${img || image})`, backgroundPosition:"center", backgroundSize:"cover", display:"flex", flexDirection:"column", flex:1 }}
        >
            {children}
        </div>
    )
}
