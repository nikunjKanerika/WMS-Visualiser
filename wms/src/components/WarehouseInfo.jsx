import React from 'react';
import '../css/cellview.css';
import Result from './Result';

function WarehouseInfo({ warehouseData }) {
    if (!warehouseData) return null;

    return (
        <div className="warehouse-info">
            <table className="wh-info-table">
                <tbody>
                    <tr>
                        <td className="wh-info-label">Cells Travelled:</td>
                        <td className="wh-info-value">{warehouseData.cost ? warehouseData.cost.toFixed(2) : null}</td>
                    </tr>
                    <tr>
                        <td className="wh-info-label">Distance Travelled:</td>
                        <td className="wh-info-value">{warehouseData.distance ? warehouseData.distance.toFixed(2) + " meters" : null}</td>
                    </tr>
                    <tr>
                        <td className="wh-info-label">Order Fulfilment Time:</td>
                        <td className="wh-info-value">{warehouseData.time ? warehouseData.time.toFixed(2) + " hours" : null}</td>
                    </tr>
                    <tr>
                        <td className="wh-info-label">Order Processed:</td>
                        <td className="wh-info-value">{warehouseData.orders_processed ? warehouseData.orders_processed.toFixed(0) : null}</td>
                    </tr>
                </tbody>
            </table>
            {warehouseData.config === "random" && <Result warehouseData={warehouseData} />}
        </div>
    );
}

export default WarehouseInfo;
