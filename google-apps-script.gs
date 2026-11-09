/**
 * Shared "bought" list for the family Christmas list page.
 * Paste this into a Google Sheet's Extensions > Apps Script, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 */
const SHEET_NAME = 'Bought';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Item id', 'Marked bought at']);
  }
  return sh;
}

function boughtIds_() {
  const sh = sheet_();
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, 1).getValues().map(r => String(r[0])).filter(Boolean);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ bought: boughtIds_() });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const ids = (body.ids || []).map(String).filter(id => /^[a-z0-9-]{1,40}$/.test(id));
    const sh = sheet_();
    const current = boughtIds_();
    if (body.action === 'buy') {
      ids.filter(id => current.indexOf(id) === -1)
         .forEach(id => sh.appendRow([id, new Date()]));
    } else if (body.action === 'unbuy') {
      for (let r = sh.getLastRow(); r >= 2; r--) {
        if (ids.indexOf(String(sh.getRange(r, 1).getValue())) !== -1) sh.deleteRow(r);
      }
    }
    return json_({ bought: boughtIds_() });
  } finally {
    lock.releaseLock();
  }
}
