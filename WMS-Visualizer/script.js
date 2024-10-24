document.addEventListener('DOMContentLoaded', () => {
    const warehouse = d3.select('#warehouse');
    const cellInfo = d3.select('#cellInfo');

    const racks = 4;
    const baysPerRack = 2;
    const cellsPerBay = 10;
    const cellWidth = 50;
    const cellHeight = 30;
    const bayWidth = cellWidth;
    const rackWidth = baysPerRack * bayWidth * 2; // No extra space between bays
    const rackHeight = cellsPerBay * cellHeight + 20;
    const marginLeft = 50;

    // Create warehouse layout
    for (let r = 0; r < racks; r++) {
        const rackGroup = warehouse.append('svg')
            .attr('width', rackWidth)
            .attr('height', rackHeight)
            .attr('x', 0)
            .attr('y', r * (rackHeight + 20));

        for (let b = 0; b < baysPerRack; b++) {
            for (let c = 0; c < cellsPerBay; c++) {
                rackGroup.append('rect')
                    .attr('class', 'cell')
                    .attr('width', cellWidth)
                    .attr('height', cellHeight)
                    .attr('stroke', 'black')
                    .attr('x', marginLeft + (b * bayWidth)) // No space between bays
                    .attr('y', c * cellHeight)
                    .datum({ rack: r, bay: b, cell: c, info: `Rack ${r}, Bay ${b}, Cell ${c}` })
                    .on('click', function (event, d) {
                        cellInfo.text(JSON.stringify(d, null, 2));
                    });
            }
        }
    }

    // Handle file input
    $('#fileInput').on('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            // Process CSV contents
            // You can add your CSV processing logic here
            console.log(contents);
        };
        reader.readAsText(file);
    });
});
