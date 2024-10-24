import React, { useState } from 'react';
import Papa from 'papaparse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPlay, faSpinner, faHourglassHalf, faInfinity, faCircleNotch, faTimes, faEye, faInfo, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import '../css/app.css';
import '../css/inputs.css';
import '../css/table.css';
import axios from 'axios';
import { handleSubmit, handleGenerate } from '../Api';
import InstructionPage from './Instruction';

function Inputs({ onFileUpload,setinvoked,setdisabled,showIcon}) {
    const [itemListData, setItemListData] = useState([]);
    const [numOrders, setNumOrders] = useState(0);
    const [numOrderFiles, setNumOrderFiles] = useState(0);
    const [isConfigDisabled, setIsConfigDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [timePressure, setTimePressure] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [itemListFile, setItemListFile] = useState(null);
    const [isopenguidelines,setisopenGuideline]=useState(false);

    // Function to open the modal
    const handleModel = () => {
        setIsOpenModel(true);
    };

    // Function to close the modal
    const handleCloseModel = () => {
        setIsOpenModel(false);
        setisopenGuideline(false);
    };
    const handleOpenInfo=()=>{
        setisopenGuideline(true);
    }
    // File upload and CSV parsing logic
    const handleFileUpload = (e, setFile, setData) => {
        const file = e.target.files[0];
        setFile(file);

        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    setData(result.data);
                },
                skipEmptyLines: true,
            });
        }
    };

    // Function to render the table from parsed CSV data
    const renderTable = (data) => {
        if (data.length === 0) return null;

        const headers = Object.keys(data[0]);

        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
                <div className="table-body-container">
                    <table>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {headers.map((header, colIndex) => (
                                        <td key={colIndex}>{row[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="wms-inputs">
            <div className="input-div panel-title">WMS Inputs
                {!showIcon&&   <FontAwesomeIcon icon={faCircleInfo} className='information-icon' onClick={handleOpenInfo}/>}
              
            </div>
            <div className="form-group">
                <input
                    type="file"
                    id="itemList"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, setItemListFile, setItemListData)}
                />
                <button className="file-upload" onClick={() => document.getElementById('itemList').click()}>
                    <div className="file-upload-title-container">
                        <div className="file-upload-title">Upload Order History File</div>
                    </div>
                    <FontAwesomeIcon icon={faUpload} className="file-upload-icon" />
                </button>

                {itemListFile && <span className="file-name">{itemListFile.name}</span>}
                {/* {itemListFile && <button className="file-upload" onClick={handleModel}>Preview</button>} */}
                {itemListFile && <FontAwesomeIcon icon={faEye} onClick={handleModel}/>}
            </div>

            {/* Modal for displaying the table data */}
            {isOpenModel && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-button" onClick={handleCloseModel}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="modal-table-container">
                            {renderTable(itemListData)}
                        </div>
                    </div>
                </div>
            )}
            {isopenguidelines && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-button" onClick={handleCloseModel}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="modal-table-container">
                            <InstructionPage/>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-group">
                <div className="datagen">
                    <p className="title">Generate Order Lists</p>
                    <div className="datagen-body">
                        <div className="datagen-input-container">
                            <input
                                className="generate-input"
                                type="number"
                                value={numOrders === 0 ? '' : numOrders}
                                onChange={(e) => setNumOrders(e.target.value)}
                                placeholder="Orders per day"
                            />
                            <input
                                className="generate-input"
                                type="number"
                                value={numOrderFiles === 0 ? '' : numOrderFiles}
                                onChange={(e) => setNumOrderFiles(e.target.value)}
                                placeholder="Test Files"
                            />
                        </div>
                        <button
                            className="generate-button"
                            onClick={() => handleGenerate(numOrders, numOrderFiles, setIsConfigDisabled, setIsLoading)}
                            disabled={isLoading}
                        >
                            <span className='generate-button-text'>Generate</span>
                            <FontAwesomeIcon
                                className="generate-icon"
                                icon={isLoading ? faCircleNotch : faPlay} 
                                spin={isLoading}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="config">
                <p className="title">Configuration</p>
                <div className="time-container">
                    <button className="time-pressure" onClick={() => setTimePressure(!timePressure)}>
                        <span className="time-text">24 Hour Limit</span>
                    </button>
                    <div className="time-pressure-icon">
                        {timePressure && <FontAwesomeIcon icon={faHourglassHalf} className="time-icon" />}
                        {!timePressure && <FontAwesomeIcon icon={faInfinity} className="time-icon" />}
                    </div>
                </div>
                <div className="config-button-container">
                    <button className="config-button" disabled={isConfigDisabled} onClick={() => handleSubmit('random', timePressure, itemListFile, onFileUpload,setinvoked,setdisabled)}>Random Configuration</button>
                    <button className="config-button" disabled={isConfigDisabled} onClick={() => handleSubmit('smart', timePressure, itemListFile, onFileUpload,setinvoked,setdisabled)}>Smart Configuration</button>
                </div>
            </div>
        </div>
    );
}

export default Inputs;


