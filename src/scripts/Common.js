export const getUrlParams = (urlSearch = window.location.search) => {
    if (!urlSearch) return;
    let a = urlSearch.split('').filter(el => el != '?').join('');
    let b = null;
    let r = {}
    if (a.length) {
        b = a.split('&').map(el => el.split('='))
        b.map(el => r[el[0]] = el[1] || 0)
    }
    return r;
}

export const updateUrl = (params = '') => {
    let currentUrl = window.location.origin + window.location.pathname
    if (window.history.pushState) {
        window.history.pushState(null, null, currentUrl + params)
    } else {
        window.location.href = currentUrl + params;
        console.warn('History API не поддерживается');
    }
    return;
}