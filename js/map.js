const url = 'https://script.google.com/macros/s/AKfycbyFca469t2xJ3KBTo6mIxAlO87wd3rIaQNflEdNR9Evj2wNman4VyaZXw9l5T7nuVhf/exec';
const myMusim = document.querySelector('#hijriyah');
const myAbsen = document.querySelector('#absen');
const btn = document.querySelector('#cek');
const btnPrint = document.querySelector('#print');
const results = document.querySelector('.results');

btnPrint.addEventListener('click', function (event) {
  printMap();
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
const loader = document.querySelector("#loading");
const content = document.querySelector("#textOutput");

// showing loading
function displayLoading() {
  loader.classList.add("display");
  content.classList.remove("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
    content.classList.add("display");
  }, 5000);
}

// hiding loading 
function hideLoading() {
  loader.classList.remove("display");
  content.classList.add("display");
}

function outputer(vals) {
  const textOutput = document.querySelector('#textOutput');

  const perdimImigrasi = vals[41].search("Perdim") > -1 ? 'checked' : '';
  const rekomKemenag = vals[41].search("Rekom") > -1 ? 'checked' : '';
  const pasporLama = vals[41].search("Lama") > -1 ? 'checked' : '';
  const buktiBpihPelunasan = vals[41].search("Bukti") > -1 ? 'checked' : '';
  const sphPelimpahanPorsi = vals[41].search("SPH ") > -1 ? 'checked' : '';
  const eKTP = vals[41].search("KTP") > -1 ? 'checked' : '';
  const kk = vals[41].search("Kartu") > -1 ? 'checked' : '';
  const aktaKelahiran = vals[41].search("Kelahiran") > -1 ? 'checked' : '';
  const ijazah = vals[41].search("Ijazah") > -1 ? 'checked' : '';
  const bukuNikah = vals[41].search("Nikah") > -1 ? 'checked' : '';
  const suketKakek = vals[41].search("Kakek") > -1 ? 'checked' : '';
  const suketSingkatan = vals[41].search("Singkatan") > -1 ? 'checked' : '';
  const suketKehilangan = vals[41].search("Kehilangan") > -1 ? 'checked' : '';

  const bap = vals[40];
  const perpanjangan = vals[39];

  if (vals[1] > 1000691172) {
    textOutput.innerHTML =
      `<div class="content">
        <div class="container text-center">
         <div class="alert alert-danger" role="alert">
            Dokumen atas nama <strong>` + vals[9] + ` ` + vals[13] + `</strong><br>Berkas pasporan belum siap! Surat Kehilangan dari Kepolisian?
         </div>
        </div>
      </div>`;
  } else if (bap == true && suketKehilangan == '') {
    textOutput.innerHTML =
      `<div class="content">
        <div class="container text-center">
         <div class="alert alert-danger" role="alert">
            Dokumen atas nama <strong>` + vals[9] + ` ` + vals[13] + `</strong><br>Berkas pasporan belum siap! Surat Kehilangan dari Kepolisian?
         </div>
        </div>
      </div>`;
  } else if (perpanjangan == 'Perpanjangan' && pasporLama == '') {
    textOutput.innerHTML =
      `<div class="content">
      <div class="container text-center">
         <div class="alert alert-danger" role="alert">
            Dokumen atas nama <strong>` + vals[9] + ` ` + vals[13] + `</strong><br>Berkas pasporan belum siap! Paspor Lama?
         </div>
        </div>
      </div>`;
  } else if (buktiBpihPelunasan == '' && sphPelimpahanPorsi == '') {
    textOutput.innerHTML =
      `<div class="content">
      <div class="container text-center">
         <div class="alert alert-danger" role="alert">
            Dokumen atas nama <strong>` + vals[9] + ` ` + vals[13] + `</strong><br>Berkas pasporan belum siap! Bukti Setoran BPIH / Pelunasan / SPH Pelimpahan ???
         </div>
        </div>
      </div>`;
  } else if (aktaKelahiran == '' && ijazah == '' && bukuNikah == '') {
    textOutput.innerHTML =
      `<div class="content">
      <div class="container text-center">
         <div class="alert alert-danger" role="alert">
            Dokumen atas nama <strong>` + vals[9] + ` ` + vals[13] + `</strong><br>Berkas pasporan belum siap! Akta Lahir / Ijazah / Buku Nikah ???
         </div>
        </div>
      </div>`;
  } else {
    textOutput.innerHTML =
      `<div class="content">
    <div class="container text-center">
      <p>No. Absen: ` + vals[5] + ` <br>Calon Jemaah Haji dengan nomor porsi ` + vals[1] + `<br>atas nama:</p>
      <h2>` + vals[9] + ` ` + vals[13] + `</h2>
      <h4>` + vals[24] + `</h4>
    </div>
    <div class="container dokumen">
      <h5 style="margin-top: 30px;">Berkas Dokumen</h5>
      <hr>

      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-1"><span>Asli</span></div>
            <div class="col-1"><span>Copy</span></div>
            <div class="col" style="margin-left: 15px;"></div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${perdimImigrasi}></div>
            <div class="col" style="margin-left: 15px;">Perdim Imigrasi</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${rekomKemenag}></div>
            <div class="col" style="margin-left: 15px;">Rekom Kemenag</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${pasporLama}></div>
            <div class="col" style="margin-left: 15px;">Paspor Lama</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${buktiBpihPelunasan}></div>
            <div class="col" style="margin-left: 15px;">Bukti Storan Awal BPIH/Pelunasan</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${sphPelimpahanPorsi}></div>
            <div class="col" style="margin-left: 15px;">SPH Pelimpahan Porsi</div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-1"><span>Asli</span></div>
            <div class="col-1"><span>Copy</span></div>
            <div class="col" style="margin-left: 15px;"></div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${eKTP}></div>
            <div class="col" style="margin-left: 15px;">E-KTP</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${kk}></div>
            <div class="col" style="margin-left: 15px;">Kartu Keluarga (KK)</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${aktaKelahiran}></div>
            <div class="col" style="margin-left: 15px;">Akta Kelahiran</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${ijazah}></div>
            <div class="col" style="margin-left: 15px;">Ijazah</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox"></div>
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${bukuNikah}></div>
            <div class="col" style="margin-left: 15px;">Buku Nikah</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container dokumen">
      <h5>Pelengkap</h5>
      <hr>

      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-1"><span>Asli</span></div>
            <div class="col" style="margin-left: 15px;"></div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${suketKakek}></div>
            <div class="col" style="margin-left: 15px;">Surat Keterangan Kakek</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${suketSingkatan}></div>
            <div class="col" style="margin-left: 15px;">Surat Ket. Singkatan Nama</div>
          </div>
          <div class="row">
            <div class="col-1"><input type="checkbox" class="largerCheckbox" ${suketKehilangan}></div>
            <div class="col" style="margin-left: 15px;">Surat Kehilangan Paspor (Kepolisian)</div>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    </div>
    <div class="container dokumen">
      <h5>Checkers <span>(Petugas Validasi)</span></h5>
      <hr>

      <div class="row">
        <div class="col-4">
          <div class="checker">
            <span>paraf</span>
            <br>
            <br>
            <br>
            <span>Nama: </span>
          </div>
        </div>
        <div class="col-4">
          <div class="checker">
            <span>paraf</span>
            <br>
            <br>
            <br>
            <span>Nama: </span>
          </div>
        </div>
        <div class="col-4">
          <div class="checker">
            <span>paraf</span>
            <br>
            <br>
            <br>
            <span>Nama: </span>
          </div>
        </div>
      </div>
    </div>
  </div>`
  };
  hideLoading();
}

function printMap() {
  window.print();
}