// --- FUNGSI KONVERSI MASEHI KE HIJRIYAH ---
// Catatan: Ini adalah kalkulasi matematis (Algoritma Kuwaiti yang disederhanakan). 
// Secara realita, penanggalan Hijriyah bisa meleset +/- 1 hari tergantung rukyatul hilal lokal.
function getHijri(year, month, day) {
    var m = month;
    var y = year;
    if (m < 3) {
        y -= 1;
        m += 12;
    }
    var a = Math.floor(y / 100);
    var b = 2 - a + Math.floor(a / 4);
    var jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
    
    var l = jd - 1948440 + 10632;
    var n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    var j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    var hMonth = Math.floor((24 * l) / 709);
    var hDay = l - Math.floor((709 * hMonth) / 24);
    var hYear = 30 * n + j - 30;
    
    return { day: hDay, month: hMonth, year: hYear };
}

// --- ANTARMUKA PENGGUNA (SCRIPT UI) ---
function showDialog() {
    var win = new Window("dialog", "Generator Kalender Masehi & Hijriyah");
    win.orientation = "column";
    win.alignChildren = ["left", "top"];

    // Panel Tahun
    var pnlYear = win.add("panel", undefined, "Tahun Masehi:");
    pnlYear.orientation = "row";
    pnlYear.add("statictext", undefined, "Tahun:");
    var txtYear = pnlYear.add("edittext", undefined, new Date().getFullYear().toString());
    txtYear.characters = 6;

    // Panel Opsi Bulan
    var pnlOptions = win.add("panel", undefined, "Opsi Tampilan Bulan:");
    pnlOptions.orientation = "column";
    pnlOptions.alignChildren = ["left", "top"];
    
    var rb12 = pnlOptions.add("radiobutton", undefined, "Tampilkan 12 Bulan (1 Tahun Penuh)");
    var rb3 = pnlOptions.add("radiobutton", undefined, "Pilih 3 Bulan Saja");
    rb12.value = true; // Default 12 Bulan

    // Grup Pilihan 3 Bulan
    var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var grpMonths = pnlOptions.add("group");
    grpMonths.orientation = "column";
    grpMonths.alignChildren = ["left", "top"];
    grpMonths.margins = [20, 0, 0, 0];
    
    var dd1 = grpMonths.add("dropdownlist", undefined, monthNames);
    var dd2 = grpMonths.add("dropdownlist", undefined, monthNames);
    var dd3 = grpMonths.add("dropdownlist", undefined, monthNames);
    dd1.selection = 0;
    dd2.selection = 1;
    dd3.selection = 2;
    grpMonths.enabled = false; // Nonaktif secara default

    // Logika UI: Aktif/Nonaktifkan dropdown
    rb12.onClick = function() { grpMonths.enabled = false; }
    rb3.onClick = function() { grpMonths.enabled = true; }

    // Tombol Aksi
    var grpButtons = win.add("group");
    grpButtons.orientation = "row";
    grpButtons.alignment = ["right", "bottom"];
    var btnCancel = grpButtons.add("button", undefined, "Batal", {name: "cancel"});
    var btnOk = grpButtons.add("button", undefined, "Buat Kalender", {name: "ok"});

    if (win.show() == 1) {
        var selectedYear = parseInt(txtYear.text);
        if (isNaN(selectedYear)) {
            alert("Tahun harus berupa angka!");
            return null;
        }

        var monthsToGenerate = [];
        if (rb12.value) {
            for (var i = 0; i < 12; i++) monthsToGenerate.push(i);
        } else {
            monthsToGenerate.push(dd1.selection.index);
            monthsToGenerate.push(dd2.selection.index);
            monthsToGenerate.push(dd3.selection.index);
        }

        return { year: selectedYear, months: monthsToGenerate };
    }
    return null;
}

// --- FUNGSI UTAMA PEMBUATAN KALENDER ---
function generateCalendar(config) {
    if (app.documents.length === 0) {
        alert("Silakan buat atau buka dokumen InDesign terlebih dahulu!");
        return;
    }

    var doc = app.activeDocument;
    var page = doc.pages.item(0); // Buat di halaman pertama
    
    var yOffset = 10; // Posisi Y awal
    var xOffset = 10; // Posisi X awal

    var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    for (var m = 0; m < config.months.length; m++) {
        var currentMonth = config.months[m];
        
        // Buat Text Frame untuk satu bulan
        var tf = page.textFrames.add();
        tf.geometricBounds = [yOffset, xOffset, yOffset + 70, xOffset + 100]; // Ukuran Frame (Y1, X1, Y2, X2)
        
        // Atur posisi frame untuk bulan berikutnya
        xOffset += 110; 
        if ((m + 1) % 2 === 0) { // Pindah baris setiap 2 bulan agar rapi di halaman A4 standar
            xOffset = 10;
            yOffset += 80;
        }

        // Tulis Judul Bulan
        tf.insertionPoints.item(0).contents = monthNames[currentMonth] + " " + config.year + "\r";
        
        // Menambahkan Tabel (7 Kolom, 7 Baris)
        var table = tf.insertionPoints.item(-1).tables.add();
        table.columnCount = 7;
        table.bodyRowCount = 6;
        table.headerRowCount = 1;

        // Isi Header Hari
        for (var i = 0; i < 7; i++) {
            table.rows.item(0).cells.item(i).contents = days[i];
        }

        // Hitung hari pertama dan total hari dalam bulan tersebut
        var firstDay = new Date(config.year, currentMonth, 1).getDay();
        var daysInMonth = new Date(config.year, currentMonth + 1, 0).getDate();

        var currentCell = 0;
        var row = 1;

        // Kosongkan cell sebelum hari pertama
        for (var i = 0; i < firstDay; i++) {
            table.rows.item(row).cells.item(currentCell).contents = "";
            currentCell++;
        }

        // Isi Tanggal Masehi dan Hijriyah
        for (var day = 1; day <= daysInMonth; day++) {
            if (currentCell > 6) {
                currentCell = 0;
                row++;
            }
            
            // Dapatkan tanggal Hijriyah
            var hijri = getHijri(config.year, currentMonth + 1, day);
            
            // Tulis Masehi di baris pertama, Hijriyah (dalam kurung) di baris kedua
            table.rows.item(row).cells.item(currentCell).contents = day.toString() + "\r(" + hijri.day + ")";
            currentCell++;
        }
    }
    
    alert("Proses Selesai!\nKalender berhasil dibuat.");
}

// --- MENJALANKAN SCRIPT ---
var userConfig = showDialog();
if (userConfig !== null) {
    app.doScript(function() { generateCalendar(userConfig); }, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Buat Kalender");
}