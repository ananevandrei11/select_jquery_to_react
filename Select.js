import React from 'react';

class Select extends React.Component {
  componentDidMount() {
    let select = document.querySelector('select[data-menu]');
    let options = select.options;

    let parent = select.parentNode;
    let menu = document.createElement('div');
    menu.classList.add('select-menu');
    parent.append(menu);
    menu.append(select);
    let sizeMove = select.selectedIndex*-41;
    menu.style.cssText =`--t: ${sizeMove}px;`;

    let button = document.createElement('div');
    button.classList.add('button');
    select.after(button);

    let arrow = document.createElement('em');
    button.append(arrow);

    let list = document.createElement('ul');
    button.append(list);
    for (let item of options) {
      let li = document.createElement('li');
      list.append(li);
      li.innerText = item.innerText;
    }

    let listClone = document.createElement('ul');
    menu.append(listClone);
    for (let item of options) {
      let li = document.createElement('li');
      listClone.append(li);
      li.innerText = item.innerText;
    }

      function menuClick() {
        if (!menu.classList.contains('open')) {
          menu.classList.add('open');
        }
      }

      menu.onclick = () => {
        menuClick();
      }

      function selectClick(e) {
        let target = e.target;
        let menu = target.parentNode.parentNode;
        menu.classList.add('tilt-up', 'tilt-down');
        let select = menu.querySelector('select');
        let selectVal = select.querySelector('option[value="DEFAULT"]');
        let selectElem = select.querySelectorAll('option');
        selectVal.removeAttribute('value');
        selectVal.removeAttribute('selected');
        let menuMove;
        let arrLi = target.parentNode.childNodes;


        for (let i=0; i < arrLi.length; i++) {
          if(arrLi[i].innerText === target.innerText) {
            selectElem[i].setAttribute('value', 'DEFAULT');
            selectElem[i].setAttribute('selected','selected');
            menuMove = i * -41;
          }
        }
        menu.style.cssText =`--t: ${menuMove}px;`;
        
        setTimeout(() => {
        menu.classList.remove('open','tilt-up', 'tilt-down');
        }, 500);
      }

      listClone.onclick = (e) => {
        selectClick(e);
      }
  }

  render() {
    return (
      <div>
        <select data-menu defaultValue={'DEFAULT'}>
          <option>Easy</option>
          <option value='DEFAULT'>Normal</option>
          <option>Hard</option>
          <option>Expert</option>
        </select>
      </div>
    )
  }
}

export default Select;