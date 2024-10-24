import React, { useState } from 'react';
import Inputs from './components/Inputs';
import Layout from './components/Layout';
import CellView from './components/CellView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchCellData, fetchWarehouseData } from './Api';

import './css/app.css';
import './css/table.css';

function App() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [cellData, setCellData] = useState({});
    const [warehouseData, setWarehouseData] = useState({});
    const [invoked, setinvoked] = useState(false);
    const [isdisabled,setisdisabled]=useState(true)
    
    // State to control visibility of the left and right panels
    const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
    const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

    const onCellClick = (cellData) => {
        setSelectedCell(cellData);
    };

    const onFileUpload = () => {
        setCellData({});
        fetchCellData(setCellData);
        fetchWarehouseData(setWarehouseData);
    };
    console.log("disabled",isdisabled);

    return (
        <div className="wms">
          
          <div
                className={`panel-toggle left-panel-toggle ${isLeftPanelVisible ? 'expanded' : 'collapsed'}`}
                onClick={() => setIsLeftPanelVisible(!isLeftPanelVisible)}
            >
                <FontAwesomeIcon icon={isLeftPanelVisible ? faTimes : faBars} />
            </div>

       
            <div className={`left-panel ${isLeftPanelVisible ? 'expanded' : 'collapsed'}`}>
                <Inputs  setinvoked={setinvoked} onFileUpload={onFileUpload} setCellData={setCellData} setdisabled={setisdisabled} showIcon={isdisabled} />
            </div>

            <div className="center-panel">
                <Layout onCellClick={onCellClick} cellData={cellData} invoked={invoked} />
            </div>

           
            <div
               className={`panel-toggle right-panel-toggle ${isdisabled ? 'disabled' : 'right-panel-toggle'}`}
               onClick={() => {
                  if (!isdisabled) {
                  setIsRightPanelVisible(!isRightPanelVisible);
                 }
                 }}
            >
    <FontAwesomeIcon icon={isRightPanelVisible ? faTimes : faBars} />
</div>


         
            <div className={`right-panel ${isRightPanelVisible ? 'expanded' : 'collapsed'}`}>
                <CellView selectedCell={selectedCell} warehouseData={warehouseData} />
            </div>
        </div>
    );
}

export default App;
