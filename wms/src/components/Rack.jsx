import React from 'react';
import Cell from './Cell';
import '../css/rack.css';

function Rack({ numBays, cellData, rackId, startIndex, onCellClick }) {
    const cellsPerBay = 20;
    const totalCells = numBays * cellsPerBay;

    return (
        <div className="rack-container">
            <div className="rack">
                {Array.from({ length: numBays }).map((_, colIndex) => (
                    <div key={colIndex} className="bay">
                        {Array.from({ length: cellsPerBay }).map((_, cellIndex) => {
                            const currentIndex = startIndex + (colIndex * cellsPerBay) + cellIndex;
                            const data = cellData[currentIndex] || { name: '', otherInfo: '' };
                            return (
                                <Cell
                                    key={currentIndex}
                                    cellData={data}
                                    onCellClick={onCellClick}
                                    
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rack;
