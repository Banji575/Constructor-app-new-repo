export const getUrlParams = (urlSearch = window.location.search) => {
    if (!urlSearch) return;
    let a = urlSearch.split('').filter(el => el != '?').join('');
    let b = null;
    let c = null
    let r = {}
    if(a.length) {
        b = a.split('&').map(el => el.split('='))
        b.map(el => r[el[0]] = el[1] || 0)
    }
    return r;
}