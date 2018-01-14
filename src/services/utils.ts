export default class Utils {

    public static queryParamsObj(o): string {
    return '?' +
        Object.keys(o).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(o[key]);
        }).join('&');
      }

}
