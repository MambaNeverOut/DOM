// window.dom = {
//   create(tagName) {
//     return document.createElement(tagName)
//   }
// }
window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); // 去掉空格
    return container.content.firstChild; // 获取template的子节点
  },
  after(node, node2) {
    // insertBefore:在参考节点之前插入一个拥有指定父节点的子节点
    return parentNode.insertBefore(node2, node.nextSibling);
    // 下一个节点为空，依然可以插入
  },
  before(node, node2) {
    return parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    node.before(node, parent); // 把包裹节点插入被包裹节点前面
    node.append(parent, node); // 把被包裹节点放到包裹节点中
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  // childNodes.length修改会被实时监听，所以无法使用此方法
  // empty(node) {
  //   const {
  //     childNodes
  //   } = node
  //   let array = []
  //   for (let i = 0; i < childNodes.length; i++) {
  //     dom.remove(childNodes[i])
  //     array.push(childNodes[i])
  //   }
  //   return array
  // },
  empty(node) {
    //const childNodes = node.childNodes
    const {
      childNodes
    } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    // 重载
    // name的形式为字符串，因为setAttribute要求name的形式为字符串
    if (arguments.length === 3) {
      node.setAttribute(name, value); // 写属性
    } else if (arguments.length === 2) {
      return node.getAttribute(name); // 读属性
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {})
        for (let key in object) node.style[key] = object[key];
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) { // 选择器， 范围
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
};