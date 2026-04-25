#target indesign

// --- DATA NAMA BULAN ---
var masehiNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
var hijriNames = ["Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir", "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah"];
var days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// --- FUNGSI KONVERSI MASEHI KE HIJRIYAH ---
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
    
    var hMonth = Math.floor((24 * l) / 709); // Hasil 1-12
    var hDay = l - Math.floor((709 * hMonth) / 24);
    var hYear = 30 * n + j - 30;
    
    return { day: hDay, month: hMonth - 1, year: hYear }; // month index 0-11
}

// --- ANTARMUKA PENGGUNA (SCRIPT UI) ---
function showDialog() {
    var win = new Window("dialog", "Kalender Masehi & Hijriyah 2025");
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];

    var pnlYear = win.add("panel", undefined, "Tahun Masehi");
    var txtYear = pnlYear.add("edittext", undefined, new Date().getFullYear().toString());
    txtYear.characters = 10;

    var pnlOptions = win.add("panel", undefined, "Pengaturan Bulan");
    var rb12 = pnlOptions.add("radiobutton", undefined, "Tampilkan 12 Bulan (1 Tahun)");
    var rb3 = pnlOptions.add("radiobutton", undefined, "Pilih 3 Bulan Spesifik");
    rb12.value = true;

    var grpMonths = pnlOptions.add("group");
    grpMonths.orientation = "column";
    grpMonths.enabled = false;
    grpMonths.margins = [10, 5, 0, 5];
    
    var dd1 = grpMonths.add("dropdownlist", undefined, masehiNames);
    var dd2 = grpMonths.add("dropdownlist", undefined, masehiNames);
    var dd3 = grpMonths.add("dropdownlist", undefined, masehiNames);
    dd1.selection = 0; dd2.selection = 1; dd3.selection = 2;

    rb12.onClick = function() { grpMonths.enabled = false; }
    rb3.onClick = function() { grpMonths.enabled = true; }

    var grpButtons = win.add("group");
    grpButtons.alignment = "right";
    grpButtons.add("button", undefined, "Batal", {name: "cancel"});
    var btnOk = grpButtons.add("button", undefined, "Buat Kalender", {name: "ok"});

    if (win.show() == 1) {
        var res = { year: parseInt(txtYear.text), months: [] };
        if (rb12.value) {
            for (var i = 0; i < 12; i++) res.months.push(i);
        } else {
            res.months = [dd1.selection.index, dd2.selection.index, dd3.selection.index];
        }
        return res;
    }
    return null;
}

// --- FUNGSI UTAMA ---
function generateCalendar(config) {
    if (app.documents.length === 0) {
        app.documents.add();
    }

    var doc = app.activeDocument;
    var page = doc.pages.item(0);
    var yPos = 15;
    var xPos = 15;

    for (var i = 0; i < config.months.length; i++) {
        var mIdx = config.months[i];
        
        // 1. Hitung Rentang Hijriyah untuk Judul
        var startHijri = getHijri(config.year, mIdx + 1, 1);
        var lastDayVal = new Date(config.year, mIdx + 1, 0).getDate();
        var endHijri = getHijri(config.year, mIdx + 1, lastDayVal);
        
        // Format Judul: Januari 2025 / Rajab - Sya'ban 1446
        var hijriTitle = hijriNames[startHijri.month];
        if (startHijri.month !== endHijri.month) {
            hijriTitle += " - " + hijriNames[endHijri.month];
        }
        var fullTitle = masehiNames[mIdx] + " " + config.year + " / " + hijriTitle + " " + endHijri.year + " H";

        // 2. Buat Frame Teks
        var tf = page.textFrames.add();
        tf.geometricBounds = [yPos, xPos, yPos + 85, xPos + 90];
        
        // Atur posisi frame untuk bulan berikutnya (Grid 2 kolom)
        xPos += 95;
        if ((i + 1) % 2 === 0) {
            xPos = 15;
            yPos += 90;
        }

        // 3. Isi Judul dan Tabel
        tf.contents = fullTitle;
        var table = tf.insertionPoints.item(-1).tables.add();
        table.columnCount = 7;
        table.bodyRowCount = 6;
        table.headerRowCount = 1;

        // Header Hari
        for (var d = 0; d < 7; d++) {
            table.rows[0].cells[d].contents = days[d];
        }

        // Isi Tanggal
        var firstDayIdx = new Date(config.year, mIdx, 1).getDay();
        var currentCell = firstDayIdx;
        var rowIdx = 1;

        for (var day = 1; day <= lastDayVal; day++) {
            if (currentCell > 6) {
                currentCell = 0;
                rowIdx++;
            }
            if (rowIdx > 5) break; // Pengaman baris

            var hDate = getHijri(config.year, mIdx + 1, day);
            // Baris atas: Masehi, Baris bawah: Hijriyah
            table.rows[rowIdx].cells[currentCell].contents = day.toString() + "(" + hDate.day + ")";
            currentCell++;
        }
    }
    alert("Kalender selesai dibuat!");
}

var cfg = showDialog();
if (cfg) {
    app.doScript(function() { generateCalendar(cfg); }, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Buat Kalender");
}