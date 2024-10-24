import React, { useState } from 'react';
import '../css/cell.css';

function Cell({ cellData, onCellClick }) {
    const [isHovered, setIsHovered] = useState(false); 
    const displayText = cellData && cellData.name ? cellData.name.slice(0, 2) : '';

    return (
        <div
            className="cell"
            onMouseEnter={() => {
                setIsHovered(true);
                onCellClick(cellData);
            }}
            onMouseLeave={() => setIsHovered(false)} // Hide data view when mouse leaves
        >
            {displayText}
            
            {/* Display cell data when hovered */}
            {/* {isHovered && cellData && cellData.name && (
                <div className="cell-data-view">
                    <div className="cell-data-title">Cell View</div>
                    <table className="cell-info-table">
                        <tbody>
                            <tr>
                                <td className="cv-label">Name</td>
                                <td className="cv-info-name">{cellData.name}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Demand</td>
                                <td className="cv-info">{cellData.demand?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Cover</td>
                                <td className="cv-info">{cellData.cover}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Inventory</td>
                                <td className="cv-info">{cellData.inventory}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Order Volume (6 months)</td>
                                <td className="cv-info">{cellData.quantity_6_months}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Volume</td>
                                <td className="cv-info">{cellData.volume}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )} */}
        </div>
    );
}

export default Cell;
