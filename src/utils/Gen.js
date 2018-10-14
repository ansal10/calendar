
class Gen {

  static getValueFromChainedKey = (data, ...keys) => {
    let d = data;
    try {
      for (const key of keys){
        d = d[key];
      }
      return d;
    }catch (e) {
      return null;
    }
  }
}

export {
  Gen
}