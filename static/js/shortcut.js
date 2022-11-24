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
addLink("https://news.naver.com/", "NAVER");