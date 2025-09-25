document.addEventListener('DOMContentLoaded', function () {
    // --- JEMAAH LIST MANAGEMENT ---

    // Data ini mensimulasikan respons dari API JSON.
    const jemaahData = [
        {
            id: "jemaah-1",
            nama: "Ahmad Subarjo",
            alamat: "Jl. Merdeka No. 1, Jakarta",
            desa_kec: "Menteng - Jakarta Pusat",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Sastra II",
            pekerjaan: "PNS"
            
        },
        {
            id: "jemaah-2",
            nama: "Budi Santoso",
            alamat: "Jl. Pahlawan No. 10, Surabaya",
            desa_kec: "Bubutan - Surabaya",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Wiraswasta"
            
        },
        {
            id: "jemaah-3",
            nama: "Citra Lestari",
            alamat: "Jl. Kenanga No. 5, Bandung",
            desa_kec: "Coblong - Bandung",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Karyawan Swasta"
            
        },
        {
            id: "jemaah-4",
            nama: "Dewi Anggraini",
            alamat: "Jl. Mawar No. 22, Yogyakarta",
            desa_kec: "Gondokusuman - Yogyakarta",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Mengurus Rumah Tangga"
            
        },
        {
            id: "jemaah-5",
            nama: "Eko Prasetyo",
            alamat: "Jl. Sudirman Kav. 5, Semarang",
            desa_kec: "Semarang Tengah - Semarang",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Karyawan BUMN"
            
        },
        {
            id: "jemaah-6",
            nama: "Fajar Nugroho",
            alamat: "Jl. Gatot Subroto No. 15, Medan",
            desa_kec: "Medan Petisah - Medan",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Wiraswasta"
            
        },
        {
            id: "jemaah-7",
            nama: "Gita Permata",
            alamat: "Jl. Diponegoro No. 8, Makassar",
            desa_kec: "Ujung Pandang - Makassar",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Sastra II",
            pekerjaan: "Dokter"
            
        },
        {
            id: "jemaah-8",
            nama: "Hadi Wibowo",
            alamat: "Jl. Imam Bonjol No. 3, Palembang",
            desa_kec: "Ilir Timur I - Palembang",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTP / Sederajat",
            pekerjaan: "Petani / Pekebun"
            
        },
        {
            id: "jemaah-9",
            nama: "Indah Sari",
            alamat: "Jl. Ahmad Yani No. 12, Denpasar",
            desa_kec: "Denpasar Selatan - Denpasar",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Guru"
            
        },
        {
            id: "jemaah-10",
            nama: "Joko Susilo",
            alamat: "Jl. Teuku Umar No. 7, Balikpapan",
            desa_kec: "Balikpapan Kota - Balikpapan",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Wiraswasta"
            
        },
        {
            id: "jemaah-11",
            nama: "Kartika Dewi",
            alamat: "Jl. Gajah Mada No. 9, Pontianak",
            desa_kec: "Pontianak Kota - Pontianak",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Sastra II",
            pekerjaan: "PNS"
            
        },
        {
            id: "jemaah-12",
            nama: "Lukman Hakim",
            alamat: "Jl. Pangeran Antasari No. 2, Banjarmasin",
            desa_kec: "Banjarmasin Tengah - Banjarmasin",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Karyawan Swasta"
            
        },
        {
            id: "jemaah-13",
            nama: "Maya Anggraini",
            alamat: "Jl. Sam Ratulangi No. 11, Manado",
            desa_kec: "Wanea - Manado",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Mengurus Rumah Tangga"
            
        },
        {
            id: "jemaah-14",
            nama: "Nanda Pratama",
            alamat: "Jl. Wolter Monginsidi No. 5, Jayapura",
            desa_kec: "Jayapura Utara - Jayapura",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Tamat SD / Sederajat",
            pekerjaan: "Pedagang"
            
        },
        {
            id: "jemaah-15",
            nama: "Olivia Putri",
            alamat: "Jl. Pattimura No. 1, Ambon",
            desa_kec: "Nusaniwe - Ambon",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Ibu Rumah Tangga"
            
        },
        {
            id: "jemaah-16",
            nama: "Putra Wijaya",
            alamat: "Jl. Sudirman No. 101, Pekanbaru",
            desa_kec: "Pekanbaru Kota - Pekanbaru",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Sastra II",
            pekerjaan: "Dosen"
            
        },
        {
            id: "jemaah-17",
            nama: "Rina Marlina",
            alamat: "Jl. Kartini No. 21, Bandar Lampung",
            desa_kec: "Tanjung Karang Pusat - Bandar Lampung",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Pegawai Negeri Sipil"
            
        },
        {
            id: "jemaah-18",
            nama: "Surya Adi",
            alamat: "Jl. Hasanuddin No. 4, Mataram",
            desa_kec: "Cakranegara - Mataram",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Wiraswasta"
            
        },
        {
            id: "jemaah-19",
            nama: "Tiara Anindya",
            alamat: "Jl. Sisingamangaraja No. 88, Kupang",
            desa_kec: "Oebobo - Kupang",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "SLTP / Sederajat",
            pekerjaan: "Mengurus Rumah Tangga"
            
        },
        {
            id: "jemaah-20",
            nama: "Umar Zaki",
            alamat: "Jl. Jenderal Sudirman No. 12, Ternate",
            desa_kec: "Ternate Tengah - Ternate",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "Tamat SD / Sederajat",
            pekerjaan: "Nelayan"
            
        },
        {
            id: "jemaah-21",
            nama: "Vina Septiani",
            alamat: "Jl. Diponegoro No. 30, Sorong",
            desa_kec: "Sorong Manoi - Sorong",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Diploma IV / Sastra I",
            pekerjaan: "Bidan"
            
        },
        {
            id: "jemaah-22",
            nama: "Wahyu Hidayat",
            alamat: "Jl. Merdeka Timur No. 5, Manokwari",
            desa_kec: "Manokwari Barat - Manokwari",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L",
            pendidikan: "SLTA / Sederajat",
            pekerjaan: "Karyawan Swasta"
            
        },
        {
            id: "jemaah-23",
            nama: "Yulia Astuti",
            alamat: "Jl. Pahlawan Revolusi No. 1, Nabire",
            desa_kec: "Nabire - Nabire",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P",
            pendidikan: "Sastra II",
            pekerjaan: "Dosen"
            
        }
    ];

    // Data ini mensimulasikan respons dari API JSON untuk struktur manifest.
    // Nanti, Anda bisa mengganti bagian ini dengan `fetch()` ke API sebenarnya.
    const dataManifest = [
        {
            id: "kloter-1",
            kodeEmbarkasi: "KJT",
            noKloter: "01",
            rombongan: [
                {
                    id: "rombongan-1-1",
                    regu: [
                        { id: "regu-1-1-1", jemaah: [{id: "jemaah-1", role: "karom"}, {id: "jemaah-2", role: "karu"}, {id: "jemaah-3", role: null}] },
                        { id: "regu-1-1-2", jemaah: [{id: "jemaah-4", role: "karu"}, {id: "jemaah-5", role: null}] },
                        { id: "regu-1-1-3", jemaah: [{id: "jemaah-6", role: "karu"}, {id: "jemaah-7", role: null}] },
                        { id: "regu-1-1-4", jemaah: [{id: "jemaah-8", role: "karu"}, {id: "jemaah-9", role: null}] },
                    ]
                },
                {
                    id: "rombongan-1-2",
                    regu: [
                        { id: "regu-1-2-1", jemaah: [{id: "jemaah-10", role: "karom"}, {id: "jemaah-11", role: "karu"}] },
                        { id: "regu-1-2-2", jemaah: [{id: "jemaah-12", role: "karu"}, {id: "jemaah-13", role: null}] },
                        { id: "regu-1-2-3", jemaah: [{id: "jemaah-14", role: "karu"}, {id: "jemaah-15", role: null}] },
                        { id: "regu-1-2-4", jemaah: [{id: "jemaah-16", role: "karu"}, {id: "jemaah-17"}] },
                    ]
                },
                {
                    id: "rombongan-1-3",
                    regu: [] // Rombongan 3 kosong
                }
            ]
        },
        {
            id: "kloter-2",
            kodeEmbarkasi: "KJT",
            noKloter: "02",
            rombongan: [
                {
                    id: "rombongan-2-1",
                    regu: [
                        { id: "regu-2-1-1", jemaah: [{id: "jemaah-unknown", role: null}, {id: "jemaah-unknown", role: null}] },
                        { id: "regu-2-1-2", jemaah: [{id: "jemaah-18", role: null}, {id: "jemaah-19", role: null}] },
                        { id: "regu-2-1-3", jemaah: [{id: "jemaah-20", role: null}, {id: "jemaah-21", role: null}] },
                    ]
                }
            ]
        }
    ];

    // --- DATA VALIDATION ---
    if (!dataManifest || !Array.isArray(dataManifest) || dataManifest.length === 0) {
        console.warn("dataManifest bernilai null, kosong, atau bukan sebuah array. Inisialisasi manifest akan dilewati.");
        // Kosongkan kontainer kloter jika tidak ada data
        const kloterContainer = document.getElementById('kloterCardContainer');
        if (kloterContainer) kloterContainer.innerHTML = `
        <div id="kloterCardContainer">
            <div class="card kloter mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="col">
                        <span>Kloter 1</span>
                        <span class="badge bg-warning ms-2 kloter-title-bagde">Untitle</span>
                    </div>
                    <div class="col-md-auto"></div>
                    <div class="col col-lg-auto">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-sm btn-outline-secondary kloter-edit-btn"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary kloter-up-btn"><i class="bi bi-arrow-up"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary kloter-down-btn"><i class="bi bi-arrow-down"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-danger kloter-hapus-btn"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="rombongan-card-container">
                        <!-- Rombongan cards will be added here -->
                    </div>
                    <div class="text-end mt-3">
                        <button class="btn btn-secondary btn-sm tambah-rombongan-btn" type="button">
                            <i class="bi bi-plus-circle"></i> Tambah Rombongan
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    // Update total jemaah count on the dashboard card
    const totalJemaahCountElement = document.getElementById('totalJemaahCount');
    if (totalJemaahCountElement) {
        totalJemaahCountElement.textContent = jemaahData.length;
    }

    const rombonganStyles = [
        { bg: '#EC2027', text: '#FFFFFF' }, // 1
        { bg: '#FCEE21', text: '#000000' }, // 2
        { bg: '#0000FF', text: '#FFFFFF' }, // 3
        { bg: '#A65F27', text: '#FFFFFF' }, // 4
        { bg: '#6ABD45', text: '#000000' }, // 5
        { bg: '#FFFFFF', text: '#000000' }, // 6
        { bg: '#F79520', text: '#000000' }, // 7
        { bg: '#6B3180', text: '#FFFFFF' }, // 8
        { bg: '#0A0A0A', text: '#FFFFFF' }, // 9
        { bg: '#F8B4BA', text: '#000000' }, // 10
        { bg: '#7C7C7C', text: '#FFFFFF' }  // 11
    ];

    // --- DYNAMIC CONTENT GENERATION ---

    // Cari semua jemaah yang sudah ditempatkan
    const placedJemaahIds = new Set();
    if (dataManifest && Array.isArray(dataManifest)) {
        dataManifest.forEach(kloter => {
            kloter.rombongan.forEach(rombongan => {
                rombongan.regu.forEach(regu => {
                    regu.jemaah.forEach(jemaahObj => {
                        const jemaahId = typeof jemaahObj === 'string' ? jemaahObj : jemaahObj.id;
                        if (jemaahId !== 'jemaah-unknown') placedJemaahIds.add(jemaahId);
                    });
                });
            });
        });
    }

    // Fungsi untuk memperbarui badge hitungan jemaah yang tersedia
    const updateAvailableJemaahCount = () => {
        const availableCount = availableJemaah.length;
        const cardHeader = document.querySelector('.sticky-jemaah-card .card-header');
        if (cardHeader) {
            let badge = cardHeader.querySelector('#availableJemaahCount');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-secondary ms-2';
                badge.id = 'availableJemaahCount';
                cardHeader.appendChild(badge);
            }
            badge.textContent = availableCount;
        }
    };
    // Fungsi untuk me-render daftar jemaah ke HTML
    const renderJemaahList = (data) => {
        const jemaahListContainer = document.getElementById('jemaahList');
        if (!jemaahListContainer) return;

        jemaahListContainer.innerHTML = ''; // Kosongkan daftar sebelum diisi ulang

        const fragment = document.createDocumentFragment();
        data.forEach(jemaah => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex align-items-center jemaah-item';
            listItem.dataset.id = jemaah.id;

            listItem.innerHTML = `
                <img src="${jemaah.foto}" height="50px" width="50px" class="rounded-circle me-3" alt="Foto ${jemaah.nama}">
                <div>
                    <span class="badge bg-secondary mb-1">${jemaah.status}</span>
                    <div class="fw-bold">${jemaah.nama} <i class="bi ${jemaah.gender === 'L' ? 'bi-gender-male text-primary' : 'bi-gender-female text-danger'}"></i></div>
                    <small class="text-muted">
                        ${jemaah.pendidikan} - ${jemaah.pekerjaan}<br>
                        ${jemaah.alamat}<br>
                        ${jemaah.desa_kec}
                    </small>
                </div>
                <div class="dropdown ms-auto jemaah-item-menu">
                    <button class="btn btn-sm btn-light py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item jemaah-action-btn" href="#" data-action="karom">Set Karom</a></li>
                        <li><a class="dropdown-item jemaah-action-btn" href="#" data-action="karu">Set Karu</a></li>
                        <li class="clear-set-item" style="display: none;"><hr class="dropdown-divider"></li>
                        <li class="clear-set-item" style="display: none;"><a class="dropdown-item jemaah-action-btn" href="#" data-action="clear">Clear Set</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger jemaah-action-btn" href="#" data-action="remove">Hapus dari regu</a></li>
                    </ul>
                </div>
            `;
            fragment.appendChild(listItem);
        });
        jemaahListContainer.appendChild(fragment);
    };

    // Jemaah yang tersedia adalah yang tidak ada di `placedJemaahIds`
    let availableJemaah = jemaahData.filter(j => !placedJemaahIds.has(j.id));


    // Panggil fungsi untuk memuat daftar jemaah saat halaman dimuat
    renderJemaahList(availableJemaah);
    updateAvailableJemaahCount();

    // Fungsi untuk mengembalikan jemaah ke daftar utama saat kontainer dihapus
    const returnJemaahToAvailableList = (elementToRemove) => {
        const jemaahItems = elementToRemove.querySelectorAll('.jemaah-item');
        let returned = false;
        jemaahItems.forEach(item => {
            const jemaahId = item.dataset.id;

            // Jangan kembalikan jemaah unknown ke daftar
            if (jemaahId === 'jemaah-unknown') return;

            const jemaah = jemaahData.find(j => j.id === jemaahId);
            // Pastikan tidak ada duplikat dan jemaah ada
            if (jemaah && !availableJemaah.some(aj => aj.id === jemaahId)) {
                availableJemaah.push(jemaah);
                returned = true;
            }
        });

        // Jika ada jemaah yang dikembalikan, perbarui daftar pencarian
        if (returned) {
            // Memicu event 'input' akan menjalankan ulang filter pencarian dan me-render ulang daftar
            cariJemaahInput.dispatchEvent(new Event('input'));
            updateAvailableJemaahCount();
        }
    };

    // Fungsi untuk membuat elemen HTML jemaah
    const createJemaahItemElement = (jemaahObj) => {
        const jemaahId = typeof jemaahObj === 'string' ? jemaahObj : jemaahObj.id;
        const role = typeof jemaahObj === 'object' ? jemaahObj.role : null;
        const jemaah = jemaahData.find(j => j.id === jemaahId);
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center jemaah-item';
        listItem.dataset.id = jemaahId;
        if (role) listItem.dataset.role = role;
        if (jemaahId === 'jemaah-unknown') {
            listItem.innerHTML = `
                <img src="img/unknown.jpg" height="50px" width="50px" class="rounded-circle me-3" alt="Foto Jemaah Unknown">
                <div>
                    <div class="fw-bold">Jemaah Unknown</div>
                    <small class="text-muted">Placeholder</small>
                </div>
                <div class="dropdown ms-auto jemaah-item-menu">
                    <button class="btn btn-sm btn-light py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item text-danger jemaah-action-btn" href="#" data-action="remove">Hapus dari regu</a></li>
                    </ul>
                </div>`;
            return listItem;
        }

        if (!jemaah) return null;

        const karomDisabled = role === 'karom' ? 'disabled' : '';
        const karuDisabled = role === 'karu' ? 'disabled' : '';
        const roleBadgeHTML = role === 'karom'
            ? '<span class="badge bg-primary ms-1 jemaah-role-badge">Karom</span>'
            : role === 'karu' ?
            '<span class="badge bg-warning text-dark ms-1 jemaah-role-badge">Karu</span>' :
            '';
        const clearSetDisplay = role ? 'style="display: list-item;"' : 'style="display: none;"';

        // Konten untuk popover
        const popoverContent = `
            <div class='popover-body-custom'>
                <div>${jemaah.pendidikan} - ${jemaah.pekerjaan}</div>
                <div>${jemaah.alamat}</div>
            </div>`;

        listItem.innerHTML = `
            <img src="${jemaah.foto}" height="50px" width="50px" class="rounded-circle me-3" alt="Foto ${jemaah.nama}">
            <div>
                <span class="badge bg-secondary mb-1">${jemaah.status}</span>${roleBadgeHTML}
                <div class="fw-bold" 
                     data-bs-toggle="popover" 
                     data-bs-trigger="hover" 
                     data-bs-placement="top" 
                     data-bs-html="true" 
                     data-bs-content="${popoverContent}">
                     ${jemaah.nama} 
                     <i class="bi ${jemaah.gender === 'L' ? 'bi-gender-male text-primary' : 'bi-gender-female text-danger'}"></i>
                </div>
                <small class="text-muted">${jemaah.desa_kec}</small>
            </div>
            <div class="dropdown ms-auto jemaah-item-menu">
                <button class="btn btn-sm btn-light py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item jemaah-action-btn ${karomDisabled}" href="#" data-action="karom">Set Karom</a></li>
                    <li><a class="dropdown-item jemaah-action-btn ${karuDisabled}" href="#" data-action="karu">Set Karu</a></li>
                    <li class="clear-set-item" ${clearSetDisplay}><hr class="dropdown-divider"></li>
                    <li class="clear-set-item" ${clearSetDisplay}><a class="dropdown-item jemaah-action-btn" href="#" data-action="clear">Clear Set</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger jemaah-action-btn" href="#" data-action="remove">Hapus dari regu</a></li>
                </ul>
            </div>`;
        return listItem;
    };

    // Fungsi untuk me-render seluruh manifest dari data
    const renderManifest = (manifestData) => {
        const kloterContainer = document.getElementById('kloterCardContainer');
        kloterContainer.innerHTML = ''; // Kosongkan kontainer

        manifestData.forEach((kloter, kloterIndex) => {
            const kloterEl = createKloterElement(kloterIndex + 1);
            const titleBadge = kloterEl.querySelector('.kloter-title-bagde');
            if (kloter.kodeEmbarkasi && kloter.noKloter) {
                titleBadge.textContent = `${kloter.kodeEmbarkasi}-${kloter.noKloter}`;
                titleBadge.classList.remove('bg-warning');
                titleBadge.classList.add('bg-primary');
            }

            const rombonganContainer = kloterEl.querySelector('.rombongan-card-container');
            kloter.rombongan.forEach((rombongan, rombonganIndex) => {
                const rombonganEl = createRombonganElement(rombonganIndex + 1);
                const reguContainer = rombonganEl.querySelector('.regu-container');

                rombongan.regu.forEach((regu, reguIndex) => {
                    const reguEl = createReguElement(reguIndex + 1);
                    const reguContentArea = reguEl.querySelector('.regu-content-area');

                    regu.jemaah.forEach(jemaahObj => {
                        const jemaahEl = createJemaahItemElement(jemaahObj);
                        if (jemaahEl) reguContentArea.appendChild(jemaahEl);
                    });

                    reguContainer.appendChild(reguEl);
                    initJemaahDropzone(reguContentArea);
                });

                rombonganContainer.appendChild(rombonganEl);
                initSortableRegu(reguContainer);
            });

            kloterContainer.appendChild(kloterEl);
            initSortableRombongan(rombonganContainer);
            reorderRombonganInContainer(rombonganContainer);
        });

        // Inisialisasi semua popover yang baru dirender
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

        reorderKloterCards();
        debouncedUpdateAllCounts();
    };


    // --- COUNTERS ---
    const updateAllCountsOnPage = () => {
        // Regu Counts
        document.querySelectorAll('.regu-card > .card-header').forEach(header => {
            const card = header.closest('.regu-card');
            // const count = card.querySelectorAll('.jemaah-item').length;
            const count = card.querySelectorAll('.jemaah-item:not([data-id="jemaah-unknown"])').length;
            const titleSpan = header.querySelector('span');
            let badge = header.querySelector('.regu-count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-secondary ms-2 regu-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', badge);
                }
            }
            badge.textContent = count;
        });

        // Rombongan Counts
        document.querySelectorAll('.rombongan > .card-header').forEach(header => {
            const card = header.closest('.rombongan');
            const titleSpan = header.querySelector('span');

            // Badge yang sudah ada, untuk menghitung jemaah
            const jemaahCount = card.querySelectorAll('.jemaah-item:not([data-id="jemaah-unknown"])').length;
            let jemaahBadge = header.querySelector('.rombongan-count-badge');
            if (!jemaahBadge) {
                jemaahBadge = document.createElement('span');
                jemaahBadge.className = 'badge bg-secondary ms-2 rombongan-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', jemaahBadge);
                }
            }
            jemaahBadge.textContent = jemaahCount;

            // Badge baru untuk menghitung regu, disisipkan sebelum badge jemaah
            const reguCount = card.querySelectorAll('.regu-card').length;
            let reguBadge = header.querySelector('.rombongan-regu-count-badge');
            if (!reguBadge) {
                reguBadge = document.createElement('span');
                reguBadge.className = 'badge bg-secondary ms-2 rombongan-regu-count-badge';
                if (jemaahBadge) {
                    jemaahBadge.insertAdjacentElement('beforebegin', reguBadge);
                }
            }
            reguBadge.textContent = reguCount;
        });

        // Kloter Counts
        document.querySelectorAll('.kloter > .card-header').forEach(header => {
            const card = header.closest('.kloter');
            const titleSpan = header.querySelector('span');

            // Badge yang sudah ada, sekarang untuk menghitung jemaah
            const jemaahCount = card.querySelectorAll('.jemaah-item:not([data-id="jemaah-unknown"])').length;
            let jemaahBadge = header.querySelector('.kloter-count-badge');
            if (!jemaahBadge) {
                jemaahBadge = document.createElement('span');
                jemaahBadge.className = 'badge bg-secondary ms-2 kloter-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', jemaahBadge);
                }
            }
            jemaahBadge.textContent = jemaahCount;

            // Badge baru untuk menghitung rombongan, disisipkan sebelum badge jemaah
            const rombonganCount = card.querySelectorAll('.rombongan').length;
            let rombonganBadge = header.querySelector('.kloter-rombongan-count-badge');
            if (!rombonganBadge) {
                rombonganBadge = document.createElement('span');
                rombonganBadge.className = 'badge bg-secondary ms-2 kloter-rombongan-count-badge';
                if (jemaahBadge) {
                    jemaahBadge.insertAdjacentElement('beforebegin', rombonganBadge);
                }
            }
            rombonganBadge.textContent = rombonganCount;
        });

        // Total Manifest Count
        const totalManifestCountElement = document.getElementById('totalManifestCount');
        if (totalManifestCountElement) {
            const kloterContainer = document.getElementById('kloterCardContainer');
            if (kloterContainer) {
                // Count all jemaah items, excluding the "unknown" placeholder
                const count = kloterContainer.querySelectorAll('.jemaah-item:not([data-id="jemaah-unknown"])').length;
                totalManifestCountElement.textContent = count;
            }
        }
    };
    // Use a timeout to let the DOM update after a drag operation
    const debouncedUpdateAllCounts = () => setTimeout(updateAllCountsOnPage, 50);

    // --- JEMAAH ITEM NUMBERING ---
    const updateJemaahItemNumbering = (container) => {
        if (!container) return;
        const jemaahItems = container.querySelectorAll('.jemaah-item');

        // Jika ini adalah daftar jemaah utama, hapus nomor
        if (container.id === 'jemaahList') {
            jemaahItems.forEach(item => {
                const numberSpan = item.querySelector('.jemaah-number');
                if (numberSpan) {
                    numberSpan.remove();
                }
            });
        }
        // Jika ini adalah daftar di dalam regu, tambahkan/perbarui nomor
        else if (container.classList.contains('regu-content-area')) {
            jemaahItems.forEach((item, index) => {
                let numberSpan = item.querySelector('.jemaah-number');
                // Jika elemen nomor belum ada, buat dan sisipkan
                if (!numberSpan) {
                    numberSpan = document.createElement('span');
                    numberSpan.className = 'jemaah-number me-2';
                    const nameDiv = item.querySelector('.fw-bold');
                    if (nameDiv) {
                        nameDiv.prepend(numberSpan);
                    }
                }
                // Perbarui nomor urut
                numberSpan.textContent = `${index + 1}.`;
            });
        }
    };

    // --- SEARCH JEMAAH ---
    const cariJemaahInput = document.getElementById('cariJemaahInput');
    if (cariJemaahInput) {
        cariJemaahInput.addEventListener('input', () => {
            const searchTerm = cariJemaahInput.value.toLowerCase();
            // Filter dari jemaah yang tersedia, bukan dari data master
            const filteredData = availableJemaah.filter(jemaah =>
                jemaah.nama.toLowerCase().includes(searchTerm) ||
                jemaah.alamat.toLowerCase().includes(searchTerm)
            );
            renderJemaahList(filteredData);
        });
    }


    // --- SORTABLEJS INITIALIZATION ---

    // Inisialisasi untuk Jemaah Unknown (clone only)
    const jemaahUnknownContainer = document.getElementById('jemaahUnknownContainer');
    if (jemaahUnknownContainer) {
        new Sortable(jemaahUnknownContainer, {
            group: {
                name: 'jemaah-group',
                pull: 'clone', // Clone the item, don't move it
                put: false // Don't allow items to be dropped here
            },
            animation: 150,
            sort: false, // Disable sorting within this container
            ghostClass: 'sortable-ghost',
            forceFallback: true,
            handle: '.rounded-circle',
        });
    }

    // Inisialisasi untuk daftar jemaah utama
    const jemaahList = document.getElementById('jemaahList');
    if (jemaahList) {
        new Sortable(jemaahList, {
            group: {
                name: 'jemaah-group',
                pull: true,
                // Izinkan drop dari grup jemaah (untuk mengembalikan) dan grup regu (untuk menghapus)
                put: ['jemaah-group', 'shared-regu']
            },
            animation: 150,
            ghostClass: 'sortable-ghost',
            forceFallback: true,
            sort: false, // Tidak mengizinkan sorting di dalam daftar jemaah utama
            handle: '.rounded-circle',
            onAdd: function (evt) { // Item dropped INTO this list
                const item = evt.item;
                const fromList = evt.from;

                // Kasus 1: Sebuah card regu dijatuhkan ke sini untuk dihapus
                if (item.classList.contains('col-xl-3')) {
                    if (confirm('Apakah Anda yakin ingin menghapus regu ini? Semua jemaah di dalamnya akan dikembalikan ke daftar utama.')) {
                        returnJemaahToAvailableList(item);
                        item.remove(); // Hapus elemen regu dari DOM
                        reorderReguInContainer(fromList);
                        debouncedUpdateAllCounts();
                    } else {
                        // Batalkan: kembalikan kartu regu ke kontainer asalnya
                        fromList.appendChild(item);
                        reorderReguInContainer(fromList);
                    }
                    return; // Hentikan proses lebih lanjut
                }

                // Kasus 2: Sebuah item jemaah dijatuhkan (logika yang sudah ada)
                const itemEl = evt.item;
                const jemaahId = itemEl.dataset.id;

                if (jemaahId === 'jemaah-unknown') {
                    itemEl.remove(); // Ini adalah klon, hapus saja
                    return;
                }

                // Ini adalah jemaah asli, tambahkan kembali ke state
                const jemaah = jemaahData.find(j => j.id === jemaahId);
                if (jemaah && !availableJemaah.some(aj => aj.id === jemaahId)) {
                    availableJemaah.push(jemaah);
                }

                // Alih-alih me-render ulang seluruh daftar, kita ubah item yang ada.
                // Ini akan mempertahankan posisi drop.
                // 1. Hapus badge peran (karom/karu)
                delete itemEl.dataset.role;

                // 2. Hapus fungsionalitas Popover
                const popoverTriggerEl = itemEl.querySelector('[data-bs-toggle="popover"]');
                if (popoverTriggerEl) {
                    const popoverInstance = bootstrap.Popover.getInstance(popoverTriggerEl);
                    if (popoverInstance) {
                        popoverInstance.dispose();
                    }
                    // Hapus semua atribut data-bs-* yang terkait dengan popover
                    ['data-bs-toggle', 'data-bs-trigger', 'data-bs-placement', 'data-bs-html', 'data-bs-content', 'data-original-title', 'title'].forEach(attr => popoverTriggerEl.removeAttribute(attr));
                }



                // 2. Perbarui detail jemaah ke format lengkap
                const detailEl = itemEl.querySelector('small.text-muted');
                if (detailEl && jemaah) {
                    detailEl.innerHTML = `
                        ${jemaah.pendidikan} - ${jemaah.pekerjaan}<br>
                        ${jemaah.alamat}<br>
                        ${jemaah.desa_kec}
                    `;
                }
                const karomBtn = itemEl.querySelector('[data-action="karom"]');
                const karuBtn = itemEl.querySelector('[data-action="karu"]');
                if (karomBtn) karomBtn.classList.remove('disabled');
                if (karuBtn) karuBtn.classList.remove('disabled');

                // Sembunyikan item "Clear Set"
                const clearItems = itemEl.querySelectorAll('.clear-set-item');
                clearItems.forEach(item => item.style.display = 'none');




                const roleBadge = itemEl.querySelector('.jemaah-role-badge');
                if (roleBadge) roleBadge.remove();

                // 2. Hapus nomor urut
                const numberSpan = itemEl.querySelector('.jemaah-number');
                if (numberSpan) numberSpan.remove();

                // 3. Sembunyikan menu dropdown
                const menu = itemEl.querySelector('.jemaah-item-menu');
                if (menu) menu.style.display = 'none';

                // Jika ada filter pencarian aktif, item mungkin tidak seharusnya terlihat.
                // Kita periksa apakah item yang dikembalikan cocok dengan filter.
                const searchTerm = cariJemaahInput.value.toLowerCase();
                if (!jemaah.nama.toLowerCase().includes(searchTerm) && !jemaah.alamat.toLowerCase().includes(searchTerm)) {
                    itemEl.remove(); // Hapus dari DOM jika tidak cocok dengan filter
                }
                updateAvailableJemaahCount();
            },
            onRemove: function (evt) { // Item dragged OUT OF this list
                // Remove from state
                availableJemaah = availableJemaah.filter(j => j.id !== evt.item.dataset.id);
            }
        });
    }

    // Fungsi untuk membuat area konten regu menjadi dropzone
    const initJemaahDropzone = (container) => {
        if (container) {
            new Sortable(container, {
                group: {
                    name: 'jemaah-group',
                    pull: true,
                    put: function (to, from) {
                        return from.options.group.name === 'jemaah-group';
                    }
                },
                animation: 150,
                ghostClass: 'sortable-ghost',
                forceFallback: true,
                handle: '.rounded-circle',
                onAdd: (evt) => {
                    updateJemaahItemNumbering(evt.to);

                    // Tampilkan kembali menu dropdown saat item ditambahkan ke regu
                    const itemEl = evt.item;
                    const menu = itemEl.querySelector('.jemaah-item-menu');
                    if (menu) {
                        menu.style.display = ''; // Menghapus inline style 'display: none'
                    }

                    // Perbarui detail jemaah ke format ringkas (hanya desa_kec)
                    const jemaahId = itemEl.dataset.id;
                    const jemaah = jemaahData.find(j => j.id === jemaahId);
                    const detailEl = itemEl.querySelector('small.text-muted');
                    if (detailEl && jemaah) {
                        detailEl.innerHTML = jemaah.desa_kec;
                    }

                    // Tambahkan dan inisialisasi popover untuk item yang baru ditambahkan
                    const nameEl = itemEl.querySelector('.fw-bold');
                    if (nameEl && jemaah) {
                        const popoverContent = `
                            <div class='popover-body-custom'>
                                <div>${jemaah.pendidikan} - ${jemaah.pekerjaan}</div>
                                <div>${jemaah.alamat}</div>
                            </div>`;

                        nameEl.setAttribute('data-bs-toggle', 'popover');
                        nameEl.setAttribute('data-bs-trigger', 'hover focus');
                        nameEl.setAttribute('data-bs-placement', 'top');
                        nameEl.setAttribute('data-bs-html', 'true');
                        nameEl.setAttribute('data-bs-content', popoverContent);

                        // Inisialisasi popover yang baru ditambahkan
                        new bootstrap.Popover(nameEl);
                    }
                    debouncedUpdateAllCounts();
                },
                onRemove: (evt) => {
                    updateJemaahItemNumbering(evt.from);
                    debouncedUpdateAllCounts();
                },
                onUpdate: (evt) => {
                    updateJemaahItemNumbering(evt.from);
                    debouncedUpdateAllCounts();
                },
            });
        }
    };

    // Fungsi untuk menomori ulang kartu regu
    const reorderReguInContainer = (reguContainer) => {
        if (!reguContainer) return;

        // Find parent rombongan and its style
        const rombonganCard = reguContainer.closest('.card.rombongan');
        if (!rombonganCard) return; // Exit if not inside a rombongan
        const rombonganHeader = rombonganCard.querySelector('.card-header');
        const style = {
            bg: rombonganHeader.style.backgroundColor,
            text: rombonganHeader.style.color
        };

        const reguCards = reguContainer.querySelectorAll('.regu-card');
        reguCards.forEach((card, index) => {
            const header = card.querySelector('.card-header');
            if (header) {
                // Mengambil span di dalam header untuk diubah
                const titleSpan = header.querySelector('span');
                if (titleSpan) titleSpan.textContent = `Regu ${index + 1}`;

                // Apply style
                header.style.backgroundColor = style.bg;
                header.style.color = style.text;

                // Adjust button color
                const button = header.querySelector('.hapus-regu-btn');
                if (button) {
                    // The color from style is rgb() format, not hex.
                    if (style.text === 'rgb(255, 255, 255)') { // #FFFFFF
                        button.classList.remove('btn-outline-danger');
                        button.classList.add('btn-outline-light');
                    } else {
                        button.classList.remove('btn-outline-light');
                        button.classList.add('btn-outline-danger');
                    }
                }
            }
        });
    };

    const initSortableRegu = (container) => {
        if (container) {
            new Sortable(container, {
                group: 'shared-regu', // Nama grup yang sama memungkinkan perpindahan antar list
                animation: 150,
                draggable: '.col-xl-3', // Item yang bisa di-drag adalah kolomnya
                handle: '.card-header', // Geser hanya bisa dimulai dari header card
                ghostClass: 'sortable-ghost', // Class untuk placeholder saat item digeser
                forceFallback: true,
                onEnd: function (evt) {
                    // Menomori ulang kontainer tujuan
                    reorderReguInContainer(evt.to);

                    // Jika kartu dipindahkan dari kontainer yang berbeda, nomori ulang juga kontainer asal
                    if (evt.from !== evt.to) {
                        reorderReguInContainer(evt.from);
                    }
                    debouncedUpdateAllCounts();
                }
            });
        }
    };

    // Inisialisasi untuk semua kontainer regu yang sudah ada saat halaman dimuat
    document.querySelectorAll('.regu-container').forEach(initSortableRegu);
    // Inisialisasi untuk semua area konten regu yang sudah ada
    document.querySelectorAll('.regu-content-area').forEach(initJemaahDropzone);

    // Fungsi untuk menomori ulang kartu rombongan
    const reorderRombonganInContainer = (rombonganContainer) => {
        if (!rombonganContainer) return;
        const rombonganCards = rombonganContainer.querySelectorAll('.card.rombongan');
        rombonganCards.forEach((card, index) => {
            const header = card.querySelector('.card-header');
            if (header) {
                const rombonganNumber = index + 1;
                const titleSpan = header.querySelector('span');
                if (titleSpan) titleSpan.textContent = `Rombongan ${rombonganNumber}`;

                // Apply styles
                const styleIndex = (rombonganNumber - 1) % rombonganStyles.length;
                const style = rombonganStyles[styleIndex];
                header.style.backgroundColor = style.bg;
                header.style.color = style.text;

                const button = header.querySelector('.hapus-rombongan-btn');
                if (button) {
                    if (style.text === '#FFFFFF') {
                        button.classList.remove('btn-outline-danger');
                        button.classList.add('btn-outline-light');
                    } else {
                        button.classList.remove('btn-outline-light');
                        button.classList.add('btn-outline-danger');
                    }
                }

                // Apply the same style to child Regu cards
                const reguContainer = card.querySelector('.regu-container');
                if (reguContainer) {
                    reorderReguInContainer(reguContainer);
                }
            }
        });
    };

    const initSortableRombongan = (container) => {
        if (container) {
            new Sortable(container, {
                group: 'shared-rombongan', // Memungkinkan perpindahan antar kloter
                animation: 150,
                draggable: '.card.rombongan',
                handle: '.card-header',
                ghostClass: 'sortable-ghost',
                forceFallback: true,
                onEnd: function (evt) {
                    // Menomori ulang kontainer tujuan
                    reorderRombonganInContainer(evt.to);

                    // Jika kartu dipindahkan dari kloter yang berbeda, nomori ulang juga kontainer asal
                    if (evt.from !== evt.to) {
                        reorderRombonganInContainer(evt.from);
                    }
                    debouncedUpdateAllCounts();
                }
            });
        }
    };

    // Inisialisasi untuk semua kontainer rombongan yang sudah ada saat halaman dimuat
    document.querySelectorAll('.rombongan-card-container').forEach(container => {
        initSortableRombongan(container);
        reorderRombonganInContainer(container);
    });


    const kloterCardContainer = document.getElementById('kloterCardContainer');
    const tambahKloterBtn = document.getElementById('tambahKloterBtn');

    // --- KLOTER MANAGEMENT ---

    // Fungsi untuk menomori ulang kartu kloter
    const reorderKloterCards = () => {
        const kloterCards = kloterCardContainer.querySelectorAll('.card.kloter');
        kloterCards.forEach((card, index) => {
            const titleSpan = card.querySelector('.card-header span');
            if (titleSpan) {
                titleSpan.textContent = `Kloter ${index + 1}`;
            }
        });
    };

    // Function to create HTML for a new Kloter
    const createKloterElement = (kloterNum) => {
        const kloterDiv = document.createElement('div');
        kloterDiv.className = 'card kloter mb-4';
        kloterDiv.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="col">
                    <span>Kloter ${kloterNum}</span>
                    <span class="badge bg-warning ms-2 kloter-title-bagde">Untitle</span>
                </div>
                <div class="col-md-auto"></div>
                <div class="col col-lg-auto">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-sm btn-outline-secondary kloter-edit-btn"><i class="bi bi-pencil"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-secondary kloter-up-btn"><i class="bi bi-arrow-up"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-secondary kloter-down-btn"><i class="bi bi-arrow-down"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger kloter-hapus-btn"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="rombongan-card-container">
                    <!-- Rombongan cards will be added here -->
                </div>
                <div class="text-end mt-3">
                    <button class="btn btn-secondary btn-sm tambah-rombongan-btn" type="button">
                        <i class="bi bi-plus-circle"></i> Tambah Rombongan
                    </button>
                </div>
            </div>
        `;
        return kloterDiv;
    };

    // Function to create HTML for a new Rombongan
    const createRombonganElement = (rombonganNum) => {
        const rombonganDiv = document.createElement('div');
        rombonganDiv.className = 'card rombongan mb-3';
        rombonganDiv.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="col"><span>Rombongan ${rombonganNum}</span></div>
                <div class="col-md-auto"></div>
                <div class="col col-lg-auto">
                    <button class="btn btn-sm btn-outline-danger hapus-rombongan-btn"><i class="bi bi-trash"></i></button>
                </div>
            </div>
            <div class="card-body">
                <div class="row regu-container"></div>
                <div class="text-end mt-2">
                    <button class="btn btn-secondary btn-sm tambah-regu-btn"><i class="bi bi-plus-circle"></i> Tambah Regu</button>
                </div>
            </div>
        `;
        return rombonganDiv;
    };


    // Add new Kloter
    tambahKloterBtn.addEventListener('click', () => {
        const newKloterNum = kloterCardContainer.children.length + 1;
        const newKloter = createKloterElement(newKloterNum);
        kloterCardContainer.appendChild(newKloter);

        // Inisialisasi Sortable pada kontainer rombongan yang baru dibuat di kloter baru
        const newRombonganContainer = newKloter.querySelector('.rombongan-card-container');
        initSortableRombongan(newRombonganContainer);
        debouncedUpdateAllCounts();
    });

    // Function to create HTML for a new Regu
    const createReguElement = (reguNum) => {
        const reguCol = document.createElement('div');
        reguCol.className = 'col-xl-3 col-md-4 col-sm-6 mb-3';
        reguCol.innerHTML = `
            <div class="card regu-card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="col"><span>Regu ${reguNum}</span></div>
                    <div class="col-md-auto"></div>
                    <div class="col col-lg-auto">
                        <button class="btn btn-sm btn-outline-danger hapus-regu-btn"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <ul class="list-group list-group-flush regu-content-area" style="min-height: 70px;"></ul>
                </div>
            </div>
        `;
        return reguCol;
    };


    // --- EVENT DELEGATION FOR ROMBONGAN & REGU ---

    const setupKloterModalEl = document.getElementById('setupKloterModal');
    const setupKloterModal = new bootstrap.Modal(setupKloterModalEl);
    const saveKloterSetupBtn = document.getElementById('saveKloterSetupBtn');
    const kodeEmbarkasiInput = document.getElementById('kodeEmbarkasiInput');
    const noKloterInput = document.getElementById('noKloterInput');
    let currentEditingKloterCard = null;

    // Handler untuk tombol simpan di modal
    saveKloterSetupBtn.addEventListener('click', () => {
        if (currentEditingKloterCard) {
            const embarkasi = kodeEmbarkasiInput.value.trim().toUpperCase();
            const noKloter = noKloterInput.value.trim();

            if (embarkasi && noKloter) {
                const titleBadge = currentEditingKloterCard.querySelector('.kloter-title-bagde');
                if (titleBadge) {
                    titleBadge.textContent = `${embarkasi}-${noKloter}`;
                    titleBadge.classList.remove('bg-warning');
                    titleBadge.classList.add('bg-primary');
                }
                setupKloterModal.hide();
            } else {
                alert('Kode Embarkasi dan No. Kloter harus diisi.');
            }
        }
    });

    // Reset form saat modal ditutup
    setupKloterModalEl.addEventListener('hidden.bs.modal', () => {
        currentEditingKloterCard = null;
        document.getElementById('setupKloterForm').reset();
    });

    kloterCardContainer.addEventListener('click', function (e) {
        // Handle Kloter Edit
        const editBtn = e.target.closest('.kloter-edit-btn');
        if (editBtn) {
            currentEditingKloterCard = editBtn.closest('.card.kloter');
            setupKloterModal.show();
            return;
        }

        // Handle Hapus Kloter
        const hapusKloterBtn = e.target.closest('.kloter-hapus-btn');
        if (hapusKloterBtn) {
            if (kloterCardContainer.children.length > 1) {
                const kloterCard = hapusKloterBtn.closest('.card.kloter');
                // Add confirmation dialog before deleting
                if (kloterCard && confirm('Apakah Anda yakin ingin menghapus kloter ini? Semua rombongan dan regu di dalamnya akan ikut terhapus.')) {
                    // Kembalikan semua jemaah di dalam kloter ini ke daftar utama
                    returnJemaahToAvailableList(kloterCard);
                    kloterCard.remove();
                    reorderKloterCards();
                    debouncedUpdateAllCounts();
                }
            } else {
                alert('Minimal harus ada satu kloter.');
            }
            return;
        }

        // Handle Kloter Up
        const upBtn = e.target.closest('.kloter-up-btn');
        if (upBtn) {
            const kloterCard = upBtn.closest('.card.kloter');
            const prevKloter = kloterCard.previousElementSibling;
            if (prevKloter) {
                kloterCardContainer.insertBefore(kloterCard, prevKloter);
                reorderKloterCards();
            }
        }

        // Handle Kloter Down
        const downBtn = e.target.closest('.kloter-down-btn');
        if (downBtn) {
            const kloterCard = downBtn.closest('.card.kloter');
            const nextKloter = kloterCard.nextElementSibling;
            if (nextKloter) {
                // Memasukkan elemen berikutnya sebelum elemen saat ini, secara efektif memindahkannya ke bawah
                kloterCardContainer.insertBefore(nextKloter, kloterCard);
                reorderKloterCards();
            }
        }

        // Handle "Tambah Rombongan"
        const tambahRombonganBtn = e.target.closest('.tambah-rombongan-btn');
        if (tambahRombonganBtn) {
            const rombonganContainer = tambahRombonganBtn.closest('.card-body').querySelector('.rombongan-card-container');
            const rombonganCount = rombonganContainer.children.length + 1;
            const newRombonganCard = createRombonganElement(rombonganCount);

            rombonganContainer.appendChild(newRombonganCard);

            // Inisialisasi Sortable pada kontainer regu yang baru dibuat
            const newReguContainer = newRombonganCard.querySelector('.regu-container');
            initSortableRegu(newReguContainer);
            // Panggil reorder untuk menerapkan nomor dan style
            reorderRombonganInContainer(rombonganContainer);
            debouncedUpdateAllCounts();
        }

        // Handle "Hapus Rombongan"
        const hapusRombonganBtn = e.target.closest('.hapus-rombongan-btn');
        if (hapusRombonganBtn) {
            const rombonganCard = hapusRombonganBtn.closest('.card.rombongan');
            // Add confirmation dialog before deleting
            if (rombonganCard && confirm('Apakah Anda yakin ingin menghapus rombongan ini? Semua regu di dalamnya akan ikut terhapus.')) {
                const rombonganContainer = rombonganCard.parentElement;
                // Kembalikan semua jemaah di dalam rombongan ini ke daftar utama
                returnJemaahToAvailableList(rombonganCard);
                rombonganCard.remove();
                reorderRombonganInContainer(rombonganContainer);
                debouncedUpdateAllCounts();
            }
        }

        // Handle "Tambah Regu"
        const tambahReguBtn = e.target.closest('.tambah-regu-btn');
        if (tambahReguBtn) {
            const reguContainer = tambahReguBtn.closest('.card-body').querySelector('.regu-container');
            const reguCount = reguContainer.children.length + 1;
            const newReguCol = createReguElement(reguCount);
            reguContainer.appendChild(newReguCol);

            // Inisialisasi dropzone untuk regu yang baru dibuat
            const newReguContentArea = newReguCol.querySelector('.regu-content-area');
            initJemaahDropzone(newReguContentArea);
            reorderReguInContainer(reguContainer);
            debouncedUpdateAllCounts();
        }

        // Handle "Hapus Regu"
        const hapusReguBtn = e.target.closest('.hapus-regu-btn');
        if (hapusReguBtn) {
            const reguCol = hapusReguBtn.closest('.col-xl-3, .col-md-4, .col-sm-6');
            // Add confirmation dialog before deleting
            if (reguCol && confirm('Apakah Anda yakin ingin menghapus regu ini?')) {
                const reguContainer = reguCol.parentElement;
                // Kembalikan semua jemaah di dalam regu ini ke daftar utama
                returnJemaahToAvailableList(reguCol);
                reguCol.remove();
                reorderReguInContainer(reguContainer);
                debouncedUpdateAllCounts();
            }
        }

        // Handle Jemaah Item Dropdown Actions
        const jemaahActionBtn = e.target.closest('.jemaah-action-btn');
        if (jemaahActionBtn) {
            e.preventDefault();
            const action = jemaahActionBtn.dataset.action;
            const jemaahItem = jemaahActionBtn.closest('.jemaah-item');
            const jemaahId = jemaahItem.dataset.id;

            const currentRole = jemaahItem.dataset.role;

            if (action === 'karom' || action === 'karu') {
                if (currentRole === action) return; // Do nothing if role is already set

                // Update view
                // 0. Update data-role attribute
                jemaahItem.dataset.role = action;
                // 1. Remove existing role badge
                const existingRoleBadge = jemaahItem.querySelector('.jemaah-role-badge');
                if (existingRoleBadge) existingRoleBadge.remove();

                // 2. Add new role badge
                const statusBadge = jemaahItem.querySelector('.badge.bg-success');
                if (statusBadge) {
                    const newBadge = document.createElement('span');
                    newBadge.className = `badge ms-1 jemaah-role-badge ${action === 'karom' ? 'bg-primary' : 'bg-warning text-dark'}`;
                    newBadge.textContent = action.charAt(0).toUpperCase() + action.slice(1);
                    statusBadge.insertAdjacentElement('afterend', newBadge);
                }

                // 3. Update dropdown disabled states
                const karomBtn = jemaahItem.querySelector('[data-action="karom"]');
                const karuBtn = jemaahItem.querySelector('[data-action="karu"]');
                if (karomBtn) karomBtn.classList.toggle('disabled', action === 'karom');
                if (karuBtn) karuBtn.classList.toggle('disabled', action === 'karu');

                // 4. Show "Clear Set" option
                const clearItems = jemaahItem.querySelectorAll('.clear-set-item');
                clearItems.forEach(item => item.style.display = 'list-item');

            } else if (action === 'clear') {
                if (!currentRole) return;

                // Update view
                delete jemaahItem.dataset.role;
                // 1. Remove role badge
                const existingRoleBadge = jemaahItem.querySelector('.jemaah-role-badge');
                if (existingRoleBadge) existingRoleBadge.remove();

                // 2. Enable Set Karom/Karu buttons
                const karomBtn = jemaahItem.querySelector('[data-action="karom"]');
                const karuBtn = jemaahItem.querySelector('[data-action="karu"]');
                if (karomBtn) karomBtn.classList.remove('disabled');
                if (karuBtn) karuBtn.classList.remove('disabled');

                // 3. Hide "Clear Set" items
                const clearItems = jemaahItem.querySelectorAll('.clear-set-item');
                clearItems.forEach(item => item.style.display = 'none');

            } else if (action === 'remove') {
                // If it's a "Jemaah Unknown" clone, just remove it.
                if (jemaahId === 'jemaah-unknown') {
                    jemaahItem.remove();
                    debouncedUpdateAllCounts();
                    return;
                }

                // If it's a real jemaah, move it back to the main list.
                const jemaah = jemaahData.find(j => j.id === jemaahId);
                if (jemaah) {
                    if (!availableJemaah.some(aj => aj.id === jemaahId)) {
                        availableJemaah.push(jemaah);
                    }
                }

                jemaahItem.remove(); // Remove from the regu list
                cariJemaahInput.dispatchEvent(new Event('input')); // Re-render the main list
                updateAvailableJemaahCount();
                debouncedUpdateAllCounts();
            }
        }
    });

    // --- INITIAL RENDER ---
    // Hapus konten statis dan render dari data manifest
    if (dataManifest && Array.isArray(dataManifest) && dataManifest.length > 0) {
        renderManifest(dataManifest);
    }

});

// --- THEME SWITCHER ---
(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return 'auto' // Set 'auto' as the default theme
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme) => {
        const themeSwitcher = document.querySelector('#themeDropdown')
        if (!themeSwitcher) return

        const activeThemeIcon = themeSwitcher.querySelector('i')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const iconOfActiveBtn = btnToActive.querySelector('i').className

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => element.classList.remove('active'))

        btnToActive.classList.add('active')
        activeThemeIcon.className = iconOfActiveBtn
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())
        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.getAttribute('data-bs-theme-value')
                setStoredTheme(theme)
                setTheme(theme)
                showActiveTheme(theme)
            })
        })
    })
})()