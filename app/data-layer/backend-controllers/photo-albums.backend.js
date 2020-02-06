import CRUDBackend from '../helpers/CRUDBackend';

class PhotoAlbumBackendController extends CRUDBackend {
    constructor() {
        super('photo-albums');
    }
}

const PhotoAlbumBackend = new PhotoAlbumBackendController();

export default PhotoAlbumBackend;
