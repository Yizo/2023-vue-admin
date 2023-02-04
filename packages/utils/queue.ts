class Queue<T = any> {
  private readonly items: T[] = []
  constructor() {
    this.items = []
  }

  /**
   * 向队列尾部添加一个新的项
   * @param {any} element 任意类型
   */
  enqueue(element: T) {
    this.items.push(element)
  }

  /**
   * 移除队列的第一项，并返回被移除的项
   * @return {any} 被移除的项
   */
  dequeue(): T | undefined {
    return this.items.shift()
  }

  /**
   * 查看队列第一项
   * @return {any}
   */
  front(): T | undefined {
    return this.items[0]
  }

  /**
   * 如果队列中不包含任何元素返回true, 否则返回false
   * @return {Boolean}
   */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * 获取队列中元素个数
   * @return {Number}
   */
  size(): number {
    return this.items.length
  }

  /**
   * 将队列中的内容，转为字符串形式
   * @return {String}
   */
  toString(): string {
    return this.items.reduce((prev, current) => {
      return prev += current + ''
    }, '')
  }
}

export  {
  Queue
}