import React from 'react'

export default function Spacer({ size }:{size: number}) {
    const _size = `${size}px`

    return (
        <div style={{width: _size, height: _size}}></div>
    )
}