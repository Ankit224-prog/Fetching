// const fs = require("fs");
// const { google } = require("googleapis");
// const path = require("path");

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json", // Your service account JSON
//   scopes: SCOPES,
// });

// const SHEET_ID = "1qpC5ibaBdicT-huMOuLXWtBGDyRF3ovpKQZFMRYjGuk";

// async function fetchSheetData() {
//   const client = await auth.getClient();
//   const sheets = google.sheets({ version: "v4", auth: client });

//   const res = await sheets.spreadsheets.values.get({
//     spreadsheetId: SHEET_ID,
//     range: "Sheet1",
//   });

//   const rows = res.data.values;
//   if (rows.length) {
//     const csv = rows.map(r => r.join(",")).join("\n");
//     const filePath = path.join(require("os").homedir(), "Desktop", "whatsapp_data.csv");
//     fs.writeFileSync(filePath, csv);
//     console.log("CSV written to Desktop:", filePath);
//   } else {
//     console.log("No data found.");
//   }
// }

// fetchSheetData();
// splendid-tower-437208-k1-c19baff9f338.json allows access to your cloud resources, so store it securely.Learn more best practices 
// Key - c19baff9f3384b1466d228faacde399029531b32

// const fs = require('fs');
// const { google } = require('googleapis');
// const path = require('path');

// const KEYFILEPATH = './sheet-reader-xyz123.json'; // <-- Apni key ka exact naam
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk'; // <-- Sheet ka correct ID

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// async function fetchAndSaveSheetData() {
//   try {
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Sheet1', // <-- Sheet tab ka exact naam
//     });

//     const rows = res.data.values;

//     if (!rows || rows.length === 0) {
//       console.log('❌ No data found in the sheet.');
//       return;
//     }

//     // ✅ Convert rows to CSV format
//     const csvData = rows.map(row => row.join(',')).join('\n');

//     // ✅ Save as CSV to Desktop
//     const desktopPath = path.join(__dirname, 'sheet_data.csv'); // yahi aapke folder me save karega

//     fs.writeFileSync(desktopPath, csvData);

//     console.log(`✅ Sheet data saved at ${new Date().toLocaleTimeString()}`);
//   } catch (err) {
//     console.error('❌ Error fetching or saving sheet data:', err.message);
//   }
// }

// // ✅ Run every 15 seconds
// setInterval(fetchAndSaveSheetData, 1000);


// const fs = require('fs');
// const { google } = require('googleapis');
// const path = require('path');
// const os = require('os');

// const KEYFILEPATH = './sheet-reader-xyz123.json';
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// async function fetchAndSaveLastRow() {
//   try {
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Sheet1',
//     });

//     const rows = res.data.values;
//     if (!rows || rows.length < 2) {
//       console.log('❌ No rows found (excluding headers).');
//       return;
//     }

//     const lastRow = rows[rows.length - 1];
//     const csvLine = lastRow.join(',');

//     // ✅ Direct path jahan file save karni hai
//     const filePath = 'C:\\Users\\ASUS\\Downloads\\Datafetch\\sheet_data.csv';

//     fs.writeFile(filePath, csvLine, (err) => {
//       if (err) {
//         console.error('❌ Error writing file:', err.message);
//       } else {
//         console.log('✅ New row saved at:', new Date().toLocaleTimeString());
//       }
//     });
//   } catch (err) {
//     console.error('❌ Error:', err.message);
//   }
// }

// // 🔁 Run every 15 seconds
// setInterval(fetchAndSaveLastRow, 3000);
