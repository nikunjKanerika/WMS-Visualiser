import axios from "axios"

export const handleSubmit = async (configType, timePressure, itemListFile, onFileUpload,setinvoked,setdisabled) => {
    if (!itemListFile) return;


    const formData = new FormData();
    formData.append('itemList', itemListFile);
    formData.append('configType', configType);
    formData.append('timePressure', timePressure);
    console.log("Time Pressure: ", timePressure);
    

    axios
        .post('http://127.0.0.1:5000/upload', formData)
        .then((response) => {
            onFileUpload();
            setinvoked(true);
            setdisabled(false);
            
        })
        .catch((error) => {
            console.error('Error uploading file: ', error);
        });
};

export const fetchCellData = (setCellData) => {
    axios.get('http://127.0.0.1:5000/warehouse?req=items')
        .then(response => {
            setCellData(response.data);
        })
        .catch(error => {
            console.error('Error fetching cell data:', error);
        });
};

export const fetchWarehouseData = (setWarehouseData) => {
    axios.get('http://127.0.0.1:5000/warehouse?req=warehouse')
        .then(response => {
            setWarehouseData(response.data);
        })
        .catch(error => {
            console.error('Error fetching cell data:', error);
        });
};

export const handleGenerate = async (numOrders, numOrderFiles, setIsConfigDisabled, setIsLoading) => {
    setIsConfigDisabled(true);
    setIsLoading(true);

    try {
        const response = await axios.post('http://127.0.0.1:5000/datagen', { numOrders, numOrderFiles });
        setIsConfigDisabled(false);
        setIsLoading(false);
    } catch (error) {
        console.error('Error generating order lists:', error);
        setIsConfigDisabled(false);
        setIsLoading(false)
    }
};
