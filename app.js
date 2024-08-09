const url =
  "https://script.google.com/macros/s/AKfycbw_Y7YVjyNYliz7P99pr-6rfX2KdlYET3w3eXwb9aj5k3vJLG4EaV_DQO1XSGZMxLFP/exec";
const output = document.querySelector(".outputjadwal");
const outputnull = document.querySelector(".outputjadwalnull");
const outkegiatan = document.querySelector(".outputkegiatan");
const outkegiatannull = document.querySelector(".outputkegiatannull");

getData();

function countDown(g, w) {
  var date = new Date(g);
  var jam = new String(w);
  var tgl = parseInt(String(date.getDate()).padStart(2, "0"));
  var bln = parseInt(String(date.getMonth() + 1).padStart(2, "0"));
  var thn = date.getFullYear();
  simplyCountdown(".simply-countdown", {
    year: thn, // required
    month: bln, // required
    day: tgl, // required
    hours: parseInt(jam.substring(0, 2)), // Default is 0 [0-23] integer
    words: {
      //words displayed into the countdown
      days: { singular: "hari", plural: "hari" },
      hours: { singular: "jam", plural: "jam" },
      minutes: { singular: "menit", plural: "menit" },
      seconds: { singular: "detik", plural: "detik" },
    },
  });
}

function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      var itemsProcessed = 0;
      json.data.forEach((ele) => {
        // console.log(ele);
        let elihgt;
        if (ele.light) {
          elihgt = "menyala";
        } else {
          elihgt = "";
        }
        const event = new Date(ele.tanggal);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        //   console.log(event.toLocaleDateString());
        const div = document.createElement("div");
        const span = document.createElement("span");

        if (ele.view === true) {
          div.setAttribute("class", "col-md-5 col-10");
          div.innerHTML = `
            <div class="card text-center mb-5 ${elihgt}">
               <div class="card-header">
                  ${ele.tutor} <br />
                  <span>${ele.kettutor}<br />${ele.alamattutor}</span>
               </div>
               <div class="card-body">
                  <div class="row justify-content-center">
                     <div class="col-md-4">
                        <i class="bi bi-clock d-block"></i>
                        <span>${ele.waktu}</span>
                     </div>
                     <div class="col-md-8">
                        <i class="bi bi-calendar3 d-block"></i>
                        <span>${event.toLocaleDateString(
            "id-ID",
            options
          )}</span>
                     </div>
                  </div>
               </div>
               <div class="card-footer">
                  ${ele.materi} <br />
                  ${ele.halaman}
               </div>
            </div>   
            `;
          output.append(div);

          if (ele.light === true) {
            span.innerHTML = `${ele.kegiatan}`;
            outkegiatan.append(span);
            countDown(ele.tanggal, ele.waktu);
            showKegiatan(ele.kegiatan);
          }
          itemsProcessed++;
        }
      });
      // console.log(itemsProcessed);
      if (itemsProcessed === 0) {
        const divnull = document.createElement("div");
        const spannull = document.createElement("span");
        divnull.setAttribute("class", "col-md-10 col-10 text-center");
        divnull.innerHTML = `
            <div class="card">
               <p></p>
               <p>Mohon maaf jadwal belum kami tentukan. Pertemuan Manasik akan kami sampaikan melalui surat undangan atau media digital lainnya.</p>
            </div>
         `;
        outputnull.append(divnull);
        spannull.innerHTML = `Kegiatan berikutnya`;
        outkegiatannull.append(spannull);
      }
    });
}

const x = document.getElementById("lok");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.setAttribute("value", "Lokasi tidak aktif");
  }
}
function showPosition(position) {
  const autopress = document.getElementById("find");
  x.setAttribute(
    "value",
    position.coords.latitude + " , " + position.coords.longitude
  );
}

const keg = document.getElementById("keg");

function showKegiatan(kegiatan) {
  var kegi = new String(kegiatan);
  keg.setAttribute("value", kegi);
}