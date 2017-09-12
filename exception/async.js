const fetch = require('./fetch');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url, () => {
      resolve({
        msg: 'success'
      });
    })
  });
}

async function getDemoData(url) {
  let data = null;
  try {
    data = await fetchData(url);

  } catch (e) {
    console.log(e.message);
  }
  return data;
}

console.log('don not specify url....');
getDemoData();

console.log('specify url....');
getDemoData('test').then(data => console.log(data));
