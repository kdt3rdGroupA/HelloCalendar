function shortcuts(){
  console.log('click favicon');

  
}

const addLink = (link, name) => {
  let linkDiv = create('div');
  addClass(linkDiv, "link");
  let linkBtn = create('div');
  addClass(linkBtn, 'shortcuts');
  
  if (link.indexOf(".com")>0) {
    let faviconImg = create('img');
    faviconImg.setAttribute('onerror', 'style.display="none"');
    let faviconLink = link.slice(0, link.indexOf('.com')+4)+'/favicon.ico';
    faviconImg.src = faviconLink;
    linkBtn.append(faviconImg);
  } 
  let linkName = create('div');
  linkName.innerText = name;
  
  linkBtn.append(linkName);
  linkBtn.addEventListener('click', () => {
    window.open(link, '_blank');
  })
  linkDiv.append(linkBtn);
  selector("#shortcut").append(linkDiv);
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
    addLink(element.link, element.name);
  });
})
// 유저 링크정보 가져오기

selector("#shortcut .add_btn").addEventListener('click', () => {
  removeClass(selector("#forms .link_add"), 'hide'); 
  
});
// 링크 추가 폼 팝업
selector("#forms .link_add .close").addEventListener('click', () => {
  addClass(selector("#forms .link_add"), 'hide'); 
});
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
