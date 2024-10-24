import React, { useState, useEffect } from 'react';
import Rack from './Rack';
import LayoutImage from '../assets/layout.png';
import axios from 'axios';

import '../css/app.css';
import '../css/layout.css';

import InstructionPage from './Instruction';

const NUM_BAYS = 6;
const NUM_CELLS = 10;

function Layout({ onCellClick, cellData,invoked}) {

    console.log("value of invoked is",invoked);
    return (
        <>
        
        { !invoked ? (<InstructionPage/>) :(
             <div className="layout-container">
            <div className="panel-title">Warehouse Layout</div>
            <div className="warehouse-layout">
                <Rack numBays={1} cellData={cellData} rackId={0} startIndex={0}  onCellClick={onCellClick} />
                <Rack numBays={2} cellData={cellData} rackId={1} startIndex={20} onCellClick={onCellClick} />
                <Rack numBays={2} cellData={cellData} rackId={2} startIndex={60} onCellClick={onCellClick} />
                {/* <Rack numBays={2} cellData={cellData} rackId={2} startIndex={60} onCellClick={onCellClick} />
                <Rack numBays={2} cellData={cellData} rackId={2} startIndex={60} onCellClick={onCellClick} />
                <Rack numBays={2} cellData={cellData} rackId={2} startIndex={60} onCellClick={onCellClick} />*/}
                <Rack numBays={1} cellData={cellData} rackId={3} startIndex={100} onCellClick={onCellClick} /> 
            </div>
        </div>)}
       
        </>
        
    );
}

export default Layout;
