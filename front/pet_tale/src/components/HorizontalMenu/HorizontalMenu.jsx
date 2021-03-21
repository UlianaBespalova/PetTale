import React, { useState, useEffect } from 'react';

const HorizontalMenu = () => {
    return (
        <nav className="nav nav-underline">
            <span className="nav-link">Сортировать по:</span>
            <span className="nav-link">Цене</span>
            <span className="nav-link">Новизне</span>
        </nav>
    )
}

export default HorizontalMenu;
