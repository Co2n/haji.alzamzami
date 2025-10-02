document.addEventListener('DOMContentLoaded', async function () {
    const selectTahunEl = document.getElementById('selectTahun');
    const selectVersiEl = document.getElementById('selectVersi');
    const loadingContainer = document.getElementById('loading-container');
    const progressBar = document.getElementById('loading-progress-bar');
    const kloterCardContainer = document.getElementById('kloterCardContainer');
    const tambahKloterBtn = document.getElementById('tambahKloterBtn');
    const cariJemaahInput = document.getElementById('cariJemaahInput');
    const kontakModalEl = document.getElementById('kontakModal');
    const kontakModalTitle = document.querySelector('#kontakModal .modal-title');
    const kontakWhatsappJemaahLink = document.getElementById('kontakWhatsappJemaah');
    const kontakWhatsappKeluargaLink = document.getElementById('kontakWhatsappKeluarga');
    const kontakKosongJemaahLink = document.getElementById('kosongKontak');
    const screenBlocker = document.getElementById('screenBlocker');
    let jemaahData = []; // Store jemaah data globally within the scope
    let availableJemaah = []; // Store available jemaah globally

    // --- PROGRESS BAR UTILITIES ---
    const showProgressBar = () => {
        if (loadingContainer) loadingContainer.style.display = 'block';
    };
    const hideProgressBar = () => {
        if (loadingContainer) loadingContainer.style.display = 'none';
    };
    const updateProgressBar = (percentage) => {
        if (progressBar) progressBar.style.width = `${percentage}%`;
    };

    // --- SCREEN BLOCKER UTILITIES ---
    const showBlocker = () => {
        if (screenBlocker) screenBlocker.style.display = 'flex';
    };
    const hideBlocker = () => {
        if (screenBlocker) screenBlocker.style.display = 'none';
    };

    // --- DATA FETCHING ---
    async function fetchGenericData(url, params) {
        try {
            const fullUrl = new URL(url);
            Object.keys(params).forEach(key => fullUrl.searchParams.append(key, params[key]));

            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            // Handle jika API mengembalikan format { "data": [...] }
            if (data && typeof data === 'object' && data.data) {
                data = data.data;
            }
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(`Could not fetch data from ${url}:`, error);
            return []; // Return empty array on error
        }
    }

    async function fetchJemaahData(musim) {
        const allData = await fetchGenericData('https://script.google.com/macros/s/AKfycbwrSDFc9p7zKLBIQaegqkaGMOrjlcU4bOHNtCezNKL0B3tAD-rygOnVv4jQ_J9a-bM/exec', { musim });
        // Gunakan '==' untuk perbandingan longgar (string vs number) atau konversi keduanya
        const seasonData = allData.find(d => d.musim == musim);
        const jemaahList = seasonData ? seasonData.jemaah : [];
        // Normalisasi: pastikan semua ID jemaah adalah string
        return jemaahList.map(j => ({ ...j, id: String(j.id) }));
    }

    async function fetchManifestData(musim, versi) {
        const allData = await fetchGenericData('https://script.google.com/macros/s/AKfycbz6JYHcF11bZm2-2XM1HXr2aCABe5XYgOs9PM6eALw1qb7fyII3eTv7Sovn1bbRlMwvnw/exec', { musim, versi });
        // Gunakan '==' untuk perbandingan longgar (string vs number)
        const seasonData = allData.find(d => d.musim == musim && d.versi === versi);
        return seasonData ? seasonData.manifest : [];
    }

    // --- MAIN APP LOGIC ---
    async function loadAndInitialize() {
        showBlocker();
        showProgressBar();
        updateProgressBar(10); // Mulai loading
        try {
            const selectedMusim = selectTahunEl.value;
            const selectedVersi = selectVersiEl.value;

            jemaahData = await fetchJemaahData(selectedMusim); // Assign to the outer scope variable
            updateProgressBar(50); // Setengah jalan setelah fetch pertama

            const dataManifest = await fetchManifestData(selectedMusim, selectedVersi);
            updateProgressBar(90); // Hampir selesai setelah fetch kedua

            initializeApp(jemaahData, dataManifest);
            updateProgressBar(100); // Selesai
        } catch (error) {
            console.error("Gagal memuat data:", error);
        } finally {
            // Sembunyikan progress bar setelah sedikit jeda agar terlihat selesai
            setTimeout(() => {
                hideBlocker();
                hideProgressBar();
                updateProgressBar(0); // Reset untuk pemanggilan berikutnya
            }, 500);
        }
    }

    function cleanup() {
        // Hancurkan semua instance Popover yang ada
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(popoverTriggerEl => {
            const popover = bootstrap.Popover.getInstance(popoverTriggerEl);
            if (popover) popover.dispose();
        });
    }

    async function populateVersiDropdown() {
        const selectedMusim = selectTahunEl.value;
        selectVersiEl.innerHTML = ''; // Kosongkan opsi sebelumnya

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbz6JYHcF11bZm2-2XM1HXr2aCABe5XYgOs9PM6eALw1qb7fyII3eTv7Sovn1bbRlMwvnw/exec?musim=' + selectedMusim);
            if (!response.ok) throw new Error('Failed to fetch manifest versions');
            const allData = await response.json();

            // Pastikan kita bekerja dengan array, bahkan jika API mengembalikan { "data": [...] }
            const dataArray = (allData && allData.data && Array.isArray(allData.data)) ? allData.data : (Array.isArray(allData) ? allData : []);

            // Filter versi berdasarkan musim yang dipilih
            const versions = dataArray.filter(d => String(d.musim) === selectedMusim);

            // Urutkan versi berdasarkan timestamp, dari yang terbaru ke yang terlama
            versions.sort((a, b) => b.timestamp - a.timestamp);

            if (versions.length > 0) {
                versions.forEach((v, index) => {
                    const option = new Option(v.versi, v.versi);
                    if (index === 0) {
                        option.selected = true; // Pilih opsi pertama (yang terbaru) secara default
                    }
                    selectVersiEl.add(option);
                });
            } else {
                selectVersiEl.add(new Option('Tidak ada versi', ''));
            }
        } catch (error) {
            console.error("Gagal memuat versi manifest:", error);
            selectVersiEl.add(new Option('Error', ''));
        }
    }

    function initializeApp(currentJemaahData, dataManifest) {
        // Lakukan pembersihan sebelum render ulang
        cleanup();
        // --- DATA VALIDATION ---


        if (!dataManifest || !Array.isArray(dataManifest) || dataManifest.length === 0) {
            console.warn("dataManifest bernilai null, kosong, atau bukan sebuah array. Inisialisasi manifest akan dilewati.");
            // Kosongkan kontainer kloter jika tidak ada data
            const kloterContainer = document.getElementById('kloterCardContainer');
            if (kloterContainer) kloterContainer.innerHTML = `
            <div class="card kloter mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="col">
                        <span>Kloter 1</span>
                        <span class="badge ms-2 kloter-title-bagde text-bg-warning">Belum ada kode embarkasi dan kloter -></span>
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
                    <button class="btn btn-secondary btn-sm tambah-rombongan-btn" type="button">
                        <i class="bi bi-plus-circle"></i> Tambah Rombongan
                    </button>
                </div>
            </div>
        `;
        }

        // Update total jemaah count on the dashboard card
        const totalJemaahCountElement = document.getElementById('totalJemaahCount');
        if (totalJemaahCountElement) {
            totalJemaahCountElement.textContent = currentJemaahData.length;
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
                badge.textContent = availableCount + ' tersedia';
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
                const fotoSrc = jemaah.foto ? `https://drive.google.com/thumbnail?id=${jemaah.foto}&sz=s400` : 'img/foto.jpg';

                listItem.innerHTML = `
                <img src="${fotoSrc}" height="60px" width="50px" class="rounded img-fluid me-3 zona-foto" alt="Foto ${jemaah.nama}">
                <div>
                    <span class="badge bg-secondary mb-1" data-bs-toggle="modal" data-bs-target="#kontakModal" style="cursor: pointer;">${jemaah.status}</span>
                    <div class="fw-bold">${jemaah.nama} <i class="bi ${jemaah.gender === 'L' ? 'bi-gender-male text-primary' : 'bi-gender-female text-danger'}"></i></div>
                    <small class="text-muted">
                        ${jemaah.pendidikan} - ${jemaah.pekerjaan}<br>
                        ${jemaah.alamat}<br>
                        ${jemaah.desa} - ${jemaah.kecamatan}
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
        availableJemaah = currentJemaahData.filter(j => !placedJemaahIds.has(j.id));


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

                const jemaah = currentJemaahData.find(j => j.id === jemaahId);
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
            // Normalisasi: pastikan jemaahId selalu string
            const jemaahId = String(typeof jemaahObj === 'string' ? jemaahObj : jemaahObj.id);
            const role = typeof jemaahObj === 'object' ? jemaahObj.role : null;
            // Cari menggunakan jemaahId yang sudah pasti string
            const jemaah = currentJemaahData.find(j => j.id === jemaahId);
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex align-items-center jemaah-item';
            listItem.dataset.id = jemaahId;

            // console.log(currentJemaahData.map(j => j.id)); // Log semua ID jemaah yang ada
            //console.log("Membuat elemen jemaah untuk ID:", jemaahId);
            //console.log("data jemaah:", jemaah);

            if (role) listItem.dataset.role = role;
            if (jemaahId === 'jemaah-unknown') {
                listItem.innerHTML = `
                <img src="img/unknown.jpg" height="50px" width="50px" class="rounded img-fluid me-3 zona-foto" alt="Foto Jemaah Unknown">
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
            const fotoSrc = jemaah.foto ? `https://drive.google.com/thumbnail?id=${jemaah.foto}&sz=s400` : 'img/foto.jpg';
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
                <div>${jemaah.no_porsi}</div>
                <div>${jemaah.pendidikan} - ${jemaah.pekerjaan}</div>
                <div>${jemaah.alamat}</div>
            </div>`;

            listItem.innerHTML = `
            <img src="${fotoSrc}" height="60px" width="50px" class="rounded me-3 img-fluid zona-foto" alt="Foto ${jemaah.nama}">
            <div>
                <span class="badge bg-secondary mb-1" data-bs-toggle="modal" data-bs-target="#kontakModal" style="cursor: pointer;">${jemaah.status}</span>${roleBadgeHTML}
                <div class="fw-bold" 
                     data-bs-toggle="popover" 
                     data-bs-trigger="hover" 
                     data-bs-placement="top" 
                     data-bs-html="true" 
                     data-bs-content="${popoverContent}">
                     ${jemaah.nama} 
                     <i class="bi ${jemaah.gender === 'L' ? 'bi-gender-male text-primary' : 'bi-gender-female text-danger'}"></i>
                </div>
                <small class="text-muted">${jemaah.desa} - ${jemaah.kecamatan}</small>
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
            // console.log("Merender manifest dengan data:", manifestData);
            const kloterContainer = document.getElementById('kloterCardContainer');
            kloterContainer.innerHTML = ''; // Kosongkan kontainer

            manifestData.forEach((kloter, kloterIndex) => {
                const kloterEl = createKloterElement(kloterIndex + 1);
                const titleBadge = kloterEl.querySelector('.kloter-title-bagde');
                if (kloter.kodeEmbarkasi && kloter.noKloter) {
                    titleBadge.textContent = `${kloter.kodeEmbarkasi}-${kloter.noKloter}`;
                    titleBadge.classList.remove('text-bg-warning');
                    titleBadge.classList.add('text-bg-primary');
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
                            // console.log("Menambahkan jemaah ke regu:", jemaahObj, jemaahEl);
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
                badge.textContent = count + '  Org';
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
                jemaahBadge.textContent = jemaahCount + ' jemaah';

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
                reguBadge.textContent = reguCount + ' regu';
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
                jemaahBadge.textContent = jemaahCount + ' jemaah';

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
                rombonganBadge.textContent = rombonganCount + ' rombongan';
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
                const rawSearchTerm = cariJemaahInput.value.toLowerCase();
                let filteredData;

                if (rawSearchTerm.includes(':')) {
                    const parts = rawSearchTerm.split(':');
                    const key = parts[0].trim();
                    const valueString = parts[1].trim();

                    if (key && valueString) {
                        // Pisahkan nilai pencarian berdasarkan koma, trim spasi, dan hapus entri kosong
                        const searchValues = valueString.split(',').map(v => v.trim()).filter(v => v);

                        if (searchValues.length > 0) {
                            filteredData = availableJemaah.filter(jemaah => {
                                // Pastikan properti ada di objek jemaah dan bukan null/undefined
                                if (jemaah.hasOwnProperty(key) && jemaah[key] != null) {
                                    const jemaahValue = String(jemaah[key]).toLowerCase();
                                    // Kembalikan true jika salah satu dari searchValues cocok
                                    return searchValues.some(searchValue => jemaahValue.includes(searchValue));
                                }
                                return false;
                            });
                        } else {
                            filteredData = availableJemaah; // Jika value kosong (misal: "desa:,"), tampilkan semua
                        }
                    } else {
                        // Jika formatnya tidak benar (misal, "desa:"), tampilkan semua
                        filteredData = availableJemaah;
                    }
                } else {
                    // Logika pencarian global (seperti sebelumnya) jika tidak ada ':'
                    filteredData = availableJemaah.filter(jemaah =>
                        jemaah.nama.toLowerCase().includes(rawSearchTerm) ||
                        (jemaah.status && jemaah.status.toLowerCase().includes(rawSearchTerm)) ||
                        (jemaah.pekerjaan && jemaah.pekerjaan.toLowerCase().includes(rawSearchTerm)) ||
                        (jemaah.pendidikan && jemaah.pendidikan.toLowerCase().includes(rawSearchTerm)) ||
                        (jemaah.desa && jemaah.desa.toLowerCase().includes(rawSearchTerm)) ||
                        (jemaah.kecamatan && jemaah.kecamatan.toLowerCase().includes(rawSearchTerm))
                    );
                }
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
                handle: '.zona-foto',
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
                handle: '.zona-foto',
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
                    const jemaah = currentJemaahData.find(j => j.id === jemaahId);
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
                        ${jemaah.desa} - ${jemaah.kecamatan}
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
                    updateAvailableJemaahCount();
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
                    handle: '.zona-foto',
                    onAdd: (evt) => {
                        updateJemaahItemNumbering(evt.to);

                        // Tampilkan kembali menu dropdown saat item ditambahkan ke regu
                        const itemEl = evt.item;
                        const menu = itemEl.querySelector('.jemaah-item-menu');
                        if (menu) {
                            menu.style.display = ''; // Menghapus inline style 'display: none'
                        }

                        // Perbarui detail jemaah ke format ringkas (hanya desa - kecamatan)
                        const jemaahId = itemEl.dataset.id;
                        const jemaah = currentJemaahData.find(j => j.id === jemaahId);
                        const detailEl = itemEl.querySelector('small.text-muted');
                        if (detailEl && jemaah) {
                            detailEl.innerHTML = `${jemaah.desa} - ${jemaah.kecamatan}`;
                        }

                        // Tambahkan dan inisialisasi popover untuk item yang baru ditambahkan
                        const nameEl = itemEl.querySelector('.fw-bold');
                        if (nameEl && jemaah) {
                            const popoverContent = `
                            <div class='popover-body-custom'>
                                <div>${jemaah.no_porsi}</div>
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

                    // Style the "Tambah Regu" button
                    const tambahReguBtn = card.querySelector('.tambah-regu-btn');
                    if (tambahReguBtn) {
                        tambahReguBtn.style.backgroundColor = style.bg;
                        tambahReguBtn.style.color = style.text;
                        tambahReguBtn.style.borderColor = style.text; // Optional: style the border as well
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
            kloterDiv.className = 'kloterCardContainer';
            // kloterDiv.className = 'card kloter mb-4';
            kloterDiv.innerHTML = `
            <div class="card kloter mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="col">
                        <span>Kloter ${kloterNum}</span>
                        <span class="badge ms-2 kloter-title-bagde text-bg-warning">Belum ada kode embarkasi dan kloter -></span>
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
                <button class="btn btn-secondary btn-sm tambah-regu-btn"><i class="bi bi-plus-circle"></i> Tambah Regu</button>
            </div>
        `;
            return rombonganDiv;
        };

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

        const kodeEmbarkasiInput = document.getElementById('kodeEmbarkasiInput');
        const noKloterInput = document.getElementById('noKloterInput');
        let currentEditingKloterCard = null;

        // Handler untuk tombol simpan di modal
        saveKloterSetupBtn.addEventListener('click', () => {
            if (currentEditingKloterCard) {
                const setupKloterModalEl = document.getElementById('setupKloterModal');
                const setupKloterModal = bootstrap.Modal.getInstance(setupKloterModalEl);

                const embarkasi = kodeEmbarkasiInput.value.trim().toUpperCase();
                const noKloter = noKloterInput.value.trim();

                if (embarkasi && noKloter) {
                    const titleBadge = currentEditingKloterCard.querySelector('.kloter-title-bagde');
                    if (titleBadge) {
                        titleBadge.textContent = `${embarkasi}-${noKloter}`;
                        titleBadge.classList.remove('text-bg-warning');
                        titleBadge.classList.add('text-bg-primary');
                    }
                    setupKloterModal.hide();
                } else {
                    alert('Kode Embarkasi dan No. Kloter harus diisi.');
                }
            }
        });

        // Fungsi ini sekarang akan dipanggil dari event listener global
        function handleKloterContainerClick(e) {
            // Handle Kloter Edit
            const editBtn = e.target.closest('.kloter-edit-btn');
            if (editBtn) {
                const setupKloterModalEl = document.getElementById('setupKloterModal');
                const setupKloterModal = bootstrap.Modal.getOrCreateInstance(setupKloterModalEl);

                // Reset form saat modal ditutup
                // Pindahkan listener ini ke sini agar hanya ada satu
                setupKloterModalEl.removeEventListener('hidden.bs.modal', resetKloterModal); // Hapus listener lama jika ada
                setupKloterModalEl.addEventListener('hidden.bs.modal', resetKloterModal, { once: true });
                function resetKloterModal() {
                    currentEditingKloterCard = null;
                    document.getElementById('setupKloterForm').reset();
                }

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
                    const statusBadge = jemaahItem.querySelector('.badge.bg-secondary'); // membidik badge status untuk set karu karom
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
                    const jemaah = currentJemaahData.find(j => j.id === jemaahId);
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
        }

        // Attach the handler to the container
        kloterCardContainer.onclick = handleKloterContainerClick;

        // --- INITIAL RENDER ---
        // Hapus konten statis dan render dari data manifest
        if (dataManifest && Array.isArray(dataManifest) && dataManifest.length > 0) {
            renderManifest(dataManifest);
        }
    }

    // --- DATA SAVING ---
    function generateManifestFromDOM() {
        const kloterContainer = document.getElementById('kloterCardContainer');
        if (!kloterContainer) return [];

        const manifestData = [];
        const kloterCards = kloterContainer.querySelectorAll('.card.kloter');

        kloterCards.forEach((kloterCard, kloterIndex) => {
            const kloterObj = {
                id: `kloter-${kloterIndex + 1}`,
                kodeEmbarkasi: '',
                noKloter: '',
                rombongan: []
            };

            const titleBadge = kloterCard.querySelector('.kloter-title-bagde');
            if (titleBadge && !titleBadge.classList.contains('text-bg-warning')) {
                const [embarkasi, noKloter] = titleBadge.textContent.split('-');
                kloterObj.kodeEmbarkasi = embarkasi || '';
                kloterObj.noKloter = noKloter || '';
            }

            const rombonganCards = kloterCard.querySelectorAll('.card.rombongan');
            rombonganCards.forEach((rombonganCard, rombonganIndex) => {
                const rombonganObj = {
                    id: `rombongan-${kloterIndex + 1}-${rombonganIndex + 1}`,
                    regu: []
                };

                const reguCards = rombonganCard.querySelectorAll('.regu-card');
                reguCards.forEach((reguCard, reguIndex) => {
                    const reguObj = {
                        id: `regu-${kloterIndex + 1}-${rombonganIndex + 1}-${reguIndex + 1}`,
                        jemaah: []
                    };

                    const jemaahItems = reguCard.querySelectorAll('.jemaah-item');
                    jemaahItems.forEach(jemaahItem => {
                        const jemaahId = jemaahItem.dataset.id;
                        const jemaahRole = jemaahItem.dataset.role || null;
                        reguObj.jemaah.push({ id: jemaahId, role: jemaahRole });
                    });
                    rombonganObj.regu.push(reguObj);
                });
                kloterObj.rombongan.push(rombonganObj);
            });
            manifestData.push(kloterObj);
        });

        return manifestData;
    }

    async function handleSave() {

        // URL Web App Google Script Anda (dapatkan setelah deploy)
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6JYHcF11bZm2-2XM1HXr2aCABe5XYgOs9PM6eALw1qb7fyII3eTv7Sovn1bbRlMwvnw/exec";

        const versiInputEl = document.getElementById('versi');
        const selectedMusim = selectTahunEl.value;
        const selectedVersi = selectVersiEl.value;
        const newVersi = versiInputEl.value.trim();

        const manifestJSON = generateManifestFromDOM();
        const minifiedManifest = JSON.stringify(manifestJSON);
        const now = new Date();

        let payload;
        let action = '';
        let dataToSend = {};

        // Tambahkan dialog konfirmasi sebelum melanjutkan
        if (!confirm("Apakah Anda yakin ingin menyimpan perubahan ini?")) {
            console.log("Penyimpanan dibatalkan oleh pengguna.");
            return; // Hentikan fungsi jika pengguna memilih 'Tidak'
        }

        // Kondisi baru: Jika tidak ada versi yang dipilih DAN tidak ada versi baru yang diketik
        if (!selectedVersi && !newVersi) {
            alert("Silakan masukkan nama untuk versi baru di kolom 'Versi Baru' sebelum menyimpan.");
            versiInputEl.focus(); // Fokuskan ke input agar pengguna mudah mengisinya
            return; // Hentikan eksekusi
        }
        // Kondisi untuk UPDATE (diubah dari if menjadi else if)
        else if ((!newVersi && selectedVersi) || (newVersi === selectedVersi)) {
            action = 'UPDATE';
            payload = {
                timestamp: now.getTime(),
                manifest: minifiedManifest
            };
            dataToSend = { action, payload, selectedMusim, selectedVersi };
            console.log(`Aksi: ${action} (versi: ${selectedVersi})`);
        }
        // Kondisi untuk SAVE NEW
        else if (newVersi && newVersi !== selectedVersi) {
            const existingVersions = Array.from(selectVersiEl.options).map(opt => opt.value);
            if (existingVersions.includes(newVersi)) {
                alert(`Nama versi "${newVersi}" sudah ada. Silakan gunakan nama lain.`);
                versiInputEl.focus();
                return;
            }

            action = 'SAVE_NEW';
            payload = {
                date: now.toISOString(),
                timestamp: now.getTime(),
                musim: selectedMusim,
                versi: newVersi,
                manifest: minifiedManifest
            };
            dataToSend = { action, payload };
            console.log(`Aksi: ${action} (versi baru: ${newVersi})`);
        } else {
            alert("Kondisi tidak valid untuk menyimpan. Tentukan versi baru atau pastikan versi yang ada sudah dipilih.");
            return;
        }

        console.log("Payload yang akan dikirim:", dataToSend);
        //alert(`Aksi '${action}' telah dicatat di console. Google Script belum diimplementasikan.`);

        // TODO: Ganti console.log dengan fetch request ke Google Script saat sudah siap

        // Nonaktifkan tombol simpan untuk mencegah klik ganda

        // Tampilkan screen blocker
        showBlocker();
        const simpanVersiBtn = document.getElementById('simpanVersiBtn');
        simpanVersiBtn.disabled = true;
        simpanVersiBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Menyimpan...';

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'cors', // Diperlukan untuk request cross-origin
                body: JSON.stringify(dataToSend)
            });

            // Cek jika respon OK sebelum parsing JSON
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Hasil parsing JSON:", result);


            if (result.success) {
                alert(`Sukses: ${result.message}`);
                // Opsional: Muat ulang data atau perbarui UI setelah berhasil
                // location.reload(); 
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error("Terjadi error saat mengirim data:", error);
            alert(`Gagal menyimpan: ${error.message}`);
        } finally {
            // Aktifkan kembali tombol simpan
            hideBlocker();
            simpanVersiBtn.disabled = false;
            simpanVersiBtn.innerHTML = '<i class="bi bi-send"></i> Simpan';
        }
    }

    // --- MODAL KONTAK JEMAAH LOGIC ---
    if (kontakModalEl) {
        kontakModalEl.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Find the closest jemaah-item to get its ID
            const jemaahItem = button.closest('.jemaah-item');
            if (!jemaahItem) {
                console.error("Could not find jemaah-item for the clicked status badge.");
                return;
            }
            const jemaahId = jemaahItem.dataset.id;

            // Find the jemaah data from the global jemaahData array
            const jemaah = jemaahData.find(j => j.id === jemaahId);

            if (jemaah) {
                kontakModalTitle.textContent = `Kontak ${jemaah.nama}`;

                // Jika salah satu atau kedua nomor WA ada
                if (jemaah.wa_jemaah || jemaah.wa_keluarga) {
                    kontakKosongJemaahLink.style.display = 'none'; // Sembunyikan pesan tidak ada kontak
                    // WA Jemaah
                    if (jemaah.wa_jemaah) {
                        kontakWhatsappJemaahLink.href = `https://wa.me/62${jemaah.wa_jemaah.slice(1).replace(/\D/g, '')}`;
                        kontakWhatsappJemaahLink.textContent = `WA Jemaah : (${jemaah.wa_jemaah})`;
                        kontakWhatsappJemaahLink.style.display = 'block'; // Tampilkan link
                    } else {
                        kontakWhatsappJemaahLink.style.display = 'none'; // Sembunyikan jika tidak ada nomor
                    }
                    // WA Keluarga
                    if (jemaah.wa_keluarga) {
                        kontakWhatsappKeluargaLink.href = `https://wa.me/62${jemaah.wa_keluarga.slice(1).replace(/\D/g, '')}`;
                        kontakWhatsappKeluargaLink.textContent = `WA Keluarga : (${jemaah.wa_keluarga})`;
                        kontakWhatsappKeluargaLink.style.display = 'block'; // Tampilkan link
                    } else {
                        kontakWhatsappKeluargaLink.style.display = 'none'; // Sembunyikan jika tidak ada nomor
                    }
                } else {
                    // Jika kedua nomor WA tidak ada
                    kontakWhatsappJemaahLink.style.display = 'none';
                    kontakWhatsappKeluargaLink.style.display = 'none';
                    kontakModalTitle.textContent = `Kontak ${jemaah.nama} tidak tersedia`;
                    kontakKosongJemaahLink.style.display = 'block';
                }
            } else {
                kontakModalTitle.textContent = 'Kontak Jemaah';
                kontakWhatsappJemaahLink.style.display = 'none';
                kontakWhatsappKeluargaLink.style.display = 'none';
                console.warn(`Jemaah with ID ${jemaahId} not found.`);
            }
        });
    }

    // --- EVENT LISTENERS ---
    let appEventListenersAttached = false; // Flag to prevent re-attaching listeners

    function attachAppEventListeners() {
        if (appEventListenersAttached) return; // Hanya pasang listener sekali

        if (selectTahunEl) {
            selectTahunEl.addEventListener('change', async () => {
                await populateVersiDropdown();
                loadAndInitialize(); // Muat ulang data setelah versi di-populate
            });
        }
        if (selectVersiEl) {
            selectVersiEl.addEventListener('change', loadAndInitialize);
        }

        if (tambahKloterBtn) {
            tambahKloterBtn.addEventListener('click', () => {
                const newKloterNum = kloterCardContainer.children.length + 1;
                const kloterDiv = document.createElement('div');
                kloterDiv.className = 'card kloter mb-4';
                kloterDiv.innerHTML = `
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="col">
                            <span>Kloter ${newKloterNum}</span>
                            <span class="badge ms-2 kloter-title-bagde text-bg-warning">Belum ada kode embarkasi dan kloter -></span>
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
                        <div class="rombongan-card-container"></div>
                        <button class="btn btn-secondary btn-sm tambah-rombongan-btn" type="button">
                            <i class="bi bi-plus-circle"></i> Tambah Rombongan
                        </button>
                    </div>`;
                kloterCardContainer.appendChild(kloterDiv);
                // setTimeout(() => updateAllCountsOnPage(), 50);
            });
        }

        if (cariJemaahInput) {
            cariJemaahInput.addEventListener('input', () => {
                document.getElementById('jemaahList').dispatchEvent(new Event('filter'));
            });
        }

        const simpanVersiBtn = document.getElementById('simpanVersiBtn');
        if (simpanVersiBtn) {
            simpanVersiBtn.addEventListener('click', handleSave);
        }

        appEventListenersAttached = true;
    }

    // Initial load
    await populateVersiDropdown();
    loadAndInitialize();
    attachAppEventListeners(); // Pasang event listener utama
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
})();