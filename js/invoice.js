// const moment = require("./moment.min.js");
// import { moment } from './moment.min.js';

const url = 'https://script.google.com/macros/s/AKfycbxIlmmR9xQze6T2c7B6ZBbNnV6uAZROAjltD8X3ogwI0n62MlPj0tG-qgTIrJNfGtvh/exec';
const myMusim = document.querySelector('#hijriyah');
const myAbsen = document.querySelector('#absen');
const btn = document.querySelector('#cek');
const btnPrint = document.querySelector('#print');

btnPrint.addEventListener('click', function (event) {
  printInvoice();
});

myMusim.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('cek').click();
  }
});

myAbsen.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('cek').click();
  }
});

btn.addEventListener('click', (e) => {
  const valMusim = myMusim.value;
  const valAbsen = myAbsen.value;
  const url1 = `${url}?absen=${valAbsen}&musim=${valMusim}`;
  if (valAbsen > 0 && valMusim > 0) {
    displayLoading();
    fetch(url1)
      .then(res => res.json())
      .then(data => {
        outputer(data);
      });
  }
});

// selecting loading div
const results = document.querySelector('.results');
const content = document.querySelector("#textOutput");

// showing loading
function displayLoading() {
  results.innerHTML = '<div id="loading"></div>';
  const loader = document.querySelector("#loading");
  loader.classList.add("display");
  content.classList.remove("display");
  // to stop loading after some time
  // setTimeout(() => {
  //   loader.classList.remove("display");
  //   content.classList.add("display");
  // }, 5000);
}

// hiding loading 
function hideLoading() {
  const loader = document.querySelector("#loading");
  loader.classList.remove("display");
  results.innerHTML = '';
  content.classList.add("display");
}

function outputer(vals) {
  // console.log(vals.data[0]);
  const tanggal = moment().format('DD-MM-YYYY');
  const musim = vals.data[0].hijri;
  const porsi = vals.data[0].porsi;
  const invoice = 'A' + vals.data[0].absen + porsi.toString().replace('100', 'Z');
  const namalengkap = vals.data[0].sapa + ' ' + vals.data[0].nama_lengkap;
  const alamat = vals.data[0].alamat;
  const desa_kec = vals.data[0].desa_kec;

  if (!vals.data[0]) {
    textOutput.innerHTML =
      `<div class="invoice-foot text-center">
      <p>Kabener atuh.. aing mah.. pusing bapa mah..</p>
    </div>`;
    // } else if (!vals.data[0].keuangan[0]){
    //   textOutput.innerHTML =
    //   `<div class="invoice-btns text-center">
    //     <p>Belum ada riwayat keuangan!<br>
    //     <input type="checkbox" id="tagihan">
    //     <label style="font-size: 0.9em; padding-left: 5px;">Buat tagihan!</label></p>
    //   </div>`;
    // }
  } else {
    textOutput.innerHTML =
      `<div class="invoice-head-middle">
      <div class="invoice-head-middle-left text-start">
        <p>
          <span class="text-bold">Tanggal</span>: ${tanggal}<br>
          <span class="text-bold">Musim Haji</span>: ${musim}
        </p>
      </div>
      <div></div>
      <div class="invoice-head-middle-right text-end">
        <p>
          <spanf class="text-bold">Invoice No: </span>${invoice}
        </p>
      </div>
    </div>
    <div class="hr"></div>
    <div class="invoice-head-bottom">
      <div class="invoice-head-bottom-left">
        <ul>
          <li class='text-bold'>Kepada Yth;</li>
          <li>${namalengkap}</li>
          <li>${alamat}</li>
          <li>${desa_kec}</li>
        </ul>
      </div>
      <div class="text-center">
        <!-- <ul>
            <li><img src="img/waqr.svg"></li>
            <li>0813-6996-84997</li>
          </ul> -->
      </div>
      <div class="invoice-head-bottom-right">
        <ul class="text-end">
          <li class='text-bold'>Pembayaran ke;</li>
          <li>Kantor / Bendahara</li>
          <li>a.n. Muna Faridah</li>
          <li>Wa : 085798501702</li>
          <li>No.Rek., Mandiri 1340024423757</li>
        </ul>
      </div>
    </div>
    <div class="overflow-view">
      <div class="invoice-body">
        <table id="tableKeuangan">
          <thead>
            <tr>
              <td style="width: 70%;" class="text-bold" colspan="2">BIAYA</td>
              <td class="text-bold text-end">NILAI</td>
              <td class="text-bold text-end">MASUK</td>
              <td class="text-bold text-end">SISA</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div class="invoice-body-bottom">
          <div class="invoice-body-info-item border-bottom">
            <div class="info-item-td text-end text-bold">Jumlah :</div>
            <div class="info-item-td text-end">1.500.000</div>
          </div>
        </div>
      </div>
    </div>`;
  }
  buatTagihan(vals.data[0].ref, vals.data[0].keuangan);
  hideLoading();
}

function buatTagihan(ref, keuangan) {
  // console.log(ref);
  // console.log(keuangan);
  // const uniqueBiaya = [new Set(keuangan.map(item => item.biaya))];
  // console.log(uniqueBiaya)

  // Object.entries(keuangan).forEach(([key, value]) => {}
  var tableBody = document.getElementById('tableKeuangan').getElementsByTagName('tbody')[0];

  ref.forEach(function (item) {
    if (item) {
      var newRow = tableBody.insertRow();
      newRow.setAttribute('class', item.penerimaan.toLowerCase())
      
      var newKategori = newRow.insertCell(0);
      newKategori.setAttribute('class', 'text-bold');
      newKategori.setAttribute('colspan', '2');
      
      var newCheckBox = document.createElement('input');
      newCheckBox.setAttribute('type', 'checkbox');
      newCheckBox.setAttribute('class', 'hilang');
      newCheckBox.setAttribute('onclick', `setValueNol('` + item.penerimaan.toLowerCase() + `')`);
      newCheckBox.setAttribute('id', item.penerimaan.toLowerCase());
      newCheckBox.checked = 'checked';
      
      newKategori.appendChild(newCheckBox);
      newKategori.appendChild(document.createTextNode(' ' + toTitleCase(item.penerimaan)));
      
      var newNilai = newRow.insertCell(1);
      newNilai.setAttribute('class', 'text-end');
      newNilai.textContent = item.nilai.toLocaleString('de-DE');
      
      var newMasuk = newRow.insertCell(2);
      newMasuk.setAttribute('class', 'text-end');
      newMasuk.textContent = 0;
      
      var newBalance = newRow.insertCell(3);
      newBalance.setAttribute('class', 'text-end');
      newBalance.textContent = (item.nilai - 0).toLocaleString('de-DE');

      let hitung = 0;
      Object.entries(keuangan).forEach(([key, val]) => {
        
        if (val.biaya == item.penerimaan) {
          hitung += 1;
          var newRowSub = tableBody.insertRow();
          newRowSub.setAttribute('class', 'sub-' + item.penerimaan.toLowerCase())
          
          var newTab = newRowSub.insertCell(0);
          newTab.setAttribute('class', 'text-end')
          newTab.setAttribute('style', 'width: 5%;')
          newTab.textContent = hitung + '.';
          
          var newDate = newRowSub.insertCell(1);
          newDate.setAttribute('style', 'width: 65%')
          newDate.textContent = moment(val.date).format('DD-MM-YYYY');

          var nilaiNull = newRowSub.insertCell(2);
          nilaiNull.textContent = '';

          var masuk = newRowSub.insertCell(3);
          masuk.setAttribute('class', 'text-end')
          masuk.textContent = (val.nilai).toLocaleString('de-DE');

          var sisa = newRowSub.insertCell(4);
          sisa.textContent = '';

        }
      });
      // for (var i = 0; i < 4; i++) {
      //   var newCell = newRow.insertCell();
      //   newCell.innerHTML = 'Kolom ' + (i + 1);
      // }
    }
  });

}

function setValueNol(att) {
  var setTr = document.getElementById('tableKeuangan').getElementsByTagName('tbody')[0].getElementsByClassName(att)[0];
  var setTrSub = document.getElementById('tableKeuangan').getElementsByTagName('tbody')[0].getElementsByClassName('sub-' + att)[0];
  var setCekBok = document.getElementById(att);
  if (setCekBok.checked == false) {
    setTr.setAttribute('id', 'hilang');
    setTrSub.setAttribute('id', 'hilang');
    // setCekBok.checked = false;
  }
  if (setCekBok.checked == true) {
    console.log('true ' + att)
    setTr.removeAttribute('id', 'hilang');
    setTrSub.removeAttribute('id', 'hilang');
    // setCekBok.checked = true;
  }
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function printInvoice() {
  window.print();
}

function sumTable() {
  let table = document.getElementById("tableKeuangan");
  let rows = table.getElementsByTagName("tr");
  let totalN = 0;
  let totalM = 0;
  let totalSisa = 0;

  for (let i = 1; i < rows.length - 1; i++) { // Skip header and footer rows
      let cells = rows[i].getElementsByTagName("td");
      if (cells.length > 0) {
          let nilaiN = parseFloat(cells[2].innerText) || 0;
          let nilaiM = parseFloat(cells[3].innerText) || 0;
          let nilaiSisa = parseFloat(cells[4].innerText) || 0;

          totalN += nilaiN;
          totalM += nilaiM;
          totalSisa += nilaiSisa;
      }
  }

  // Update the sum(sisa) cell
  let sumSisaCell = rows[rows.length - 1].getElementsByTagName("td")[4];
  sumSisaCell.innerText = totalSisa;
  
  console.log("Total N: " + totalN);
  console.log("Total M: " + totalM);
  console.log("Sum Sisa: " + totalSisa);
}

// Panggil fungsi ini setelah halaman selesai dimuat
window.onload = sumTable;