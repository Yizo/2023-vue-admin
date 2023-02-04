

class Stack<T = any> {
    private items: T[] = [];
    constructor() {
        this.items = []
    }

    /**
     * 将元素压栈
     * @param {any} element 任意类型
     */
    push(element: T) {
        this.items.push(element)
    }

    /**
     * 取出栈中顶部元素
     * @return {any} 返回栈中最顶部的元素
     */
    pop(): T | undefined {
        return this.items.pop()
    }

    /**
     * 查看栈顶元素
     * @return {any}
     */
    peek(): T {
        return this.items[this.size() - 1]
    }

    /**
     * 判断栈是否为空
     * @return {Boolean}
     */
    isEmpty(): boolean {
        return this.size() === 0
    }

    /**
     * 获取栈中元素个数
     * @return {Number}
     */
    size(): number {
        return this.items.length
    }

    /**
     * 以字符串形式返回栈中所有元素
     * @return {String}
     */
    toString(): string {
        return this.items.reduce((prev, current) => {
            return prev += current + ''
        }, '')
    }
    /**
     * 清空栈
     * */
    clear() {
        this.items = []
    }
}

export {
    Stack
}