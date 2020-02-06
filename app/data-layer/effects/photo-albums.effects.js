import CRUDEffects from '../helpers/CRUDEffects';
import PhotoAlbumAction from '../actions/photo-albums.actions';
import PhotoAlbumBackend from '../backend-controllers/photo-albums.backend';

export default CRUDEffects(PhotoAlbumBackend, PhotoAlbumAction);
