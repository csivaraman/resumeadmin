class HelperApi {

    static generateNewId(items) {        
        let length = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;        
        return length;
      }
}

export default HelperApi;