const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("edit");

// DataTable.type('date', 'render', DataTable.render.date('YYYY'));
DataTable.type('num', 'render', DataTable.render.number());
var urlImage = 'https://drive.google.com/uc?export=view&id=1IqtdPL-PEJ1KJ25o6pAVuNqfZkQpJIxM';

DataTable.feature.register('judulDokumen', function (settings, opts) {
   let toolbar = document.createElement('div');
   toolbar.innerHTML = opts.text;

   return toolbar;
});

const table = new DataTable('#tabelJemaah', {
   columnDefs: [
      { targets: 0, className: 'dt-body-right',  searchable: false, orderable: false }, //NO
      { targets: 1, className: 'dt-body-right', render: DataTable.render.number('', ',') }, //PORSI
      { visible: false, targets: 2 }, //MUSIM
      { visible: false, targets: 3 }, //STATUS
      { visible: false, targets: 4 }, //SEBAGAI
      { targets: 5, className: 'dt-body-center absen' }, //ABSEN
      { visible: false, targets: 6 }, //PELUNASAN
      { visible: false, targets: 7, render: DataTable.render.number('', ',') }, //HIJRI
      { visible: false, targets: 8, render: DataTable.render.number('', ',') }, //SPPH
      { targets: 9 }, //SAPA
      { visible: false, targets: 10 }, //NAMA
      { visible: false, targets: 11 }, //AYAH
      { visible: false, targets: 12, className: 'dt-body-center g' }, //GENDER
      { targets: 13 }, //NAMA_LENGKAP
      { visible: false, targets: 14 }, //TMP_LHR
      { visible: false, targets: 15, render: DataTable.render.date('DD MMM YYYY') }, //TGL_LHR
      { visible: false, targets: 16, className: 'dt-body-center usia', createdCell: function (td, cellData, rowData, row, col) { if (cellData >= 85) { $(td).addClass('lansia'); } } }, //USIA
      { visible: false, targets: 17 }, //ALAMAT
      { visible: false, targets: 18 }, //DESA
      { visible: false, targets: 19 }, //KECAMATAN
      { visible: false, targets: 20 }, //KODE_POS
      { visible: false, targets: 21 }, //BANK
      { visible: false, targets: 22, render: DataTable.render.date('DD MMM YYYY') }, //TGL DAFTAR
      { visible: false, targets: 23 }, //REFF
      { targets: 24 }, //DESA_KEC
      { visible: false, targets: 25, className: 'dt-body-center img' }, //FOTO
      { visible: false, targets: 26, render: DataTable.render.text() }, //HP
      { visible: false, targets: 27, render: DataTable.render.text() }, //HP_KEL
      { visible: false, targets: 28, className: 'dt-body-center img' }, //KTP
      { visible: false, targets: 29, className: 'dt-body-center', render: DataTable.render.text() }, //NIK
      { visible: false, targets: 30 }, //PENDIDIKAN
      { visible: false, targets: 31 }, //PEKERJAAN
      { visible: false, targets: 32, className: 'dt-body-center img' }, //PASPOR
      { visible: false, targets: 33, className: 'dt-body-center' }, //NO_PASPOR
      { visible: false, targets: 34 }, //NM_PASPOR
      { visible: false, targets: 35 }, //IMIGRASI
      { visible: false, targets: 36, render: DataTable.render.date('DD MMM YYYY') }, //EXPIRE
      { visible: false, targets: 37, className: 'bimb', render: DataTable.render.number('.', ',', null, 'Rp. ') }, //BIMBINGAN
      { visible: false, targets: 38, className: 'perl', render: DataTable.render.number('.', ',', null, 'Rp. ') }, //PERLENGKAPAN
      { visible: false, targets: 39, className: 'kolo', render: DataTable.render.number('.', ',', null, 'Rp. ') }, //KOLOSAL
      { visible: false, targets: 40, className: 'pasp', render: DataTable.render.number('.', ',', null, 'Rp. ') }, //PASPORAN
      { visible: false, targets: 41, className: 'biov', render: DataTable.render.number('.', ',', null, 'Rp. ') }, //BIO VISA
      { visible: false, targets: 42, className: 'dt-body-center' }, //BIMB?
      { visible: false, targets: 43, className: 'dt-body-center' }, //PERL?
      { visible: false, targets: 44, className: 'dt-body-center' }, //KOLO?
      { visible: false, targets: 45, className: 'dt-body-center' }, //PASP?
      { visible: false, targets: 46, className: 'dt-body-center' }, //BIO ?
      { visible: false, targets: 47, className: 'dt-body-center' }, //BUKU MANASIK AZ
      { visible: false, targets: 48, className: 'dt-body-center' }, //KAIN IHROM
      { visible: false, targets: 49, className: 'dt-body-center' }, //BAJU KOKO
      { visible: false, targets: 50, className: 'dt-body-center' }, //BATIK ALZAMZAMI
      { visible: false, targets: 51, className: 'dt-body-center' }, //BATIK NASIONAL
      { visible: false, targets: 52, className: 'dt-body-center' }, //CELANA PUTIH
      { visible: false, targets: 53, className: 'dt-body-center' }, //KOLOR PUTIH
      { visible: false, targets: 54, className: 'dt-body-center' }, //KERUDUNG ALZAMZAMI
      { visible: false, targets: 55, className: 'dt-body-center' }, //KERUDUNG NASIONAL
      { visible: false, targets: 56, className: 'dt-body-center' }, //GAMIS
      { visible: false, targets: 57, className: 'dt-body-center' }, //MUKENA
      { visible: false, targets: 58, className: 'dt-body-center' }, //ROK PUTIH
      { visible: false, targets: 59, className: 'dt-body-center' }, //SYAL
      { visible: false, targets: 60, className: 'dt-body-center' }, //TAS LEHER
      { visible: false, targets: 61, className: 'dt-body-center' }, //KAOS SAKU
      { visible: false, targets: 62, className: 'dt-body-center' }, //TAARUF
      { visible: false, targets: 63, className: 'dt-body-center' }, //MANASIK AWAL 1
      { visible: false, targets: 64, className: 'dt-body-center' }, //MANASIK AWAL 2
      { visible: false, targets: 65, className: 'dt-body-center' }, //MANASIK AWAL 3
      { visible: false, targets: 66, className: 'dt-body-center' }, //MANASIK AWAL 4
      { visible: false, targets: 67, className: 'dt-body-center' }, //MANASIK AWAL 5
      { visible: false, targets: 68, className: 'dt-body-center' }, //MANASIK AWAL 6
      { visible: false, targets: 69, className: 'dt-body-center' }, //PERSIAPAN KOLOSAL
      { visible: false, targets: 70, className: 'dt-body-center' }, //MANASIK KOLOSAL
      { visible: false, targets: 71, className: 'dt-body-center' }, //EVALUASI KOLOSAL
      { visible: false, targets: 72, className: 'dt-body-center' }, //PERSIAPAN KEBERANGKATAN
      { visible: false, targets: 73, className: 'dt-body-center' }, //PASKA HAJI
      { visible: false, targets: 74, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-1
      { visible: false, targets: 75, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-2
      { visible: false, targets: 76, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-3
      { visible: false, targets: 77, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-4
      { visible: false, targets: 78, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-5
      { visible: false, targets: 79, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-7
      { visible: false, targets: 80, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-8
      { visible: false, targets: 81, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-9
      { visible: false, targets: 82, searchable: false, orderable: false, className: 'dt-body-center' }, //COL-10
      { visible: false, targets: 83, searchable: false, orderable: false, className: 'dt-body-center' }, //GAMIS
      { visible: false, targets: 84, searchable: false, orderable: false, className: 'dt-body-center' }, //PUNDAK
      { visible: false, targets: 85, searchable: false, orderable: false, className: 'dt-body-center' }, //P-BADAN
      { visible: false, targets: 86, searchable: false, orderable: false, className: 'dt-body-center' }, //L-DADA
      { visible: false, targets: 87, searchable: false, orderable: false, className: 'dt-body-center' }, //L-PINGGANG
      { visible: false, targets: 88, searchable: false, orderable: false, className: 'dt-body-center' }, //L-PINGGUL
      { visible: false, targets: 89, searchable: false, orderable: false, className: 'dt-body-center' }, //P-TANGAN
      { visible: false, targets: 90, searchable: false, orderable: false, className: 'dt-body-center' }, //L-TANGAN
      { visible: false, targets: 91, searchable: false, orderable: false, className: 'dt-body-center' }, //KERAH
      { visible: false, targets: 92, searchable: false, orderable: false, className: 'dt-body-center' }, //PARAF
      { visible: false, targets: 93, searchable: false, orderable: false, className: 'dt-body-center' }, //TANDA TANGAN
      { visible: false, targets: 94, searchable: false, orderable: false, className: 'dt-body-center' }, //KETERANGAN
      { visible: false, targets: 95, searchable: false, orderable: false, className: 'dt-body-center' }, //KET
   ],
   order: [[5, 'asc']],
   ajax: {
      // url: 'dbNow.json',
      url: 'https://script.google.com/macros/s/AKfycbw7Y8lw9oPCQWsF2JZLgBicNtUpIXf-wxL0rzfuczZfk080PqRqCX54Y4QiNJ_ASF83Aw/exec',
      dataSrc: 'data'
   },
   columns: [
      { data: "no" }, //0
      { data: "porsi" }, //1
      { data: "musim" }, //2
      { data: "status" }, //3
      { data: "sebagai" }, //4
      { data: "absen" }, //5
      { data: "pelunasan" }, //6
      { data: "hijri" }, //7
      { data: "spph" }, //8
      { data: "sapa" }, //9
      { data: "nama" }, //10
      { data: "ayah" }, //11
      { data: "gender" }, //12
      { data: "nama_lengkap" }, //13
      { data: "tmp_lhr" }, //14
      { data: "tgl_lhr" }, //15
      { data: "usia" }, //16
      { data: "alamat" }, //17
      { data: "desa" }, //18
      { data: "kecamatan" }, //19
      { data: "kode_pos" }, //20
      { data: "bank" }, //21
      { data: "tgl daftar" }, //22
      { data: "reff" }, //23
      { data: "desa_kec" }, //24
      { data: "foto", render: function (data, type) { if (data !== '') { let linkOri = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s400'; let linkThumnail = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s100'; return '<a href="' + linkOri + '" target="_blank">' + '<img src="' + linkThumnail + '">' + '</a>' } return data } }, //25
      { data: "hp" }, //26
      { data: "hp_kel" }, //27
      { data: "ktp", render: function (data, type) { if (data !== '') { let linkOri = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s400'; let linkThumnail = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s100'; return '<a href="' + linkOri + '" target="_blank">' + '<img src="' + linkThumnail + '">' + '</a>' } return data } }, //28
      { data: "nik" }, //29
      { data: "pendidikan" }, //30
      { data: "pekerjaan" }, //31
      { data: "paspor", render: function (data, type) { if (data !== '') { let linkOri = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s400'; let linkThumnail = 'https://drive.google.com/thumbnail?id=' + data + '&sz=s100'; return '<a href="' + linkOri + '" target="_blank">' + '<img src="' + linkThumnail + '">' + '</a>' } return data } }, //32
      { data: "no_paspor" }, //33
      { data: "nm_paspor" }, //34
      { data: "imigrasi" }, //35
      { data: "expire" }, //36
      { data: "bimbingan" }, //37
      { data: "perlengkapan" }, //38
      { data: "kolosal" }, //39
      { data: "pasporan" }, //40
      { data: "bio visa" }, //41
      { data: "bimb?" }, //42
      { data: "perl?" }, //43
      { data: "kolo?" }, //44
      { data: "pasp?" }, //45
      { data: "bio ?" }, //46
      { data: "buku manasik az" }, //47
      { data: "kain ihrom" }, //48
      { data: "baju koko" }, //49
      { data: "batik alzamzami" }, //50
      { data: "batik nasional" }, //51
      { data: "celana putih" }, //52
      { data: "kolor putih" }, //53
      { data: "kerudung alzamzami" }, //54
      { data: "kerudung nasional" }, //55
      { data: "gamis" }, //56
      { data: "mukena" }, //57
      { data: "rok putih" }, //58
      { data: "syal" }, //59
      { data: "tas leher" }, //60
      { data: "kaos saku" }, //61
      { data: "taaruf" }, //62
      { data: "manasik awal 1" }, //63
      { data: "manasik awal 2" }, //64
      { data: "manasik awal 3" }, //65
      { data: "manasik awal 4" }, //66
      { data: "manasik awal 5" }, //67
      { data: "manasik awal 6" }, //68
      { data: "persiapan kolosal" }, //69
      { data: "manasik kolosal" }, //70
      { data: "evaluasi kolosal" }, //71
      { data: "persiapan keberangkatan" }, //72
      { data: "paska haji" }, //73
      { data: "col-1" }, //74
      { data: "col-2" }, //75
      { data: "col-3" }, //76
      { data: "col-4" }, //77
      { data: "col-5" }, //78
      { data: "col-7" }, //79
      { data: "col-8" }, //80
      { data: "col-9" }, //81
      { data: "col-10" }, //82
      { data: "gamis" }, //83
      { data: "pundak" }, //84
      { data: "p-badan" }, //85
      { data: "l-dada" }, //86
      { data: "l-pinggang" }, //87
      { data: "l-pinggul" }, //88
      { data: "p-tangan" }, //89
      { data: "l-tangan" }, //90
      { data: "kerah" }, //91
      { data: "paraf" }, //92
      { data: "tanda tangan" }, //93
      { data: "keterangan" }, //94
      { data: "ket" }, //95
   ],
   processing: true,
   colReorder: true,
   fixedHeader: true,
   paging: false,
   language: {
      info: 'Hal. _PAGE_ dari _PAGES_',
      infoEmpty: 'Data tidak tersedia!',
      infoFiltered: '(terjaring dari total _MAX_ data)',
      lengthMenu: 'Tampil _MENU_ baris per halaman',
      zeroRecords: 'Maaf - Tidak ditemukan',
      search: 'Pencarian:',
      buttons: {
         colvis: 'Tampil / Hilangkan Kolom'
      },
      searchBuilder: {
         add: 'Tambahkan Kondisi',
         condition: 'Komparasi',
         clearAll: 'Reset',
         delete: 'Hapus',
         deleteTitle: 'Hapus Judul',
         data: 'Kolom',
         left: '<-',
         leftTitle: 'Judul Kiri',
         logicAnd: 'Dan',
         logicOr: 'Atau',
         right: '->',
         rightTitle: 'Judul Kanan',
         title: {
            0: 'Jaring Pencarian',
            _: 'Jaring Pencarian (%d)'
         },
         value: 'Opsi',
         valueJoiner: '@',
         conditions: {
            string: {
               contains: 'Berisi',
               empty: 'Kosong',
               endsWith: 'Berakhir dengan',
               equals: 'Sama dengan',
               not: 'Tidak',
               notContains: 'Tidak Berisi',
               notEmpty: 'Tidak Kosong',
               notEndsWith: 'Tidak Berakhir dengan',
               notStartsWith: 'Tidak Dimulai dengan',
               startsWith: 'Mulai dengan'
            }
         }
      }
   },
   layout: {
      top3Start: {
         div: {
            className: 'warn',
            id: 'warn-btn',
            html: 'Click button to acknowledge: <button>Ack</button>'
         }
      },
      top3End: {
         judulDokumen: {
            text: 'My custom toolbar!'
         }
      },
      top2: {
         searchBuilder: {
            preDefined: {
               criteria: [
                  {
                     condition: '=',
                     data: 'HIJRI',
                     value: ['1446']
                  }
               ],
               logic: 'AND'
            }
         }
      },
      topStart: {
         search: {
            placeholder: 'Ketik di Sini!'
         }
      },
      topEnd: ['pageLength'],
      top2Start: {
         buttons: [
            // 'colvis',
            {
               extend: 'colvis',
               columnText: function (dt, idx, title) {
                  return idx + 1 + ': ' + title;
               },
               collectionLayout: 'fixed columns',
               popoverTitle: 'TENTUKAN KOLOM'
            }
         ]
      },
      top2End: {
         buttons: [
            {
               extend: 'print',
               autoPrint: false,
               text: 'Print Dokumen',
               title: function () {
                  switch ($("#titleDok").val()) {
                     case '':
                        return 'Data Peserta Bimbingan Manasik Haji'
                        break;

                     default:
                        return $("#titleDok").val()
                        break;
                  }
               },
               messageTop: 'KBIHU Al-Zamzami Kuningan',
               messageBottom: '',
               orientation: document.getElementById('paper').value,
               // pageSize: 'A4',
               exportOptions: {
                  columns: ':visible',
                  format: {
                     // body: function (inner, rowidx, colidx, node) {
                     //    if (node.classList.contains('summary')) {
                     //       return '<span class="summary" style="color:red; font-style:italic;">' + inner + '</span>';
                     //    } else {
                     //       return inner;
                     //    }
                     // }
                     body: function (inner, rowidx, colidx, node) {
                        if (node.classList.contains('img')) {
                           //return '<img src="https://drive.google.com/thumbnail?id=' + inner + '&sz=s100">';
                           return inner;
                        } else {
                           return inner;
                        }
                     }
                  }
               },
               customize: function (win, butt, tbl) {

                  $(win.document.body)
                     .css('font-size', '10pt')
                     .prepend(
                        '<img src="http://haji.alzamzami.co.id/img/logokbihu.svg" style="position:absolute; height:95px; top:0; right:0;" />'
                     );

                  // $(win.document.body)
                  //    .find('table')
                  //    .addClass('compact')
                  //    .css('font-size', 'inherit');
                  let tinggi = document.getElementById('tinggi').value
                  $(win.document.body).find('td').each(function (index) { $(this).css('height', tinggi + 'px') });

                  // $(win.document.body).find('span.summary').css('font-size', '20px');
                  // $(win.document.body).find('span.summary').parent().css('background-color', 'yellow');

                  $(win.document.body).find('span.summary').each(function (index) { $(this).addClass('dt-body-center') });


                  // Untuk menyelaraskan style di view dan di print 
                  let colVisibleHeader = table.columns(':visible')[0];
                  for (var i = 0; i < colVisibleHeader.length; ++i) {
                     $(win.document.body).find('table thead th:nth-child(' + (i + 1) + ')').each(function (index) {
                        $(this).addClass(
                           //ambil dari style view
                           table.cell(0, colVisibleHeader[i]).node().getAttribute('class')
                        )
                     });
                  }
                  let colVisible = table.columns(':visible')[0];
                  for (var i = 0; i < colVisible.length; ++i) {
                     $(win.document.body).find('table tr td:nth-child(' + (i + 1) + ')').each(function (index) {
                        $(this).addClass(
                           //ambil dari style view
                           table.cell(0, colVisible[i]).node().getAttribute('class')
                        )
                     });
                  }
                  let colVisibleFooter = table.columns(':visible')[0];
                  for (var i = 0; i < colVisibleFooter.length; ++i) {
                     $(win.document.body).find('table tfoot th:nth-child(' + (i + 1) + ')').each(function (index) {
                        $(this).addClass(
                           //ambil dari style view
                           table.cell(0, colVisibleFooter[i]).node().getAttribute('class')
                        )
                     });
                  }

                  // --> Landscape START
                  var last = null;
                  var current = null;
                  var bod = [];
                  var paper = document.getElementById('paper').value === 'portrait' ? '' : 'landscape';
                  var css = '@page { size: ' + paper + ' }',
                     head = win.document.head || win.document.getElementsByTagName('head')[0],
                     style = win.document.createElement('style');
                  style.type = 'text/css';
                  style.media = 'print';
                  if (style.styleSheet) {
                     style.styleSheet.cssText = css;
                  }
                  else {
                     style.appendChild(win.document.createTextNode(css));
                  }
                  head.appendChild(style)
                  // <-- END

               }
            },
            {
               extend: 'pdfHtml5',
               text: 'PDF',
               orientation: document.getElementById('paper').value,
               // pageSize: 'A4',
               title: function () {
                  switch ($("#titleDok").val()) {
                     case '':
                        return 'Data Peserta Bimbingan Manasik Haji'
                        break;

                     default:
                        return $("#titleDok").val()
                        break;
                  }
               },
               exportOptions: {
                  columns: ':visible'
               },
               customize: function (doc) {
                  doc['footer'] = (function (page, pages) {
                     return {
                        columns: [
                           {
                              alignment: 'center',
                              text: [
                                 ' Hal. ',
                                 { text: page.toString(), italics: true },
                                 ' dari ',
                                 { text: pages.toString(), italics: true }
                              ]
                           }],
                        margin: [10, 0]
                     }
                  });
                  doc['header'] = (function (page, pages) {
                     return {
                        columns: [
                           {
                              alignment: 'center',
                              text: ['KBIHU Al-Zamzami']
                           }],
                        margin: [10, 10]
                     }
                  });
               }
            },
            {
               extend: 'excelHtml5',
               text: 'Excel',
               title: function () {
                  switch ($("#titleDok").val()) {
                     case '':
                        return 'Data Peserta Bimbingan Manasik Haji'
                        break;

                     default:
                        return $("#titleDok").val()
                        break;
                  }
               },
               messageTop: 'KBIHU Al-Zamzami Kuningan',
               exportOptions: {
                  columns: ':visible'
               }
            },
            {
               extend: 'copyHtml5',
               text: 'Copy',
               title: function () {
                  switch ($("#titleDok").val()) {
                     case '':
                        return 'Data Peserta Bimbingan Manasik Haji'
                        break;

                     default:
                        return $("#titleDok").val()
                        break;
                  }
               },
               messageTop: 'KBIHU Al-Zamzami Kuningan',
               exportOptions: {
                  columns: ':visible'
               }
            }
         ]
      },
   },

   // initComplete: function () {
   //    this.api()
   //       .columns(7)
   //       .every(function () {
   //          let column = this;
   //          let selectTahun = document.getElementById("hijri");
   //          column.data().unique().sort().each(function (d, j) {
   //             if (j === column.data().unique().sort().length - 1) {
   //                //set selected option
   //                selectTahun.add(new Option(d, d, true, true));
   //                //auto filter
   //                column.search(d).draw();
   //             } else {
   //                //tambah option
   //                selectTahun.add(new Option(d, d));
   //             }
   //          })
   //       })

   //    var options = [];
   //    this.api()
   //       .columns(3)
   //       .every(function () {
   //          let column = this;
   //          column.data().unique().sort().each(function (d, j) {
   //             options[j] = { label: d, title: d, value: d }
   //          })
   //       })
   //    $('#filterStatus').multiselect('dataprovider', options);
   // },
   drawCallback: function (row, data, start, end, display) {
      var api = this.api();

      var countGenderL = 0;
      var countGenderP = 0;
      api.cells(null, '.g', { page: 'current' }).nodes().each(function (n) {
         if ($(n).hasClass('g')) {
            if ($(n).text() === "L") {
               countGenderL += 1
            }
            if ($(n).text() === "P") {
               countGenderP += 1
            }
         }
      })
      $(api.column('.g').footer()).html('L(' + countGenderL + ') P(' + countGenderP + ')');

      var total = 0;
      var intVal = function (i) { return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.usia', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('lansia')) { if (intVal($(n).text()) > 0) { total += 1 } } });
      $(api.column('.usia').footer()).html('LN: ' + total);
      // $(api.column(16).footer()).html(api.column(16).nodes().count());

      var sumBimb = 0;
      var intValBimb = function (i) { return typeof i === 'string' ? i.replace(/[Rp.]+/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.Bimb', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('bimb')) { sumBimb += intValBimb($(n).text()) } });
      $(api.column('.Bimb').footer()).html(formatUang(sumBimb));

      var sumPerl = 0;
      var intValPerl = function (i) { return typeof i === 'string' ? i.replace(/[Rp.]+/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.Perl', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('perl')) { sumPerl += intValPerl($(n).text()) } });
      $(api.column('.Perl').footer()).html(formatUang(sumPerl));

      var sumKolo = 0;
      var intValKolo = function (i) { return typeof i === 'string' ? i.replace(/[Rp.]+/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.Kolo', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('kolo')) { sumKolo += intValKolo($(n).text()) } });
      $(api.column('.Kolo').footer()).html(formatUang(sumKolo));

      var sumPasp = 0;
      var intValPasp = function (i) { return typeof i === 'string' ? i.replace(/[Rp.]+/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.Pasp', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('pasp')) { sumPasp += intValPasp($(n).text()) } });
      $(api.column('.Pasp').footer()).html(formatUang(sumPasp));

      var sumBiov = 0;
      var intValBiov = function (i) { return typeof i === 'string' ? i.replace(/[Rp.]+/g, '') * 1 : typeof i === 'number' ? i : 0 };
      api.cells(null, '.Biov', { page: 'current' }).nodes().each(function (n) { if ($(n).hasClass('biov')) { sumBiov += intValBiov($(n).text()) } });
      $(api.column('.Biov').footer()).html(formatUang(sumBiov));


   },
   rowCallback: function (row, data) {
      $('#tinggi').on('keyup', function () {
         $(row).css('height', this.value + 'px');
      });
   }
});

// auto replace column 0 menjadi auto number
table
   .on('order.dt search.dt', function () {
      let i = 1;

      table
         .cells(null, 0, { search: 'applied', order: 'applied' })
         .every(function (cell) {
            this.data(i++);
         });
   })
   .draw();

// aksi ketika select option difilter
// $('#hijri').on('change', function () {
//    table
//       .columns(7)
//       .search(this.value)
//       .draw();
// });

// $('#filterStatus').multiselect({
//    buttonText: function (options, select) {
//       if (options.length === 0) {
//          return 'Status All';
//       }
//       else if (options.length > 3) {
//          return '> 3 status terpilih';
//       }
//       else {
//          var labels = [];
//          options.each(function () {
//             if ($(this).attr('label') !== undefined) {
//                labels.push($(this).attr('label'));
//             }
//             else {
//                labels.push($(this).html());
//             }
//          });
//          return labels.join(', ') + '';
//       }
//    },
//    onChange: function (option, checked, select) {
//       //build a regex filter string with an or(|) condition
//       var positions = $('#filterStatus option:selected').map(function (a, item) {
//          return '^' + item.value + '$';
//       }).get().join('|');

//       //filter in column 1, with an regex, no smart filtering, not case sensitive
//       table.column(3).search(positions, true, false, false).draw(false);
//    }
// });

// document.querySelectorAll('a.toggle-vis').forEach((el) => {
//    if (nama === "true") {
//       el.addEventListener('click', function (e) {
//          let isExpanded = this.getAttribute('aria-pressed');
//          // console.log(isExpanded)
//          if (isExpanded === 'false') {
//             this.setAttribute('class', 'toggle-vis nav-link active');
//             this.setAttribute('aria-pressed', 'true');
//          }
//          if (isExpanded === 'true') {
//             this.setAttribute('class', 'toggle-vis nav-link');
//             this.setAttribute('aria-pressed', 'false');
//          }

//          e.preventDefault();

//          let columnIdx = e.target.getAttribute('data-column');
//          let column = table.column(columnIdx);

//          // Toggle the visibility
//          column.visible(!column.visible());
//       });
//    }
// });

// // menciptakan hightlight pada colomn
// table.on('mouseenter', 'td', function () {
//    let colIdx = table.cell(this).index().column;
//    // console.log(table.columns(':visible').count())
//    // console.log(colIdx)

//    table
//       .cells()
//       .nodes()
//       .each((el) => el.classList.remove('highlight'));

//    table
//       .column(colIdx)
//       .nodes()
//       .each((el) => el.classList.add('highlight'));

// });

// konversi number ke rupiah
function formatUang(subject) {
   rupiah = subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
   return `Rp${rupiah}`;
}
