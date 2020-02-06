import ExtendedRouter from "../../../core/framework/extended-router";

import TemplateDataAction from './template-data';
import PrepareTransferStringAction from './transfer-file-generator';

const routerObject = new ExtendedRouter();

routerObject.getAction('', TemplateDataAction);
routerObject.postAction('', PrepareTransferStringAction);

export default routerObject.toFunction();
