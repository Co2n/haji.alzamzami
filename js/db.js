const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("edit");

function filterGlobal(table) {
   let filter = document.querySelector('#global_filter');
   let regex = document.querySelector('#global_regex');
   let smart = document.querySelector('#global_smart');

   // table.search(filter.value, regex.checked, smart.checked).draw();
   table.search(filter.value, false, true).draw();
}

function filterColumn(table, i) {
   let filter = document.querySelector('#col' + i + '_filter');
   let regex = document.querySelector('#col' + i + '_regex');
   let smart = document.querySelector('#col' + i + '_smart');

   // table.column(i).search(filter.value, regex.checked, smart.checked).draw();
   table.column(i).search(filter.value, false, true).draw();
}
const table = new DataTable('#tabelJemaah', {
   columnDefs: [
      { visible: false, targets: 0 }, //TAHUN
      { visible: false, targets: 1 }, //URUT
      { visible: false, targets: 2 }, //REG
      { visible: false, targets: 3 }, //PORSI
      { visible: false, targets: 5 }, //NAMA
      { visible: false, targets: 6 }, //AYAH
      { visible: false, targets: 8 }, //GENDER
      { visible: false, targets: 9 }, //TMP_LHR
      { visible: false, targets: 10 }, //TGL_LHR
      { visible: false, targets: 11 }, //USIA
      { visible: false, targets: 12 }, //ALAMAT
      { visible: false, targets: 13 }, //DESA
      { visible: false, targets: 14 }, //KECAMATAN
   ],
   ajax: {
      // url: '/db.json',
      url: 'https://script.googleusercontent.com/macros/echo?user_content_key=Js6OQ_AthyRUA4zcEdf89qXtmvjJzMRiTZmBqD_utDcB1wlOMYN6-yapb8CCmX1wHD5jVuXhCBm--kSSJCgLSM4lCldoCWFNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEzW-dkDqdEvaQ1lNuUzuzNowO7EWtD6rfnr3Fqr6oHmd_TcqYTXVUnUvA-igSaYZa-_9F8yZPInxNGlfhHkr7vE_b6mrjC-7Q&lib=MsRZdlVh3LW7J7letq8msJBG7v3fLeO7-',
      dataSrc: 'data'
   },
   columns: [
      { data: "tahun" }, //0
      { data: "urut" }, //1
      { data: "reg" }, //2
      { data: "porsi" }, //3
      { data: "panggil" }, //4
      { data: "nama" }, //5
      { data: "ayah" }, //6
      { data: "nama lengkap" }, //7
      { data: "gender" }, //8
      { data: "tmp_lhr" }, //9
      { data: "tgl_lhr" }, //10
      { data: "usia" }, //11
      { data: "alamat" }, //12
      { data: "desa" }, //13
      { data: "kecamatan" }, //14
      { data: "desa - kec" } //15
   ],
   rowGroup: {
      dataSrc: 'tahun'
   },

   order: [[0, 'asc']],
   // rowGroup: {
   //    dataSrc: (row) => {
   //       let base = Math.floor(row[3] / 10);

   //       return base + '0 - ' + base + '9';
   //    }
   // },
   Filter: true,
   // stateSave: true,
   info: true,
   ordering: true,
   // select: false,
   paging: true,
   pageLength: 10,
   layout: {
      topStart: {
      },
      topEnd: {
         buttons: [
            {
               extend: 'print',
               text: 'Print Dokumen',
               title: 'Data Calon Jemaah Haji Kab. Kuningan',
               about: "tes",
               exportOptions: {
                  columns: ':visible'
               }
            },
            {
               extend: 'pdfHtml5',
               text: 'PDF',
               title: 'Data Calon Jemaah Haji Kab. Kuningan',
               exportOptions: {
                  columns: ':visible'
               }
            },
            {
               extend: 'excelHtml5',
               text: 'Excel',
               title: 'Data Calon Jemaah Haji Kab. Kuningan',
               exportOptions: {
                  columns: ':visible'
               }
            },
            {
               extend: 'copyHtml5',
               text: 'Copy',
               title: 'Data Calon Jemaah Haji Kab. Kuningan',
               exportOptions: {
                  columns: ':visible'
               }
            },
         ]
      },
      bottomEnd: {
         paging: {
            firstLast: true
         }
      }
   },
   // layout: {
   //    topStart: {
   //       searchBuilder: {
   //          tes
   //       }
   //    }
   // }
   // order: [[0, 'asc']],
   // order: [[0, 'desc']],
   // columnDefs: [
   //    {
   //       targets: 7,
   //       render: DataTable.render.date()
   //    }
   // ]
});
table.on('mouseenter', 'td', function () {
   let colIdx = table.cell(this).index().column;

   table
      .cells()
      .nodes()
      .each((el) => el.classList.remove('highlight'));

   table
      .column(colIdx)
      .nodes()
      .each((el) => el.classList.add('highlight'));
});

document.querySelectorAll('a.toggle-vis').forEach((el) => {
   if(nama==="true"){
   el.addEventListener('click', function (e) {
      let isExpanded = this.getAttribute('aria-pressed');
      console.log(isExpanded)
      if (isExpanded === 'false') {
         this.setAttribute('class', 'toggle-vis nav-link active');
         this.setAttribute('aria-pressed', 'true');
      }
      if (isExpanded === 'true') {
         this.setAttribute('class', 'toggle-vis nav-link');
         this.setAttribute('aria-pressed', 'false');
      }

      e.preventDefault();

      let columnIdx = e.target.getAttribute('data-column');
      let column = table.column(columnIdx);

      // Toggle the visibility
      column.visible(!column.visible());
   });
}
});

document.querySelectorAll('input.global_filter').forEach((el) => {
   el.addEventListener(el.type === 'text' ? 'keyup' : 'change', () =>
      filterGlobal(table)
   );
});

document.querySelectorAll('input.column_filter').forEach((el) => {
   let tr = el.closest('tr');
   let columnIndex = tr.getAttribute('data-column');

   el.addEventListener(el.type === 'text' ? 'keyup' : 'change', () =>
      filterColumn(table, columnIndex)
   );
});