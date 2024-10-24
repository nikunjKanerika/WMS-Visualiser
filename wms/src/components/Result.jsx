import React, { useState } from 'react';
import '../css/result.css';

function Result({ warehouseData }) {
    const [wagesPerHour, setWagesPerHour] = useState(0);
    const [profitPerOrder, setProfitPerOrder] = useState(0);

    if (!warehouseData) return null;

    const moneySaved = () => {
        let money = 0.0;
        if (timeSaved >= 0) {
            money += Math.max(timeSaved, 0) * wagesPerHour
        } else console.log("Time saved is negative");
        if (ordersProcessedDelta >= 0) {
            money += warehouseData.orders_processed_delta * profitPerOrder
        } else console.log("Orders processed delta is negative");
        return money
    }

    const timeSaved = parseFloat(warehouseData.time_delta).toFixed(1)
    const ordersProcessedDelta = warehouseData.orders_processed_delta;
    const profit = moneySaved();

    return (
        <div className="resultt">
            <p className="resultt-title">With Smart Config, you can</p>
            {timeSaved > 0 &&
                <p className="resultt-tag">Save {timeSaved} hours</p>
            }
            {ordersProcessedDelta > 0 &&
                <p className="resultt-tag">Process {ordersProcessedDelta.toFixed(0)} more orders</p>
            }
            <div className="profit-input-container">
                <div className="profit-input">
                    <p className="profit-label">Wages per Hour</p>
                    <input
                        className="profit-value"
                        type="number"
                        id="wagesPerHour"
                        value={wagesPerHour}
                        onChange={(e) => setWagesPerHour(e.target.value)}
                    />
                </div>
                <div className="profit-input">
                    <p className="profit-label">Profit per Order</p>
                    <input
                        className="profit-value"
                        type="number"
                        id="profitPerOrder"
                        value={profitPerOrder}
                        onChange={(e) => setProfitPerOrder(e.target.value)}
                    />
                </div>
            </div>
            {(wagesPerHour || profitPerOrder) ? (
                <p className="profit">Money saved: ${profit.toFixed(2)}</p>
            ) : null}
        </div>
    );
}

export default Result;
