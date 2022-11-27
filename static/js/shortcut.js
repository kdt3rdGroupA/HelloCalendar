const noFavicon = tag => {
  let flexSpace = create('div');
  addClass(flexSpace, "flex_space");
  img.parentNode.prepend(flexSpace);
};

const addLink = (link, name, id) => {
  let linkDiv = create('div');
  addClass(linkDiv, "link");
  let linkBtn = create('div');
  addClass(linkBtn, 'shortcuts');
  
  let isNoFavicon = false;
  if (link.indexOf(".com")>0) {
    let faviconImg = create('img');
    faviconImg.setAttribute('onerror', 'style.display="none"');
    let faviconLink = link.slice(0, link.indexOf('.com')+4)+'/favicon.ico';
    faviconImg.src = faviconLink;
    linkBtn.append(faviconImg);
  } else {
    let linkMark = create('div');
    addClass(linkMark, "link_mark");
    linkMark.innerText = name.slice(0, 1).toUpperCase();
    linkBtn.append(linkMark);
  }
  let linkName = create('div');
  linkName.innerText = name;
  
  linkBtn.append(linkName);
  linkBtn.addEventListener('click', () => {
    window.open(link, '_blank');
  })
  linkDiv.append(linkBtn);
  selector("#shortcut").append(linkDiv);

  let linkList = selector("#forms .link_setting .links");
  // let linkItem = create('li');
  let linkDivClone = create('div');
  linkDivClone.innerHTML = linkDiv.innerHTML;
  let linkDeleteBtn = create('div');
  addClass(linkDeleteBtn, 'link_delete_btn');
  linkDeleteBtn.innerHTML = `<span class="material-symbols-outlined">cancel</span>`;

  let linkDBid = create('div');
  addClass(linkDBid, 'hide');
  addClass(linkDBid, 'link_db_id');
  linkDBid.innerText = id;

  selector(".shortcuts", linkDivClone).append(linkDBid);  
  selector(".shortcuts", linkDivClone).append(linkDeleteBtn);
  linkList.append(linkDivClone);

  linkDeleteBtn.addEventListener('click', () => {
    axios({
      method: 'POST',
      url: '/shortcut/remove',
      params: {
        linkKey: id
      }
    }).then(() => {
      // let deletedName = selector("div", this.parentNode).innerText;
      linkDeleteBtn.parentNode.remove();
      linkDiv.remove();
    });
  })
}

axios({
  method: 'POST',
  url: '/shortcut',
  params: null
})
.then(result => {
  if (result.data.data == null) {
    return 0;
  }
  let data = Array.from(result.data.data);
  
  data.forEach(element => {
    addLink(element.link, element.name, element.id);
  });
})
// 유저 링크정보 가져오기

selector("#shortcut .add_btn").addEventListener('click', () => {
  removeClass(selector("#forms .link_add"), 'hide'); 
  
});
// 링크 추가 폼 on/off
selector("#forms .link_add .close").addEventListener('click', () => {
  addClass(selector("#forms .link_add"), 'hide'); 
});
// 링크 DB에 저장
selector("#forms .link_add .submit").addEventListener('click', () => {
  if (!selector('#forms .link_add .linkName').value.length || !selector('#forms .link_add .linkUrl').value.length) {
    return 0;
  }
  if (selector('h3.headerLogo').innerText == 'HELLO CALENDAR') {
    return 0;
  }
  axios({
    method: 'POST',
    url: '/shortcut/add',
    params: {
      name: selector('#forms .link_add .linkName').value,
      link: selector('#forms .link_add .linkUrl').value
    }
  }).then(result => {
    location.replace(`${URL}:${PORT}`);
  });
});
// 링크 삭제 폼 팝업
selector("#shortcut .setting_btn").addEventListener('click', () => {
  removeClass(selector("#forms .link_setting"), 'hide');
});
// 링크 삭제 폼 on/off
selector("#forms .link_setting .close").addEventListener('click', () => {
  addClass(selector("#forms .link_setting"), 'hide');
});