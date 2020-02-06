const fileStream = require('fs');
import Action from '../../../../core/framework/action';

const convertObjectToArray = (data) => {
    const {
        type = '1', myNumber = '', clientNumber = '', clientTitle = '',
        address = '', cost = '', lp = '1', title = ''
    } = data;

    return [
        type,
        myNumber,
        clientNumber,
        clientTitle,
        address,
        cost,
        lp,
        title,
        '',
        ''
    ].join('|');
};

class TransferFileGenerator extends Action {
    constructor() {
        super();
        this.id = '4120414';
    }


    getFileString() {
        return [this.id, ...this.data.map(element => convertObjectToArray(element))].join('\n');
    }

    render() {
        this.data = this.getRequestData();

        if (!Array.isArray(this.data) || this.data.length === 0) {
            return this.response.status(400).send();
        }

        fileStream.writeFile('./taxes.txt', this.getFileString(), err => {
            if (err) {
                this.response.status(500).send("Cannot create file");
            } else {
                this.response.status(200).send();
            }
        });
    }
}

export default TransferFileGenerator;
