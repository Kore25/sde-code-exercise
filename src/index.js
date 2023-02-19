const readFile = require('./readFile');
const { calculateRoutes } = require('./business-logic');

const init = async () => {
    try {
        console.log('***** Process beginning *****');
        const shipmentPath = process.argv[2];
        const driversPath = process.argv[3];
        if(!shipmentPath || !driversPath) throw new Error('It is necesary to send the arguments correctly. First you need put shipment path and then drivers path');
        const shipmentData = await readFile.getFile(shipmentPath);
        const driversData = await readFile.getFile(driversPath);
        const data = await calculateRoutes(shipmentData.split(/\r?\n/), driversData.split(/\r?\n/));
        console.log('Your list is this: ');
        data.routes.map( r => {
            if(r.driver)
                console.log(`Destiny: ${r.route}, Driver: ${r.driver}, because have ss: ${r.ss} points`);
            else
                console.log(`You don´t have enogh drivers to this destiny: ${r.route}`);
        });
        if(data.missingDrivers.length > 0)
            console.log('You have this drivers without destiny: ', data.missingDrivers.join(', '));
        console.log('***** Process end *****');
    } catch (error) {
        console.error('Error in the process: ', error);
    }
}

init();