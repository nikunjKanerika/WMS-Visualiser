import React from 'react';
import '../css/cellview.css';
import WarehouseInfo from './WarehouseInfo';

function CellView({ selectedCell, warehouseData }) {
    return (
        <div className="display">
            <div className="info-panel-title">Warehouse Info</div>
            <WarehouseInfo warehouseData={warehouseData} />

                <div className="panel-cell-title">Cell View</div>
            <div className="cell-view">
                {selectedCell && selectedCell.demand ? (
                    <table className="cell-info-table">
                        <tbody>
                            <tr>
                                <td className="cv-label">Name</td>
                                <td className="cv-info-name">{selectedCell.name}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Demand</td>
                                <td className="cv-info">{selectedCell.demand.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Cover</td>
                                <td className="cv-info">{selectedCell.cover}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Inventory</td>
                                <td className="cv-info">{selectedCell.inventory}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Order Volume (6 months)</td>
                                <td className="cv-info">{selectedCell.quantity_6_months}</td>
                            </tr>
                            <tr>
                                <td className="cv-label">Volume</td>
                                <td className="cv-info">{selectedCell.volume}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-cell">Select a cell to see details</p>
                )}
            </div>
        </div>
    );
}

export default CellView;
