import React, { useState, useEffect } from 'react';

const PageTitle = ({pageTitle}) => {
    return (
        <h4 className="border-bottom fw-bold pb-2">
            {pageTitle}
        </h4>
    )
}

export default PageTitle;
