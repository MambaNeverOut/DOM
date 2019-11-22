window.dom = {
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (name instanceof Object) {
        for (key in name) {
          node.style[key] = name[key]
        }
      } else if (typeof name === 'string') {
        return node.style[name]
      }
    }
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  }
}

const div = dom.find('#test>.red')[0] // 获取对应的元素
dom.style(div, 'color', 'red') // 设置 div.style.color

const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)) // 遍历 divList 里的所有元素





// // console.log('dom');
// const div = dom.create('<div id="1"><span>1</span></div>')
// console.log(div);
// const tr = dom.create('<tr><td>1</td></tr>')
// const p = dom.create('<p>2</p>')
// // console.log(tr);
// const add = dom.append(div, tr)
// dom.append(div, p)
// // console.log(add);
// const em = dom.empty(tr)
// // console.log(em);
// dom.attr(div, 'id', 3)
// const at = dom.attr(div, 'id')
// // console.log(at);
// dom.style(div, {
//   border: '1px solid green',
//   backgroundColor: 'black',
// })
// dom.style(div, 'color', 'blue')
// const a = dom.style(div, 'color')
// console.log(a);

// dom.class.add(div, 'red')
// dom.class.add(div, 'bb')
// dom.class.remove(div, 'bb')
// console.log(dom.class.has(div, 'red'))

// const fn = () => {
//   console.log('点击了');
// }
// dom.on(test, 'click', fn)
// dom.off(test, 'click', fn)

// const testDiv = dom.find('span', div)[0]
// console.log(testDiv);

// console.log(dom.siblings(dom.find('span', div)[0]));

// console.log(dom.next(testDiv));

// console.log(dom.index(testDiv))