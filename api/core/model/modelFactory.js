import models from '../../app/model';

function modelFactory(name) {
    if(name && models.hasOwnProperty(name)) {
        return new models[name](models);
    }
}

export default modelFactory;
