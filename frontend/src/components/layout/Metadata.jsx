import React from 'react';
import { Helmet } from 'react-helmet-async';

const Metadata = ({ title }) => {
    return (
        <Helmet>
           <title>{`${title} - Furnishe`}</title> 
        </Helmet>
    )
}

export default Metadata
