export default class Utills {
  /**
   * 检查该Item 有没有被收藏过
   * @param {*} item
   * @param {*} items
   */
  static checkFavorite (item, items) {
    for (var i = 0, len = items.length; i < len; i++) {
      let id = item.id ? item.id.toString() : item.fullName
      if (id === items[i]) {
        return true
      }
    }
    return false
  }
}
