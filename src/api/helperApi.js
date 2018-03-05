class HelperApi {

    static generateNewId(items) {
        return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
      }
}

export default HelperApi;