module.exports = (router) => {
    const hub = require('../controller/hub.controller');

    router.get('/api/best', hub.getBestContent);

    router.get('/api/content/:categoryID', hub.getCategoryList);

    router.get('/api/content/info/:idx', hub.getContentInfo);

    router.get('/api/main', hub.getMainContent);

    router.get('/api/detail/:url', hub.getDetailPage);
}
