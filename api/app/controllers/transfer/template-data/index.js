const readline = require('readline');
const fileStream = require('fs');
import Action from '../../../../core/framework/action';

const getLineData = line => {
    const data = line.split('|');

    if (data.length > 1) {
        const [type, myNumber, clientNumber, clientTitle, address, cost, lp, title] = data;

        return {
            type,
            myNumber,
            clientNumber,
            clientTitle,
            address,
            cost,
            lp,
            title
        }
    }

    return false;
};

class TemplateDataAction extends Action {
    constructor() {
        super();
        this.data = [];
        this.fileTemplate = './template.txt';
    }

    createInterface() {
        const interfaceInstance = readline.createInterface({
            input: fileStream.createReadStream(this.fileTemplate),
            crlfDelay: Infinity
        });

        return interfaceInstance ? interfaceInstance : false;
    }

    getSuccessResponseData() {
        return this.data.filter(array => !!array);
    }

    getFileErrorResponseData() {
        return "File not found";
    }

    async render() {
        const readLinesInterface = this.createInterface();

        if (!this.createInterface()) {
            this.response.status(404).send(this.getFileErrorResponseData());
        }

        readLinesInterface.on('line', (line) => {
            this.data.push(getLineData(line));
        }).on('close', () => {
            this.response.status(200).send(this.getSuccessResponseData());
        });
    }
}

export default TemplateDataAction;
