import os from 'os';

const returnUrl = (req) => {
    const rutaServer = `${req.protocol}://${req.get('host')}`;
    const hostname = os.platform();
    let preRutaFiles, preRutaImages, preRutaAlbum, rutaServerCorregida;
    if (hostname === 'win32') {
        //rutaServerCorregida = rutaServer.replace(":3100", ":3000");
        preRutaFiles = rutaServerCorregida + '/files/';
        preRutaImages = rutaServerCorregida + '/images/';
        preRutaAlbum = rutaServerCorregida + '/images/albums/';
    } else {
        //rutaServerCorregida = rutaServer.replace(":3100", "");
        rutaServerCorregida ="https://trojanradio.link"
        preRutaFiles = rutaServerCorregida + '/files/';
        preRutaImages = rutaServerCorregida + '/images/';
        preRutaAlbum = rutaServerCorregida + '/images/albums/';
    };
    return { rutaFiles: preRutaFiles, rutaImages: preRutaImages, rutaAlbum: preRutaAlbum }
};

export default returnUrl;