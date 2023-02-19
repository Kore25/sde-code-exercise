const driversSelected = [];
const routes = [];

const calculateRoutes = (shipmentData, driversData) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Start calculating the best driver for shipment  ...');
            shipmentData.forEach( async (shipmentLine, index) => {
                const shipmentLength = shipmentLine.length;
                const isEven = shipmentLength % 2 === 0;
                const bestDriver = await getBestDriver(driversData, isEven);
                let missingDrivers = []
                if(driversData.length > shipmentData.length) missingDrivers = await getMissingDrivers(driversData);
                routes.push({ route: shipmentLine, driver: bestDriver.name, ss: bestDriver.ss });
                if (shipmentData.length - 1 === index){
                    console.log('The calculation is done.');
                    return resolve({routes, missingDrivers});
                }
            });
        } catch (error) {
            return reject(error);
        }
    })
}

const getBestDriver = (driversData, isEven) => {
    return new Promise((resolve, reject) => {
        try {
            const bestDriver = [];
            driversData.forEach( (driversLine, index) => {
                let ss = 0;
                if(!driversSelected.includes(driversLine)){
                    if(isEven){
                        const driverVowelsCount = driversLine.match(/[aeiou]/gi).length;
                        ss =  driverVowelsCount * 1.5;
                        bestDriver.push({ name: driversLine, ss });
                    } else {
                        const driverConsonantsCount = driversLine.match(/[^aeiou]/gi).length;
                        ss =  driverConsonantsCount * 1;
                        bestDriver.push({ name: driversLine, ss });
                    }
                }
                if (driversData.length - 1 === index){
                    let best = {};
                    if(bestDriver.length > 0){
                        best = bestDriver.reduce((prev, current) =>  prev.ss > current.ss ? prev : current);
                        driversSelected.push(best.name);
                    }
                    return resolve(best);
                }
            });
        } catch (error) {
            return reject(error);
        }
    })
}

const getMissingDrivers = (driversData) => {
    return new Promise((resolve, reject) => {
        try {
            const missingDrivers = [];
            driversData.forEach( (driversLine, index) => {
                if(!driversSelected.includes(driversLine)){
                    missingDrivers.push(driversLine);
                }
                if (driversData.length - 1 === index){
                    return resolve(missingDrivers);
                }
            });
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
    calculateRoutes,
}