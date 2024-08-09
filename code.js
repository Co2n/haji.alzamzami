const sheetName1 = 'confirm_kehadiran'
const sheetName2 = 'konten_web'
const sheetName3 = 'pendaftaran'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPostKehadiran (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName1)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Tanggal' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

function doPostDaftar (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName3)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'TAHUN' === e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  const sheet = ss.getSheetByName(sheetName2);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  //Logger.log(headers);
  const questions = rows.slice(1);
  //Logger.log(questions);
  const holder = [];
  questions.forEach((ele, ind) => {
    const temp = {
      row: (ind + 2)
    };
    headers.forEach((header, index) => {
      header = header.toLowerCase();
      //Logger.log(header);
      //Logger.log(index);
      //Logger.log(ele);
      temp[header] = ele[index];
    })
    holder.push(temp);
  })
  const output = JSON.stringify({
    status: true,
    data: holder
  });
 
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
 
}