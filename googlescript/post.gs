function doGet(e) {
  try {
    // --- PENGATURAN ---
    const spreadsheetId = '1WX8-kwwWc203ucvFqOnvvpQs2l3EPK7dpLWSgx-qfgo';
    const sheetName = 'dt_json_manifest';
    // --- AKHIR PENGATURAN ---

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`Sheet dengan nama "${sheetName}" tidak ditemukan.`);
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    const headers = values[0].map(header => header.toLowerCase());
    const dataRows = values.slice(1);

    const dateIndex = headers.indexOf('date');
    const timestampIndex = headers.indexOf('timestamp');
    const musimIndex = headers.indexOf('musim');
    const versiIndex = headers.indexOf('versi');
    const manifestIndex = headers.indexOf('manifest');

    if ([dateIndex, timestampIndex, musimIndex, versiIndex, manifestIndex].includes(-1)) {
      throw new Error("Satu atau lebih kolom ('date', 'timestamp', 'musim', 'versi', 'manifest') tidak ditemukan di header sheet.");
    }

    const musimParam = e.parameter.musim;
    const versiParam = e.parameter.versi;

    // Filter baris data dengan pengecekan nilai parameter yang kosong
    const filteredRows = dataRows.filter(row => {
      let musimMatch = true;
      let versiMatch = true;

      // Cek jika parameter 'musim' ada DAN nilainya tidak kosong
      if (musimParam && musimParam.trim() !== '') {
        musimMatch = (String(row[musimIndex]) == musimParam.trim());
      }

      // Cek jika parameter 'versi' ada DAN nilainya tidak kosong
      if (versiParam && versiParam.trim() !== '') {
        versiMatch = (row[versiIndex] == versiParam.trim());
      }

      return musimMatch && versiMatch;
    });

    const resultsArray = filteredRows.map((row, rowIndex) => {
      const manifestString = row[manifestIndex];
      let manifestObject;

      try {
        manifestObject = JSON.parse(manifestString);
      } catch (parseError) {
        console.error(`Error parsing JSON di baris spreadsheet asli ${rowIndex + 2}: ${parseError.message}. Konten: ${manifestString}`);
        manifestObject = { error: "Invalid JSON format in spreadsheet cell", content: manifestString };
      }

      return {
        date: row[dateIndex],
        timestamp: row[timestampIndex],
        musim: row[musimIndex],
        versi: row[versiIndex],
        manifest: manifestObject
      };
    });

    const output = JSON.stringify(resultsArray, null, 2);
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error(error);
    const errorOutput = JSON.stringify({ success: false, error: error.message });
    return ContentService.createTextOutput(errorOutput).setMimeType(ContentService.MimeType.JSON);
  }
}

// Letakkan fungsi ini di dalam file Google Script Anda (Code.gs)

function doPost(e) {
  // --- PENGATURAN ---
  const spreadsheetId = '1WX8-kwwWc203ucvFqOnvvpQs2l3EPK7dpLWSgx-qfgo';
  const sheetName = 'dt_json_manifest';
  const lock = LockService.getScriptLock(); // Mencegah konflik jika ada request bersamaan
  lock.waitLock(30000); // Tunggu hingga 30 detik

  // Object respons default
  const response = {
    success: false,
    message: '',
    error: ''
  };
  // --- AKHIR PENGATURAN ---

  try {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`Sheet dengan nama "${sheetName}" tidak ditemukan.`);
    }

    // 1. Ambil dan parse data yang dikirim dari JavaScript
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    const payload = requestData.payload;

    // let resultMessage = '';

    // 2. Tentukan aksi berdasarkan 'action' yang dikirim
    switch (action) {
      case 'SAVE_NEW':
        // Pastikan semua kolom ada di payload
        if (!payload.date || !payload.timestamp || !payload.musim || !payload.versi || !payload.manifest) {
          throw new Error("Payload untuk SAVE_NEW tidak lengkap.");
        }
        // Tambah baris baru di akhir sheet
        // Urutan harus sesuai dengan urutan kolom di Sheet Anda
        sheet.appendRow([
          payload.date,
          payload.timestamp,
          payload.musim,
          payload.versi,
          payload.manifest
        ]);
        // 3. Kirim respon berhasil kembali ke JavaScript
        response.success = true;
        response.message = `Versi baru "${payload.versi}" berhasil disimpan.`;
        break; // <-- TAMBAHKAN INI

      case 'UPDATE':
        // Untuk update, kita perlu mencari baris yang sesuai
        const data = sheet.getDataRange().getValues();
        const headers = data[0].map(h => h.toLowerCase());

        const musimIndex = headers.indexOf('musim');
        const versiIndex = headers.indexOf('versi');
        const timestampIndex = headers.indexOf('timestamp');
        const manifestIndex = headers.indexOf('manifest');

        // Ambil musim dan versi dari parameter URL yang kita kirim
        const selectedMusim = requestData.selectedMusim;
        const selectedVersi = requestData.selectedVersi;

        let rowUpdated = false;
        // Cari baris yang cocok (mulai dari baris ke-2, karena baris 1 adalah header)
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          if (row[musimIndex] == selectedMusim && row[versiIndex] == selectedVersi) {
            // Update kolom timestamp dan manifest di baris yang ditemukan
            sheet.getRange(i + 1, timestampIndex + 1).setValue(payload.timestamp);
            sheet.getRange(i + 1, manifestIndex + 1).setValue(payload.manifest);
            rowUpdated = true;
            // 3. Kirim respon berhasil kembali ke JavaScript
            response.success = true;
            response.message = `Versi "${selectedVersi}" berhasil diupdate.`;
            break; // Keluar dari loop setelah menemukan dan mengupdate
          }
        }
        if (!rowUpdated) {
          throw new Error(`Versi "${selectedVersi}" pada musim "${selectedMusim}" tidak ditemukan untuk diupdate.`);
        }
        break;

      default:
        throw new Error(`Aksi "${action}" tidak dikenali.`);
    }

  } catch (error) {
    // 4. Kirim respon error jika terjadi masalah
    console.error(error);
    response.error = error.message;

  } finally {
    lock.releaseLock(); // Selalu lepaskan lock
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}

// Fungsi untuk menangani preflight request (OPTIONS) dari browser
function doOptions(e) {
  return ContentService
    .createTextOutput()
    .withHeaders({
      'Access-Control-Allow-Origin': '*', // Izinkan semua origin
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Izinkan metode ini
      'Access-Control-Allow-Headers': 'Content-Type', // Izinkan header ini
    })
    .setMimeType(ContentService.MimeType.JSON);
}