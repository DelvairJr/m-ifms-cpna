import React from 'react'

export default props =>
    <div className={`card border-${props.border} mb-3`} key={props.key}>
        <div className="card-body">
            {props.children}
        </div>
    </div>