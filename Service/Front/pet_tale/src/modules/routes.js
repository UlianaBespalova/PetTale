const routes = {
    default: '/',
    listPage: {
        mask: '/catalog',
        addParam: (paramName, paramValue) => {
            let url = new URL(window.location.href);
            url.searchParams.set(paramName, paramValue);
            return url.href;
        }
    },
    itemPage: {
        mask: '/catalog/:itemId',
        create: (itemId) => `/catalog/${itemId}`,
    },
    notFoundPage: {
        mask: '**',
    }
}

export default routes;
