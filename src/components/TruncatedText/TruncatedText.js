import React from 'react'

import './truncatedText.css'

const TruncatedText = ({ text, maxLength }) => {
    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }

    const truncatedText = `${text.slice(0, maxLength)}...`;

    return <small title={text}>{truncatedText}</small>;
}

export default TruncatedText