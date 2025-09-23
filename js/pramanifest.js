document.addEventListener('DOMContentLoaded', function () {
    // --- JEMAAH LIST MANAGEMENT ---

    // Data ini mensimulasikan respons dari API JSON.
    // Nanti, Anda bisa mengganti bagian ini dengan `fetch()` ke API sebenarnya.
    const jemaahData = [
        {
            id: "jemaah-1",
            nama: "Ahmad Subarjo",
            alamat: "Jl. Merdeka No. 1, Jakarta",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-2",
            nama: "Budi Santoso",
            alamat: "Jl. Pahlawan No. 10, Surabaya",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-3",
            nama: "Citra Lestari",
            alamat: "Jl. Kenanga No. 5, Bandung",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-4",
            nama: "Dewi Anggraini",
            alamat: "Jl. Mawar No. 22, Yogyakarta",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-5",
            nama: "Eko Prasetyo",
            alamat: "Jl. Sudirman Kav. 5, Semarang",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-6",
            nama: "Fajar Nugroho",
            alamat: "Jl. Gatot Subroto No. 15, Medan",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-7",
            nama: "Gita Permata",
            alamat: "Jl. Diponegoro No. 8, Makassar",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-8",
            nama: "Hadi Wibowo",
            alamat: "Jl. Imam Bonjol No. 3, Palembang",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-9",
            nama: "Indah Sari",
            alamat: "Jl. Ahmad Yani No. 12, Denpasar",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-10",
            nama: "Joko Susilo",
            alamat: "Jl. Teuku Umar No. 7, Balikpapan",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-11",
            nama: "Kartika Dewi",
            alamat: "Jl. Gajah Mada No. 9, Pontianak",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-12",
            nama: "Lukman Hakim",
            alamat: "Jl. Pangeran Antasari No. 2, Banjarmasin",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-13",
            nama: "Maya Anggraini",
            alamat: "Jl. Sam Ratulangi No. 11, Manado",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-14",
            nama: "Nanda Pratama",
            alamat: "Jl. Wolter Monginsidi No. 5, Jayapura",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-15",
            nama: "Olivia Putri",
            alamat: "Jl. Pattimura No. 1, Ambon",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        },
        {
            id: "jemaah-16",
            nama: "Putra Wijaya",
            alamat: "Jl. Sudirman No. 101, Pekanbaru",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "L"
        },
        {
            id: "jemaah-17",
            nama: "Rina Marlina",
            alamat: "Jl. Kartini No. 21, Bandar Lampung",
            foto: "img/foto.jpg",
            status: "Aktif",
            gender: "P"
        }
    ];

    // Buat salinan data jemaah yang bisa diubah untuk mengelola state jemaah yang tersedia
    let availableJemaah = [...jemaahData];

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
                    <span class="badge bg-success mb-1">${jemaah.status}</span>
                    <div class="fw-bold">${jemaah.nama} <i class="bi ${jemaah.gender === 'L' ? 'bi-gender-male text-primary' : 'bi-gender-female text-danger'}"></i></div>
                    <small class="text-muted">${jemaah.alamat}</small>
                </div>
            `;
            fragment.appendChild(listItem);
        });
        jemaahListContainer.appendChild(fragment);
    };

    // Panggil fungsi untuk memuat daftar jemaah saat halaman dimuat
    renderJemaahList(availableJemaah);

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
        }
    };

    // --- COUNTERS ---
    const updateAllCountsOnPage = () => {
        // Regu Counts
        document.querySelectorAll('.regu-card > .card-header').forEach(header => {
            const card = header.closest('.regu-card');
            const count = card.querySelectorAll('.jemaah-item').length;
            const titleSpan = header.querySelector('span');
            let badge = header.querySelector('.regu-count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-info text-dark ms-2 regu-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', badge);
                }
            }
            badge.textContent = count;
        });

        // Rombongan Counts
        document.querySelectorAll('.rombongan > .card-header').forEach(header => {
            const card = header.closest('.rombongan');
            const count = card.querySelectorAll('.jemaah-item').length;
            const titleSpan = header.querySelector('span');
            let badge = header.querySelector('.rombongan-count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-secondary ms-2 rombongan-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', badge);
                }
            }
            badge.textContent = count;
        });

        // Kloter Counts
        document.querySelectorAll('.kloter > .card-header').forEach(header => {
            const card = header.closest('.kloter');
            const count = card.querySelectorAll('.jemaah-item').length;
            const titleSpan = header.querySelector('span');
            let badge = header.querySelector('.kloter-count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-primary ms-2 kloter-count-badge';
                if (titleSpan) {
                    titleSpan.insertAdjacentElement('afterend', badge);
                }
            }
            badge.textContent = count;
        });
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
        });
    }

    // Inisialisasi untuk daftar jemaah utama
    const jemaahList = document.getElementById('jemaahList');
    if (jemaahList) {
        new Sortable(jemaahList, {
            group: {
                name: 'jemaah-group',
                pull: true,
                put: true
            },
            animation: 150,
            ghostClass: 'sortable-ghost',
            forceFallback: true,
            sort: false, // Tidak mengizinkan sorting di dalam daftar jemaah utama
            onAdd: function (evt) { // Item dropped INTO this list
                const jemaahId = evt.item.dataset.id;
                if (jemaahId === 'jemaah-unknown') {
                    evt.item.remove(); // It's a clone, just remove it
                    return;
                }
                // It's a real jemaah, add back to state
                const jemaah = jemaahData.find(j => j.id === jemaahId);
                if (jemaah && !availableJemaah.some(aj => aj.id === jemaahId)) {
                    availableJemaah.push(jemaah);
                }
                // Re-render the list to respect search filter
                cariJemaahInput.dispatchEvent(new Event('input'));
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
                onAdd: (evt) => {
                    updateJemaahItemNumbering(evt.to);
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
        const reguCards = reguContainer.querySelectorAll('.col-xl-3');
        reguCards.forEach((card, index) => {
            const header = card.querySelector('.card-header');
            if (header) {
                // Mengambil span di dalam header untuk diubah
                const titleSpan = header.querySelector('span');
                if (titleSpan) titleSpan.textContent = `Regu ${index + 1}`;
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
                const titleSpan = header.querySelector('span');
                if (titleSpan) titleSpan.textContent = `Rombongan ${index + 1}`;
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
    document.querySelectorAll('.rombongan-card-container').forEach(initSortableRombongan);


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
                <span>Kloter ${kloterNum}</span>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-secondary kloter-edit-btn"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-secondary kloter-up-btn"><i class="bi bi-arrow-up"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-secondary kloter-down-btn"><i class="bi bi-arrow-down"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger kloter-hapus-btn"><i class="bi bi-trash"></i></button>
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


    // --- EVENT DELEGATION FOR ROMBONGAN & REGU ---

    kloterCardContainer.addEventListener('click', function (e) {
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

            const newRombonganCard = document.createElement('div');
            newRombonganCard.className = 'card rombongan mb-3';
            newRombonganCard.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>Rombongan ${rombonganCount}</span>
                    <button class="btn btn-sm btn-outline-danger hapus-rombongan-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="card-body">
                    <div class="row regu-container">
                        <!-- Regu cards will be added here -->
                    </div>
                    <div class="text-end mt-2">
                        <button class="btn btn-secondary btn-sm tambah-regu-btn">
                            <i class="bi bi-plus-circle"></i> Tambah Regu
                        </button>
                    </div>
                </div>
            `;
            rombonganContainer.appendChild(newRombonganCard);

            // Inisialisasi Sortable pada kontainer regu yang baru dibuat
            const newReguContainer = newRombonganCard.querySelector('.regu-container');
            initSortableRegu(newReguContainer);
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

            const newReguCol = document.createElement('div');
            newReguCol.className = 'col-xl-3 col-md-4 col-sm-6 mb-3';
            newReguCol.innerHTML = `
                <div class="card regu-card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>Regu ${reguCount}</span>
                        <button class="btn btn-sm btn-outline-danger hapus-regu-btn">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                    <div class="card-body p-0"><ul class="list-group list-group-flush regu-content-area" style="min-height: 70px;"></ul></div>
                </div>
            `;
            reguContainer.appendChild(newReguCol);

            // Inisialisasi dropzone untuk regu yang baru dibuat
            const newReguContentArea = newReguCol.querySelector('.regu-content-area');
            initJemaahDropzone(newReguContentArea);
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
    });

    updateAllCountsOnPage();
});